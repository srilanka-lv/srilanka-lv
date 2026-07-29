# Umami Analytics via Cloudflare Zaraz Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Umami Cloud analytics on production srilanka.lv, delivered via a Cloudflare Zaraz Custom HTML tool, with an ad-blocker-bypass proxy through Next.js rewrites and four custom event types instrumented in the app.

**Architecture:** Zaraz injects the Umami tracker (served first-party from `/mi/m.js` via Next.js rewrites that proxy to `cloud.umami.is`) on the production hostname only. Pageviews are automatic (the tracker hooks SPA route changes itself; Zaraz SPA support stays off). Custom events use declarative `data-umami-event` attributes for plain clicks and an awaitable `trackEvent()` helper where navigation races or dynamic data are involved.

**Tech Stack:** Next.js 16 (App Router, `apps/web`), Bun + `bun:test`, Biome, Cloudflare Zaraz (dashboard config, documented as runbook), Umami Cloud.

**Spec:** [`docs/superpowers/specs/2026-07-29-umami-zaraz-analytics-design.md`](../specs/2026-07-29-umami-zaraz-analytics-design.md)

## Global Constraints

- Website ID: `00c9cbc1-15d3-4e00-8261-44860f861bf7`; Umami host: `https://cloud.umami.is`; proxy prefix: `/mi` (never use "stats", "analytics", or "umami" in the proxy path).
- Event names (exact strings): `outbound-link`, `product-cta`, `contact`, `flight-month-select`. Data keys: `url`, `product`, `channel`, `month`.
- This repo's Next.js is version 16 and differs from training data. Before touching `next.config.ts` or any Next API, read the relevant guide in `apps/web/node_modules/next/dist/docs/` (per `apps/web/AGENTS.md`).
- Biome rules: always use `{ }` block statements; no barrel exports, import from specific file paths.
- All work happens on the existing branch `@feat/umami-analytics`.
- Commit messages: `<type>: <gitmoji> <subject>` (e.g., `feat: ✨ …`, `test: ✅ …`, `docs: 📝 …`), each ending with the `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>` trailer.
- Run tests from `apps/web`: `cd apps/web && bun test <path>`.
- Do NOT change any user-facing Latvian copy. Wrapping existing text in an element is fine; rewording is not.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `apps/web/src/shared/utils/analytics.ts` (create) | `trackEvent` helper, event-name union, `window.umami` typing |
| `apps/web/src/shared/utils/analytics.test.ts` (create) | Unit tests for `trackEvent` |
| `apps/web/src/shared/utils/is-external-href.ts` (create) | `isExternalHref` predicate |
| `apps/web/src/shared/utils/is-external-href.test.ts` (create) | Unit tests for `isExternalHref` |
| `apps/web/next.config.ts` (modify) | Two proxy rewrites for tracker + collect endpoint |
| `apps/web/src/features/sanity/components/portable-text/index.tsx` (modify) | `outbound-link` attributes on external content links |
| `apps/web/src/features/sanity/components/stl-renderer/cell/link-cell.tsx` (modify) | `outbound-link` attributes on external table links |
| `apps/web/src/features/sanity/components/stl-renderer/cell/button-cell.tsx` (modify) | `outbound-link` attributes on external table buttons |
| `apps/web/src/features/layout/components/sub-footer/index.tsx` (modify) | `contact` attributes (whatsapp, email→mailto) |
| `apps/web/src/features/layout/components/footer-socials/index.tsx` (modify) | `contact` attributes (5 social channels) |
| `apps/web/src/shared/components/trip-page-hero-section-cta/index.tsx` (modify) | `product-cta` tracked before Revolut redirect |
| `apps/web/src/features/serpapi/components/flight-price-explorer/index.tsx` (modify) | `flight-month-select` on tab change |
| `infra/cloudflare/README.md` (modify) | Runbook section 9: Zaraz dashboard setup |

---

### Task 1: `trackEvent` analytics helper

**Files:**
- Create: `apps/web/src/shared/utils/analytics.ts`
- Test: `apps/web/src/shared/utils/analytics.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `trackEvent(name: AnalyticsEventName, data?: UmamiEventData): Promise<void>` and types `AnalyticsEventName = 'outbound-link' | 'product-cta' | 'contact' | 'flight-month-select'`, `UmamiEventData = Record<string, string | number>`. Tasks 6 and 7 import `trackEvent` from `@/shared/utils/analytics`.

- [ ] **Step 1: Write the failing test**

Create `apps/web/src/shared/utils/analytics.test.ts`:

```ts
import { beforeEach, describe, expect, it, mock } from 'bun:test';

import { trackEvent } from './analytics';

type WindowWithUmami = Window & typeof globalThis;

describe('trackEvent', () => {
  beforeEach(() => {
    // typeof window === 'undefined' is true for a global set to undefined,
    // so assignment isolates tests without needing delete.
    (globalThis as { window?: unknown }).window = undefined;
  });

  it('resolves silently when window is undefined', async () => {
    await expect(trackEvent('contact')).resolves.toBeUndefined();
  });

  it('resolves silently when umami is absent', async () => {
    (globalThis as { window?: unknown }).window = {};

    await expect(trackEvent('contact')).resolves.toBeUndefined();
  });

  it('forwards name and data to umami.track', async () => {
    const track = mock(() => Promise.resolve());
    (globalThis as { window?: unknown }).window = { umami: { track } } as unknown as WindowWithUmami;

    await trackEvent('product-cta', { product: 'girls-trip' });

    expect(track).toHaveBeenCalledWith('product-cta', { product: 'girls-trip' });
  });

  it('swallows umami.track rejections', async () => {
    const track = mock(() => Promise.reject(new Error('blocked')));
    (globalThis as { window?: unknown }).window = { umami: { track } } as unknown as WindowWithUmami;

    await expect(trackEvent('contact')).resolves.toBeUndefined();
  });
});
```

Note: if Bun's runtime turns out to predefine `globalThis.window`, the `beforeEach` assignment already handles it.

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/web && bun test src/shared/utils/analytics.test.ts`
Expected: FAIL, cannot resolve `./analytics`.

- [ ] **Step 3: Write the implementation**

Create `apps/web/src/shared/utils/analytics.ts`:

```ts
export type UmamiEventData = Record<string, string | number>;

export type AnalyticsEventName = 'outbound-link' | 'product-cta' | 'contact' | 'flight-month-select';

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: UmamiEventData) => Promise<void>;
    };
  }
}

// Resolves when the beacon is sent so callers that navigate away can await it;
// resolves immediately when the tracker is absent (dev, staging, blocked).
export const trackEvent = async (name: AnalyticsEventName, data?: UmamiEventData): Promise<void> => {
  if (typeof window === 'undefined' || !window.umami) {
    return;
  }

  try {
    await window.umami.track(name, data);
  } catch {
    // Tracking must never break the interaction that triggered it.
  }
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/web && bun test src/shared/utils/analytics.test.ts`
Expected: 4 pass.

- [ ] **Step 5: Lint and commit**

```bash
bun repo:lint
git add apps/web/src/shared/utils/analytics.ts apps/web/src/shared/utils/analytics.test.ts
git commit -m "feat: ✨ add umami trackEvent helper"
```

---

### Task 2: `isExternalHref` util + outbound-link instrumentation

**Files:**
- Create: `apps/web/src/shared/utils/is-external-href.ts`
- Test: `apps/web/src/shared/utils/is-external-href.test.ts`
- Modify: `apps/web/src/features/sanity/components/portable-text/index.tsx:76-89`
- Modify: `apps/web/src/features/sanity/components/stl-renderer/cell/link-cell.tsx`
- Modify: `apps/web/src/features/sanity/components/stl-renderer/cell/button-cell.tsx`

**Interfaces:**
- Consumes: nothing (data attributes only; the Umami tracker picks them up via document-level click delegation).
- Produces: `isExternalHref(href: string): boolean` from `@/shared/utils/is-external-href`.

- [ ] **Step 1: Write the failing test**

Create `apps/web/src/shared/utils/is-external-href.test.ts`:

```ts
import { describe, expect, it } from 'bun:test';

import { isExternalHref } from './is-external-href';

describe('isExternalHref', () => {
  it('is true for https and http urls', () => {
    expect(isExternalHref('https://www.booking.com/hotel')).toBe(true);
    expect(isExternalHref('http://example.com')).toBe(true);
  });

  it('is false for relative paths', () => {
    expect(isExternalHref('/blogs/kolombo')).toBe(false);
    expect(isExternalHref('#section')).toBe(false);
  });

  it('is false for mailto and other schemes', () => {
    expect(isExternalHref('mailto:sveiki@srilanka.lv')).toBe(false);
    expect(isExternalHref('https-fake')).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/web && bun test src/shared/utils/is-external-href.test.ts`
Expected: FAIL, cannot resolve `./is-external-href`.

- [ ] **Step 3: Write the implementation**

Create `apps/web/src/shared/utils/is-external-href.ts` (same semantics as the regex currently inlined in portable-text; absolute links to srilanka.lv itself intentionally keep counting as external, matching current behavior):

```ts
export const isExternalHref = (href: string): boolean => /^https?:\/\//.test(href);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/web && bun test src/shared/utils/is-external-href.test.ts`
Expected: 3 pass.

- [ ] **Step 5: Instrument portable-text external links**

In `apps/web/src/features/sanity/components/portable-text/index.tsx`, add the import and replace the `link` mark. Current code:

```tsx
    link: ({ children, value }) => {
      const href = value?.href ?? '#';
      const isExternal = /^https?:\/\//.test(href);

      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }

      return <Link href={href}>{children}</Link>;
    },
```

New code (import `isExternalHref` from `@/shared/utils/is-external-href` at the top of the file):

```tsx
    link: ({ children, value }) => {
      const href = value?.href ?? '#';

      if (isExternalHref(href)) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="outbound-link"
            data-umami-event-url={href}
          >
            {children}
          </a>
        );
      }

      return <Link href={href}>{children}</Link>;
    },
```

- [ ] **Step 6: Instrument the table link cell**

Replace the body of `apps/web/src/features/sanity/components/stl-renderer/cell/link-cell.tsx` (React drops attributes whose value is `undefined`, so internal links get no tracking attributes):

```tsx
import type { LinkCellProps } from 'structured-table';

import { isExternalHref } from '@/shared/utils/is-external-href';

const LinkCell = ({ data }: { data: LinkCellProps }) => {
  const external = isExternalHref(data.href);

  return (
    <a
      href={data.href}
      target={data.newTab ? '_blank' : '_self'}
      rel="noopener noreferrer"
      data-umami-event={external ? 'outbound-link' : undefined}
      data-umami-event-url={external ? data.href : undefined}
    >
      {data.text}
    </a>
  );
};

export { LinkCell };
```

- [ ] **Step 7: Instrument the table button cell**

In `apps/web/src/features/sanity/components/stl-renderer/cell/button-cell.tsx`, add the import, compute the flag before the return, and add the two attributes to the `<button>`. Only the parts that change:

```tsx
import { isExternalHref } from '@/shared/utils/is-external-href';
```

Inside the component, before `return`:

```tsx
  const external = Boolean(data.url && isExternalHref(data.url));
```

On the `<button>` element, alongside the existing props:

```tsx
      data-umami-event={external ? 'outbound-link' : undefined}
      data-umami-event-url={external ? data.url : undefined}
```

The button opens `data.url` via `window.open` (no navigation away), so delegation-based tracking has no race here.

- [ ] **Step 8: Verify build and lint**

Run: `cd apps/web && bun test src/shared/utils/ && cd ../.. && bun repo:lint`
Expected: tests pass, no lint errors.

- [ ] **Step 9: Commit**

```bash
git add apps/web/src/shared/utils/is-external-href.ts apps/web/src/shared/utils/is-external-href.test.ts apps/web/src/features/sanity/components/portable-text/index.tsx apps/web/src/features/sanity/components/stl-renderer/cell/link-cell.tsx apps/web/src/features/sanity/components/stl-renderer/cell/button-cell.tsx
git commit -m "feat: ✨ track outbound link clicks"
```

---

### Task 3: Ad-blocker bypass proxy rewrites

**Files:**
- Modify: `apps/web/next.config.ts` (the `rewrites` array)

**Interfaces:**
- Consumes: nothing.
- Produces: `/mi/m.js` and `/mi/api/send` first-party paths; the Zaraz snippet in Task 8's runbook points at them.

- [ ] **Step 1: Read the Next 16 rewrites doc**

Read the rewrites guide under `apps/web/node_modules/next/dist/docs/` (find it with `ls apps/web/node_modules/next/dist/docs/ | grep -i rewrite` or grep for "rewrites"). Confirm that external-URL destinations are still supported in the plain-array return form used by this config. If the API differs from the code below, follow the doc, not this plan.

- [ ] **Step 2: Add the proxy rewrites**

In `apps/web/next.config.ts`, append to the array returned by `rewrites()` (after the last existing entry):

```ts
      // Umami tracker + collect endpoint, proxied first-party so ad-blocker
      // domain blocklists never see cloud.umami.is.
      {
        source: '/mi/m.js',
        destination: 'https://cloud.umami.is/script.js',
      },
      {
        source: '/mi/api/send',
        destination: 'https://cloud.umami.is/api/send',
      },
```

- [ ] **Step 3: Verify the proxy locally**

Start the dev server (`bun web:dev`), then:

Run: `curl -s http://localhost:3000/mi/m.js | head -c 200`
Expected: minified JavaScript (the Umami tracker), not HTML.

Run: `curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/mi/api/send -H "content-type: application/json" -H "user-agent: Mozilla/5.0 (verification)" -d '{"type":"event","payload":{"website":"00c9cbc1-15d3-4e00-8261-44860f861bf7","url":"/plan-verify","hostname":"srilanka.lv"}}'`
Expected: an HTTP status from Umami Cloud (200 is ideal; anything but 404 proves the rewrite proxies through). Stop the dev server afterwards.

- [ ] **Step 4: Commit**

```bash
bun repo:lint
git add apps/web/next.config.ts
git commit -m "feat: ✨ proxy umami tracker via first-party rewrites"
```

---

### Task 4: Contact events (sub-footer + footer socials)

**Files:**
- Modify: `apps/web/src/features/layout/components/sub-footer/index.tsx`
- Modify: `apps/web/src/features/layout/components/footer-socials/index.tsx`

**Interfaces:**
- Consumes: nothing (data attributes only).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Instrument the sub-footer**

In `sub-footer/index.tsx`, two changes. Add the tracking attributes to the existing WhatsApp anchor:

```tsx
        <a
          className={subFooterLinkStyle}
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/642902323786"
          title="WhatsApp"
          data-umami-event="contact"
          data-umami-event-channel="whatsapp"
        >
          +64 2902323786
        </a>
```

Replace the plain-text email line `<li className={subFooterItemStyle}>E-pasts: sveiki@srilanka.lv</li>` with a mailto link (visible text unchanged):

```tsx
      <li className={subFooterItemStyle}>
        E-pasts:{' '}
        <a
          className={subFooterLinkStyle}
          href="mailto:sveiki@srilanka.lv"
          data-umami-event="contact"
          data-umami-event-channel="email"
        >
          sveiki@srilanka.lv
        </a>
      </li>
```

- [ ] **Step 2: Instrument the footer socials**

In `footer-socials/index.tsx`, add two attributes to the mapped anchor (`label` values are `Instagram`, `TikTok`, `YouTube`, `Patreon`, `Facebook`; lowercasing yields the channel names):

```tsx
      <a
        key={href}
        className={footerSocialLinkStyle}
        href={href}
        aria-label={label}
        target="_blank"
        rel="nofollow noopener noreferrer"
        data-umami-event="contact"
        data-umami-event-channel={label.toLowerCase()}
      >
        {icon}
      </a>
```

- [ ] **Step 3: Verify render and lint**

Run: `bun repo:lint`. Then start `bun web:dev`, load `http://localhost:3000`, and inspect the footer in devtools: the WhatsApp, email, and five social anchors each carry `data-umami-event="contact"` with the right `data-umami-event-channel`. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/features/layout/components/sub-footer/index.tsx apps/web/src/features/layout/components/footer-socials/index.tsx
git commit -m "feat: ✨ track contact clicks in footer"
```

---

### Task 5: Product CTA event (reserve button)

**Files:**
- Modify: `apps/web/src/shared/components/trip-page-hero-section-cta/index.tsx`

**Interfaces:**
- Consumes: `trackEvent` from `@/shared/utils/analytics` (Task 1).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Track before the Revolut redirect**

The primary button assigns `window.location.href`, which unloads the page; a fire-and-forget beacon could be cancelled. Await the track call first (`trackEvent` resolves immediately when the tracker is absent, so dev/staging behavior is unchanged). Add the import:

```tsx
import { trackEvent } from '@/shared/utils/analytics';
```

Replace the primary button's `onClick`:

```tsx
      onClick={async () => {
        await trackEvent('product-cta', { product: 'girls-trip' });
        window.location.href =
          'https://revolut.me/srilankalv?currency=EUR&amount=25000&note=10%20dienu%20ce%C4%BCojums%20uz%20%C5%A0rilanku%20meiten%C4%93m%20-%20Rezerv%C4%81cija';
      }}
```

The Revolut URL stays byte-for-byte identical. Note the data value is `girls-trip` (the product being paid for) even though all three product pages currently render this shared component.

- [ ] **Step 2: Verify behavior and lint**

Run: `bun repo:lint`. Then with `bun web:dev` running, navigate from `http://localhost:3000` via the site navigation to the products overview and into the girls-trip product page (the LV slugs live in `packages/sanity` `constants/pages-slugs`, `PAGES.LV.PRODUCTS` / `PAGES.LV.PRODUCTS_GIRLS_TRIP`). Click "Rezervēt savu vietu!" and confirm the browser navigates to the Revolut page exactly as before (no tracker locally, so `trackEvent` resolves instantly). Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/shared/components/trip-page-hero-section-cta/index.tsx
git commit -m "feat: ✨ track product cta before revolut redirect"
```

---

### Task 6: Flight month select event

**Files:**
- Modify: `apps/web/src/features/serpapi/components/flight-price-explorer/index.tsx`

**Interfaces:**
- Consumes: `trackEvent` from `@/shared/utils/analytics` (Task 1).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Track tab changes**

Add the import:

```tsx
import { trackEvent } from '@/shared/utils/analytics';
```

Add `onValueChange` to `Tabs.Root` (Ark UI v5 passes `{ value: string | null }`; no navigation happens, so fire-and-forget with `void` is correct here):

```tsx
    <Tabs.Root
      defaultValue={defaultMonth}
      className={rootStyle}
      onValueChange={({ value }) => {
        if (value) {
          void trackEvent('flight-month-select', { month: value });
        }
      }}
    >
```

- [ ] **Step 2: Verify behavior and lint**

Run: `bun repo:lint`. Then with `bun web:dev` running, navigate from `http://localhost:3000` to the flight tickets page (LV slug: `PAGES.LV.FLIGHT_TICKETS` in `packages/sanity` `constants/pages-slugs`), switch months, and confirm tabs still switch without console errors. Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/features/serpapi/components/flight-price-explorer/index.tsx
git commit -m "feat: ✨ track flight month selection"
```

---

### Task 7: Full-suite verification

**Files:** none (verification only).

- [ ] **Step 1: Run the whole web test suite**

Run: `cd apps/web && bun test`
Expected: all tests pass (existing serpapi suites + the two new util suites).

- [ ] **Step 2: Production build**

Run: `bun web:build`
Expected: build succeeds (this is also the repo's typecheck gate).

- [ ] **Step 3: Lint everything**

Run: `bun repo:lint`
Expected: clean. Nothing to commit if all green; fix and amend the responsible commit if not.

---

### Task 8: Zaraz runbook (dashboard steps)

**Files:**
- Modify: `infra/cloudflare/README.md` (append section 9)

**Interfaces:**
- Consumes: the `/mi` proxy paths from Task 3.
- Produces: the manual checklist Dave executes in the Cloudflare dashboard.

- [ ] **Step 1: Append the runbook section**

Append to `infra/cloudflare/README.md`:

```markdown
## 9. Zaraz: Umami Analytics

Umami Cloud tracking on production only, injected by Zaraz. The tracker script and
collect endpoint are proxied first-party through Next.js rewrites (`/mi/m.js` and
`/mi/api/send`, see `apps/web/next.config.ts`) so ad-blocker domain lists never
match. Umami dashboard: https://cloud.umami.is (website ID
`00c9cbc1-15d3-4e00-8261-44860f861bf7`).

Dashboard steps (zone `srilanka.lv` → Zaraz):

1. Enable Zaraz. Under Settings, keep **Auto-inject script** on (default) and
   **Single Page Application support** off (default). SPA support must stay off:
   the Umami tracker records client-side route changes itself, and Zaraz SPA
   support would re-inject the Custom HTML tool on every navigation and
   double-count pageviews.
2. Under Settings, set **Bot Score Threshold** to block "Automated and Likely
   Automated" requests.
3. Create a trigger `Production pageview`: Match rule, `{{ system.page.url }}`
   (hostname) equals `srilanka.lv`. This keeps staging/development clean; the
   `data-domains` attribute below is the second guard.
4. Add a tool → **Custom HTML**, name `Umami Analytics`, fired by the
   `Production pageview` trigger, with this snippet:

   ```html
   <script
     defer
     src="/mi/m.js"
     data-host-url="https://srilanka.lv/mi"
     data-website-id="00c9cbc1-15d3-4e00-8261-44860f861bf7"
     data-domains="srilanka.lv"
   ></script>
   ```

5. Publish the Zaraz configuration.

Verification after the next production deploy:

- `view-source:https://development.srilanka.lv` contains no `/mi/m.js` script.
- On https://srilanka.lv with devtools open: the script loads from
  `srilanka.lv/mi/m.js` and pageview beacons POST to `srilanka.lv/mi/api/send`
  (both first-party, no requests to `cloud.umami.is`).
- Umami realtime shows the visit; client-side navigation adds exactly one
  pageview per route change.
- Click an outbound blog link, a footer social link, the WhatsApp link, the
  reserve CTA, and switch a flight month: events `outbound-link`, `contact`
  (with `channel`), `product-cta`, and `flight-month-select` all appear.
- Visit from a phone on cellular data: Umami must show the correct country. If
  every visit reports Germany, the rewrite proxy is masking real client IPs;
  fallback is to point the snippet back at `https://cloud.umami.is/script.js`
  (remove `data-host-url`) until a header-forwarding proxy replaces the
  rewrites.
```

- [ ] **Step 2: Commit**

```bash
git add infra/cloudflare/README.md
git commit -m "docs: 📝 zaraz umami runbook"
```

---

## Post-merge (manual, not part of this branch)

1. Merge the branch into `development` via PR, promote through staging to production as usual.
2. Execute runbook section 9 in the Cloudflare dashboard (the code is inert until Zaraz injects the script, so order does not matter, but events only flow once both are live).
3. Walk the verification checklist at the end of runbook section 9.

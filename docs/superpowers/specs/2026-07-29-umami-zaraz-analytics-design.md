# Umami Analytics via Cloudflare Zaraz Design

## Overview

Add privacy-friendly analytics to srilanka.lv using Umami Cloud (free Hobby tier, EU-hosted) with the tracking script delivered through Cloudflare Zaraz. Zaraz injects the Umami tracker on production only; staging and development never report. Alongside default pageview tracking, four custom event types capture the interactions that matter for the product bets: outbound link clicks, product CTA clicks, contact actions, and flight price tool usage.

## Decisions

- **Umami host:** Umami Cloud (`cloud.umami.is`), website ID `00c9cbc1-15d3-4e00-8261-44860f861bf7`. The ID is public by nature (it ships in page source), so it lives in plain text in the Zaraz dashboard config, not in a secret.
- **Environment scope:** production (`srilanka.lv`) only. Enforced twice: a Zaraz trigger hostname condition, and the `data-domains` attribute on the script tag.
- **Delivery:** Zaraz Custom HTML tool. Zaraz has no native Umami integration (verified against the supported-tools list, July 2026). Custom HTML is the practical path; a custom Managed Component (fully server-side) was rejected as overkill, and plain `next/script` was rejected because tag management should stay in Cloudflare.
- **Consent:** no consent banner. Umami is cookieless and stores no personal data; this follows Umami's own GDPR position, and is a product decision, not legal advice.
- **Ad-blocker bypass:** the tracker script and collect endpoint are proxied through `srilanka.lv` via Next.js rewrites (per Umami's [bypass guide](https://docs.umami.is/docs/bypass-ad-blockers)), so blockers that blocklist `cloud.umami.is` never see that domain. Proxy prefix is `/mi` (deliberately meaningless: no "stats", "analytics", or "umami" in the path). Best effort: blockers with behavioral rules may still block.

## Architecture

```
Visitor on srilanka.lv (production only)
  │
  ▼
Cloudflare edge: Zaraz auto-inject
  ├─ trigger "Production pageview" (hostname = srilanka.lv) fires
  ├─ Custom HTML tool injects the Umami script tag (src /mi/m.js, first-party)
  │    (bot-score filter drops automated traffic before this point)
  ▼
Browser: Umami tracker (loaded from srilanka.lv/mi/m.js)
  ├─ pageviews: initial load + SPA route changes (tracker hooks history itself)
  ├─ click events via data-umami-event attributes (document-level delegation)
  └─ programmatic events via window.umami.track()
  │    all beacons POST to srilanka.lv/mi/api/send (first-party)
  ▼
Next.js rewrites on the origin (proxy)
  ├─ /mi/m.js      → https://cloud.umami.is/script.js
  └─ /mi/api/send  → https://cloud.umami.is/api/send
  ▼
Umami Cloud dashboard (cloud.umami.is)
```

Key interaction between the two systems: Zaraz's own SPA setting stays **off**. The Umami tracker already records client-side route changes; if Zaraz's SPA support were on, the Custom HTML tool would re-inject the script on every navigation and double-count pageviews.

## Zaraz Configuration (Cloudflare dashboard)

One-time manual setup on the `srilanka.lv` zone, documented as a runbook section in `infra/cloudflare/README.md`:

1. Enable Zaraz. Keep **auto-inject on** (default) and **SPA support off** (default).
2. Set the bot score threshold to block "Automated and Likely Automated" requests.
3. Create trigger `Production pageview`: fire on pageview where the hostname equals `srilanka.lv`.
4. Create a Custom HTML tool `Umami Analytics` fired by that trigger, containing:

```html
<script
  defer
  src="/mi/m.js"
  data-host-url="https://srilanka.lv/mi"
  data-website-id="00c9cbc1-15d3-4e00-8261-44860f861bf7"
  data-domains="srilanka.lv"
></script>
```

The `src` is relative because Zaraz injects the tag into pages served on `srilanka.lv`; the Next.js rewrites proxy `/mi/m.js` and `/mi/api/send` to Umami Cloud. `data-host-url` pins the collect endpoint to the proxied path (the tracker appends `/api/send` to it).

No Cloudflare Access, firewall, or Kamal changes are involved. The repo has no CSP configuration, so no header changes are needed.

## Repo Changes

All changes live in `apps/web`.

### Ad-blocker bypass proxy

Two entries appended to the existing `rewrites()` array in `apps/web/next.config.ts`:

- `/mi/m.js` → `https://cloud.umami.is/script.js`
- `/mi/api/send` → `https://cloud.umami.is/api/send`

### Tracking helper

`apps/web/src/shared/utils/analytics.ts` exports:

- `type AnalyticsEventName = 'outbound-link' | 'product-cta' | 'contact' | 'flight-month-select'` and the `data-umami-event` attribute string values reuse the same names.
- `trackEvent(name: AnalyticsEventName, data?: Record<string, string | number>)`: calls `window.umami.track(name, data)` when `window.umami` exists, otherwise a silent no-op. This makes local dev, staging, and ad-blocked visitors safe with zero conditional logic at call sites.
- A `Window` type augmentation for the `umami` global (only `track` is typed; nothing else is used).
- `trackEvent` returns a `Promise<void>` (resolved immediately when `umami` is absent) so callers that navigate away, like the Revolut CTA, can await delivery.

`apps/web/src/shared/utils/is-external-href.ts` exports `isExternalHref(href: string): boolean` (the `/^https?:\/\//` check currently inlined in portable-text, extracted for reuse by the table cells).

Imports are from the specific file path (no barrel exports, per repo convention).

### Event instrumentation

| Event | Where | Data |
| --- | --- | --- |
| `outbound-link` | External-link branch of `features/sanity/components/portable-text/index.tsx`; `features/sanity/components/stl-renderer/cell/link-cell.tsx` and `button-cell.tsx` (external hrefs only, shared `isExternalHref` util) | `url` (the href) |
| `product-cta` | The "Rezervēt savu vietu!" button in `shared/components/trip-page-hero-section-cta/index.tsx` (the shared reserve CTA all three product pages render; it redirects to Revolut, so the click handler awaits `trackEvent` before navigating) | `product`: `girls-trip` |
| `contact` | WhatsApp link and email in `features/layout/components/sub-footer` (the email is currently plain text and becomes a `mailto:` link), plus the five social links in `features/layout/components/footer-socials`. `app/contact/page.tsx` is a stub with no links; nothing to instrument there. | `channel`: `whatsapp` \| `email` \| `instagram` \| `tiktok` \| `youtube` \| `patreon` \| `facebook` |
| `flight-month-select` | `onValueChange` on `Tabs.Root` in `features/serpapi/components/flight-price-explorer/index.tsx` | `month` (the selected tab value) |

The first three are declarative `data-umami-event` + `data-umami-event-<key>` attributes on the anchor/button elements; Umami's tracker uses document-level event delegation, so React-rendered elements work without wiring. The flight event uses `trackEvent()` because it hangs off a component callback rather than a plain click on a link.

Where a page currently renders its CTA as a server component, the attributes are plain HTML attributes and keep it a server component; no client boundary changes are expected.

## Verification

1. **Proxy check (local):** `curl localhost:3000/mi/m.js` returns the Umami tracker source; a POST to `localhost:3000/mi/api/send` reaches Umami Cloud (any non-404 Umami response proves the rewrite).
2. **Staging/dev negative check:** view source on `development.srilanka.lv`, confirm no Umami script and no Zaraz Umami tool firing.
3. **Production pageviews:** after the Zaraz config is live, confirm via Zaraz debug mode that the tool fires, the script loads from `/mi/m.js`, beacons go to `/mi/api/send`, and Umami Cloud's realtime view shows the visit.
4. **SPA single-count check:** navigate client-side between pages; exactly one pageview per route change in Umami.
5. **Events:** trigger one of each event type on production and confirm all four appear in Umami with their data properties.
6. **Geolocation through the proxy:** visit from a network that is not the Hetzner box (e.g., phone on cellular) and confirm Umami records the correct country. The proxy forwards the request from the origin server, so Umami must be reading the forwarded client IP header; if every visit shows as Germany (Hetzner's location), the proxy is masking visitor IPs and the fallback is to point the Zaraz snippet back at `cloud.umami.is` directly until a header-forwarding proxy (e.g., a Cloudflare Worker) replaces the rewrites.
7. **Helper unit test:** `trackEvent` no-ops without `window.umami` and forwards name/data when present.

The repo-side attribute changes are verifiable before the Zaraz config exists (attributes are inert without the script), so code can merge and deploy independently of the dashboard work.

## Out of Scope / Accepted Trade-offs

- The ad-blocker bypass is best effort: the first-party proxy defeats domain blocklists, but blockers with path or behavioral heuristics may still drop beacons. Accepted: the stats are directional, not billing-grade.
- Proxied beacons add load on the Hetzner origin (one small POST per pageview/event). Negligible at current traffic.
- No custom events for the newsletter signup or navigation; add later if a question actually needs them.
- Tag config lives in two places (Zaraz dashboard + repo attributes). Mitigated by the runbook in `infra/cloudflare/README.md`.
- Umami Cloud Hobby tier limits (events/month) are far above current traffic; revisit only if limits are hit.

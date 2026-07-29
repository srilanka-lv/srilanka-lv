# Umami Analytics via Cloudflare Zaraz Design

## Overview

Add privacy-friendly analytics to srilanka.lv using Umami Cloud (free Hobby tier, EU-hosted) with the tracking script delivered through Cloudflare Zaraz. Zaraz injects the Umami tracker on production only; staging and development never report. Alongside default pageview tracking, four custom event types capture the interactions that matter for the product bets: outbound link clicks, product CTA clicks, contact actions, and flight price tool usage.

## Decisions

- **Umami host:** Umami Cloud (`cloud.umami.is`), website ID `00c9cbc1-15d3-4e00-8261-44860f861bf7`. The ID is public by nature (it ships in page source), so it lives in plain text in the Zaraz dashboard config, not in a secret.
- **Environment scope:** production (`srilanka.lv`) only. Enforced twice: a Zaraz trigger hostname condition, and the `data-domains` attribute on the script tag.
- **Delivery:** Zaraz Custom HTML tool. Zaraz has no native Umami integration (verified against the supported-tools list, July 2026). Custom HTML is the practical path; a custom Managed Component (fully server-side) was rejected as overkill, and plain `next/script` was rejected because tag management should stay in Cloudflare.
- **Consent:** no consent banner. Umami is cookieless and stores no personal data; this follows Umami's own GDPR position, and is a product decision, not legal advice.

## Architecture

```
Visitor on srilanka.lv (production only)
  │
  ▼
Cloudflare edge: Zaraz auto-inject
  ├─ trigger "Production pageview" (hostname = srilanka.lv) fires
  ├─ Custom HTML tool injects the Umami script tag
  │    (bot-score filter drops automated traffic before this point)
  ▼
Browser: Umami tracker (script from cloud.umami.is)
  ├─ pageviews: initial load + SPA route changes (tracker hooks history itself)
  ├─ click events via data-umami-event attributes (document-level delegation)
  └─ programmatic events via window.umami.track()
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
  src="https://cloud.umami.is/script.js"
  data-website-id="00c9cbc1-15d3-4e00-8261-44860f861bf7"
  data-domains="srilanka.lv"
></script>
```

No Cloudflare Access, firewall, or Kamal changes are involved. The repo has no CSP configuration, so no header changes are needed.

## Repo Changes

All changes live in `apps/web`.

### Tracking helper

`apps/web/src/shared/utils/analytics.ts` exports:

- `type AnalyticsEventName = 'outbound-link' | 'product-cta' | 'contact' | 'flight-month-select'` and the `data-umami-event` attribute string values reuse the same names.
- `trackEvent(name: AnalyticsEventName, data?: Record<string, string | number>)`: calls `window.umami.track(name, data)` when `window.umami` exists, otherwise a silent no-op. This makes local dev, staging, and ad-blocked visitors safe with zero conditional logic at call sites.
- A `Window` type augmentation for the `umami` global (only `track` is typed; nothing else is used).

Imports are from the specific file path (no barrel exports, per repo convention).

### Event instrumentation

| Event | Where | Data |
| --- | --- | --- |
| `outbound-link` | External-link branch of `features/sanity/components/portable-text/index.tsx`; `features/sanity/components/stl-renderer/cell/link-cell.tsx` and `button-cell.tsx` (external hrefs only) | `url` (the href) |
| `product-cta` | The CTA on each of `app/products/consultation/page.tsx`, `app/products/holiday-plan/page.tsx`, `app/products/trip/page.tsx` | `product`: `consultation` \| `holiday-plan` \| `trip` |
| `contact` | Email/WhatsApp/Instagram links in `app/contact/page.tsx`, `features/layout/components/footer-socials`, `features/layout/components/sub-footer` | `channel`: `email` \| `whatsapp` \| `instagram` |
| `flight-month-select` | `onValueChange` on `Tabs.Root` in `features/serpapi/components/flight-price-explorer/index.tsx` | `month` (the selected tab value) |

The first three are declarative `data-umami-event` + `data-umami-event-<key>` attributes on the anchor/button elements; Umami's tracker uses document-level event delegation, so React-rendered elements work without wiring. The flight event uses `trackEvent()` because it hangs off a component callback rather than a plain click on a link.

Where a page currently renders its CTA as a server component, the attributes are plain HTML attributes and keep it a server component; no client boundary changes are expected.

## Verification

1. **Staging/dev negative check:** view source on `development.srilanka.lv`, confirm no Umami script and no Zaraz Umami tool firing.
2. **Production pageviews:** after the Zaraz config is live, confirm via Zaraz debug mode that the tool fires, and that Umami Cloud's realtime view shows the visit.
3. **SPA single-count check:** navigate client-side between pages; exactly one pageview per route change in Umami.
4. **Events:** trigger one of each event type on production and confirm all four appear in Umami with their data properties.
5. **Helper unit test:** `trackEvent` no-ops without `window.umami` and forwards name/data when present.

The repo-side attribute changes are verifiable before the Zaraz config exists (attributes are inert without the script), so code can merge and deploy independently of the dashboard work.

## Out of Scope / Accepted Trade-offs

- Ad-blockers that block `cloud.umami.is` drop those visitors entirely. Accepted: the stats are directional, not billing-grade.
- No custom events for the newsletter signup or navigation; add later if a question actually needs them.
- Tag config lives in two places (Zaraz dashboard + repo attributes). Mitigated by the runbook in `infra/cloudflare/README.md`.
- Umami Cloud Hobby tier limits (events/month) are far above current traffic; revisit only if limits are hit.

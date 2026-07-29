# Cloudflare setup

This documents the Cloudflare configuration that fronts the Hetzner-hosted
deployment of `srilanka.lv` and its `staging.` / `development.` subdomains.

See also:
- [`docs/superpowers/specs/2026-05-02-cloudflare-in-front-of-hetzner-design.md`](../../docs/superpowers/specs/2026-05-02-cloudflare-in-front-of-hetzner-design.md)
- [`infra/hetzner/README.md`](../hetzner/README.md)
- [`infra/kamal/deploy.yml`](../kamal/deploy.yml)

---

## 1. Account and zone

- **Account email:** account-owner email (in 1Password)
- **Plan tier:** Free
- **Zone:** `srilanka.lv`
- **Cloudflare nameservers (set at Gandi during Phase E):**
  - `gene.ns.cloudflare.com`
  - `wilson.ns.cloudflare.com`

## 2. Imported DNS records

Cloudflare's "Quick scan" pulled the following records in from the existing
Vercel-hosted zone. They live in CF as the authoritative copies once the
nameserver move (Phase E) completes. Until then, this is staged-but-inactive
state.

| Type   | Name                       | Content                                          | Proxied | Note                                                                |
| ------ | -------------------------- | ------------------------------------------------ | ------- | ------------------------------------------------------------------- |
| A      | `srilanka.lv`              | `216.198.79.1`                                   | yes     | Vercel IP. Repointed at the Hetzner IP in Phase D, Task 19.         |
| CNAME  | `www.srilanka.lv`          | `e62198f77f1504c4.vercel-dns-017.com`            | yes     | Vercel www handler. Replaced with a `www → apex` Redirect Rule.     |
| CNAME  | `webmail.srilanka.lv`      | `webmail.gandi.net`                              | **no**  | Toggled to DNS-only — Gandi webmail isn't designed to be CF-proxied. |
| MX     | `srilanka.lv`              | `10 spool.mail.gandi.net`                        | n/a     | Gandi mail (primary). Critical for inbound email delivery.          |
| MX     | `srilanka.lv`              | `50 fb.mail.gandi.net`                           | n/a     | Gandi mail (fallback).                                              |
| SRV    | `_imaps._tcp.srilanka.lv`  | `0 1 993 mail.gandi.net`                         | n/a     | Email client auto-discovery.                                        |
| SRV    | `_pop3s._tcp.srilanka.lv`  | `10 1 995 mail.gandi.net`                        | n/a     | Email client auto-discovery.                                        |
| SRV    | `_submission._tcp.srilanka.lv` | `0 1 465 mail.gandi.net`                     | n/a     | SMTP submission for outbound mail.                                  |
| SRV    | `_imap._tcp.srilanka.lv`   | `0 0 0 .`                                        | n/a     | Disable plaintext IMAP (target `.`).                                |
| SRV    | `_pop3._tcp.srilanka.lv`   | `0 0 0 .`                                        | n/a     | Disable plaintext POP3 (target `.`).                                |
| TXT    | `srilanka.lv`              | `"v=spf1 include:_mailcust.gandi.net ?all"`      | n/a     | SPF — authorizes Gandi to send mail for the domain.                 |
| TXT    | `srilanka.lv`              | `"google-site-verification=jnJh...JFO6yM4"`      | n/a     | Google Search Console verification.                                 |

**Records NOT present in the import (worth checking later):**

- **DKIM** (e.g. `gm1._domainkey.srilanka.lv`): not in the scan. If Gandi has DKIM signing enabled, the public key needs to be in DNS for outbound mail to be DKIM-verified. Check Gandi's email config and add manually if needed before the NS move (Phase E).
- **DMARC** (`_dmarc.srilanka.lv`): not present. Optional; adding `v=DMARC1; p=none; rua=mailto:...` is a safe starting policy.
- **CAA**: none present, which is fine — it means no restriction on which CAs can issue certs for the domain. Cloudflare's universal cert (and the Origin Cert in Section 3) work without explicit CAA entries.

## 3. Origin Certificate

_(filled in during Phase B, Task 12)_

## 4. Zone settings

Configured in the Cloudflare dashboard, grouped by left-nav section. Verify
periodically — drift here can subtly break things (e.g. Auto Minify creeping
back on after a CF UI change).

**SSL/TLS → Overview**

- Encryption mode: **Full (strict)** — CF↔origin uses HTTPS with strict cert validation against the Origin Certificate.

**SSL/TLS → Edge Certificates**

- Always Use HTTPS: **on**
- HTTP Strict Transport Security (HSTS): **off** — deferred; turn on as a follow-up once the deploy has been stable for ≥1 month. HSTS is hard to roll back.
- Minimum TLS Version: **1.2**
- Opportunistic Encryption: **on**
- TLS 1.3: **on**
- Automatic HTTPS Rewrites: **on**
- Universal SSL: **on**

**Speed → Optimization**

- Auto Minify (HTML / CSS / JS): **all off** — Next.js handles minification; CF's pass mangles chunked output.
- Brotli: **on**
- Early Hints: **on** — Next.js emits 103 Early Hints; CF respects them.
- Rocket Loader: **off** — incompatible with React hydration.

**Scrape Shield**

- Email Address Obfuscation: **off** — mangles `mailto:` links rendered server-side.
- Server-side Excludes: **off** (default).
- Hotlink Protection: **off**.

**Network**

- HTTP/2: **on**
- HTTP/3 (with QUIC): **on**
- 0-RTT Connection Resumption: **on**
- WebSockets: **on**
- IP Geolocation: **on**
- gRPC: **off**
- Onion Routing: **off**

## 5. Cache Rules

Three rules in this order (first match wins). The Caching → Cache Rules list
must show them top-to-bottom in the order below.

| # | Rule name                | Match expression                                          | Cache eligibility | Edge TTL                                                                | Browser TTL                  |
| - | ------------------------ | --------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------- | ---------------------------- |
| 1 | `cache _next/static`     | `(starts_with(http.request.uri.path, "/_next/static/"))`  | Eligible          | Ignore cache-control header and use this TTL → **1 year**               | Override origin → **1 year** |
| 2 | `cache _next/image`      | `(starts_with(http.request.uri.path, "/_next/image"))`    | Eligible          | Use cache-control header if present, bypass cache if not                | Respect origin TTL           |
| 3 | `bypass everything else` | All incoming requests                                     | **Bypass cache**  | (n/a — Bypass action)                                                   | (n/a)                        |

Reasoning:

- **Rule 1** pins immutable hashed assets at the edge for a year. Next emits these with `Cache-Control: public, max-age=31536000, immutable`; we override anyway to make the intent explicit and isolate from any future change in Next's header behavior.
- **Rule 2** defers entirely to the headers Next sets on optimized image responses. Next picks sensible TTLs based on each source image — let it.
- **Rule 3** bypasses cache for everything else (HTML, `/api/*`, favicons, etc.). HTML caching is handled by Next's own ISR; `/api/*` must never be edge-cached.

## 6. Cloudflare Access

Configured in **Cloudflare Zero Trust** (separate dashboard from the main CF
zone view). The application below gates `staging.srilanka.lv` and
`development.srilanka.lv` so they're not crawlable or publicly reachable;
production stays open.

**Team**

- Name: `srilanka` (lowercase, used in the login URL `srilanka.cloudflareaccess.com`)
- Plan: Free (covers ≤50 users)

**Application**

- Type: Self-hosted
- Name: `srilanka non-prod`
- Destinations:
  - `staging.srilanka.lv`
  - `development.srilanka.lv`
- Browser rendering: off
- Session duration: 24 hours
- Authentication: One-time PIN (built-in; emails a 6-digit code) — `Accept all available identity providers` is on. No external IdP (Google/GitHub/etc.) is configured.

**Policy**

- Name: `allow-listed emails`
- Action: **Allow**
- Include: Emails — list of allowed addresses

The **canonical allow-list lives in the Cloudflare Zero Trust dashboard**, not
in this file (so we don't commit collaborator emails to git). To add or remove
someone, edit the policy in the dashboard. The account owner is the primary
user.

## 7. DNS records pointing at Hetzner

_(filled in during Phase D, Task 19)_

## 8. Nameserver cutover

_(filled in during Phase E, Task 27)_

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
3. Create a trigger `Production pageview`: Match rule,
   `{{ system.page.url.hostname }}` equals `srilanka.lv`. This keeps
   staging/development clean; the `data-domains` attribute below is the
   second guard.
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
- Click the footer email link with an ad-blocker (e.g., uBlock Origin)
  enabled: the mail client must still open. If the click dead-ends, add
  `target="_blank"` to the mailto anchor in `sub-footer/index.tsx` (Umami's
  click delegation defers navigation on same-tab anchors until the beacon
  settles).
- Visit from a phone on cellular data: Umami must show the correct country. If
  every visit reports Germany, the rewrite proxy is masking real client IPs;
  fallback is to point the snippet back at `https://cloud.umami.is/script.js`
  (remove `data-host-url`) until a header-forwarding proxy replaces the
  rewrites.

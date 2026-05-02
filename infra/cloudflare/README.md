# Cloudflare setup

This runbook documents the Cloudflare configuration that fronts the Hetzner-hosted
deployment of `srilanka.lv` and its `staging.` / `development.` subdomains.

See also:
- [`docs/superpowers/specs/2026-05-02-cloudflare-in-front-of-hetzner-design.md`](../../docs/superpowers/specs/2026-05-02-cloudflare-in-front-of-hetzner-design.md)
- [`infra/hetzner/README.md`](../hetzner/README.md)
- [`infra/kamal/deploy.yml`](../kamal/deploy.yml)

---

## 1. Account and zone

- **Account email:** `account-owner@example.com`
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

_(filled in during Phase B, Task 15)_

## 7. DNS records pointing at Hetzner

_(filled in during Phase D, Task 19)_

## 8. Nameserver cutover

_(filled in during Phase E, Task 27)_

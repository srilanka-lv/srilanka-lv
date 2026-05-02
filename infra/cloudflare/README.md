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

_(filled in during Phase B, Task 13)_

## 5. Cache Rules

_(filled in during Phase B, Task 14)_

## 6. Cloudflare Access

_(filled in during Phase B, Task 15)_

## 7. DNS records pointing at Hetzner

_(filled in during Phase D, Task 19)_

## 8. Nameserver cutover

_(filled in during Phase E, Task 27)_

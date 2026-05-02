# Cloudflare In Front of Hetzner Design

## Overview

Put Cloudflare in front of the Hetzner CX32 that hosts the three Kamal destinations (`development`, `staging`, `production`). Cloudflare becomes the authoritative DNS for `srilanka.lv`, the public TLS endpoint, and the proxy/CDN/WAF layer. The current Vercel deployment is replaced; Vercel is decommissioned after cutover. Production downtime during the cutover window is acceptable.

## Goal

Single-evening migration from "domain at Gandi → Vercel nameservers → Vercel-hosted app" to "domain at Gandi → Cloudflare nameservers → Cloudflare-proxied → Hetzner-hosted app". After cutover:

- `srilanka.lv` resolves through Cloudflare to Hetzner, publicly accessible.
- `staging.srilanka.lv` and `development.srilanka.lv` resolve through Cloudflare to Hetzner, gated by Cloudflare Access (email one-time PIN).
- TLS is end-to-end (Full strict): visitor↔CF on CF's universal cert, CF↔Hetzner on a Cloudflare Origin Certificate installed in kamal-proxy.
- The Hetzner box's firewall accepts 80/443 only from Cloudflare's published IP ranges; SSH (22) is unrestricted.
- The CF Origin Cert is valid 15 years; CF's universal cert is auto-rotated. Day-to-day cert maintenance disappears.

## Architecture

```
Visitor
  │
  │  HTTPS (TLS terminated at CF with CF universal cert)
  ▼
Cloudflare edge
  ├─ srilanka.lv              → public, default WAF/bot, CDN
  ├─ staging.srilanka.lv      → behind Cloudflare Access (email OTP)
  └─ development.srilanka.lv  → behind Cloudflare Access (email OTP)
  │
  │  HTTPS (Full strict, re-encrypted with CF Origin Certificate)
  ▼
Hetzner CX32  (UFW: 80/443 only from CF IP ranges; 22 unrestricted)
  │
  ▼
kamal-proxy  (terminates TLS with the CF Origin Cert; routes by Host header)
  ├─ srilanka-production container        :3000
  ├─ srilanka-staging container           :3000
  └─ srilanka-development container       :3000
```

Properties:

- Origin IP is unreachable for HTTP/HTTPS except through Cloudflare. Direct hits to the Hetzner IP get TCP-rejected on 80/443.
- TLS is end-to-end. No plaintext on the wire anywhere.
- All three environments share one IP and one TLS endpoint on the box; kamal-proxy does the host-based routing.

## Components

### Cloudflare dashboard (one-time, manual)

Setup is not managed by Terraform. A single zone with ~5 DNS records and one Access policy doesn't justify the new tool; revisit if a second zone is added. The runbook documenting every dashboard step lives in `infra/cloudflare/README.md`.

Steps:

1. Create Cloudflare account (free plan covers everything in this design).
2. Add zone `srilanka.lv`. Accept the Vercel DNS import — this also pulls MX, TXT (SPF/DKIM/DMARC) and CAA records, which must survive the nameserver move or email breaks.
3. Generate an **Origin Certificate** for `srilanka.lv` and `*.srilanka.lv`, RSA, 15-year validity. Save the PEM cert and private key — Cloudflare does not retain the private key.
4. Configure zone settings:
   - SSL/TLS mode: **Full (strict)**
   - Always Use HTTPS: on
   - Minimum TLS version: 1.2
   - Brotli: on
   - Rocket Loader: **off**
   - Auto Minify: **off**
   - Email Obfuscation: **off**
5. Cache Rules:
   - `_next/static/*` → cache aggressively (already immutable)
   - `_next/image*` → cache
   - `/api/*` → bypass
   - HTML → bypass (Next handles caching via ISR; edge HTML caching is a possible follow-up, not in scope)
6. DNS records (created before NS move, so they are live the moment NS propagates):
   - `srilanka.lv` — proxied A record → Hetzner IP
   - `staging.srilanka.lv` — proxied A record → Hetzner IP
   - `development.srilanka.lv` — proxied A record → Hetzner IP
   - MX, TXT, CAA records imported from Vercel DNS — verified present
7. Cloudflare Access application:
   - Domains: `staging.srilanka.lv`, `development.srilanka.lv`
   - Policy: "emails in this list" (allowed addresses provided at setup time)
   - Authentication: email one-time PIN
   - Free tier covers up to 50 users.

### Repo changes

**`infra/kamal/deploy.yml`** — replace per-destination `proxy: { ssl: true, host: ... }` with the equivalent that supplies the Cloudflare Origin Cert + key as files inside kamal-proxy. Today kamal-proxy fetches its own Let's Encrypt cert; after the change it serves the static Origin Cert.

> **Verify-then-write:** the exact Kamal v2 schema for "use this custom cert instead of LE" has shifted across releases. Read the current Kamal docs / `kamal-proxy` source against the version pinned in this repo before writing the YAML. Likely path: secrets-injected cert and key files mounted into the proxy container, with a `proxy.ssl` block referencing them. The implementation plan must confirm this before the edit.

**`.kamal/secrets`** — add references for the cert PEM and the key PEM:

- `KAMAL_PROXY_TLS_CERT`
- `KAMAL_PROXY_TLS_KEY`

Sourced locally from `.env`; sourced in CI from new GitHub Actions repository secrets of the same names.

**`infra/hetzner/`** — add:

- `cloudflare-firewall.sh` — fetches `https://www.cloudflare.com/ips-v4` and `https://www.cloudflare.com/ips-v6`, rebuilds UFW rules so 80/443 only allow those ranges. SSH (22) stays open. Idempotent; safe to re-run.
- A systemd timer (or cron) that runs the script weekly. CF's IP list changes rarely but does change.

These tie into the existing `infra/hetzner/` cloud-init bootstrap (which already creates the deploy user and installs Docker). The firewall script can be installed during cloud-init; the initial UFW lockdown is run manually (see Cutover, Phase 4) so we don't lock ourselves out before everything is verified.

**`infra/cloudflare/README.md`** — runbook covering every step of the dashboard setup above, in click order, so the configuration is reproducible.

**No app code changes. No Dockerfile changes. No CI workflow changes** beyond adding the two new GitHub Actions secrets.

### Hetzner box

Provisioned via the existing `infra/hetzner/` setup. Manual steps on the box itself are limited to: (a) the first `kamal deploy`, which is run from a developer machine or CI; (b) running the firewall lockdown script after cutover is verified.

## Cutover sequence

Single window, single evening. All three environments cut over together when nameservers propagate. Production downtime during the propagation window is acceptable.

### Phase 0 — Pre-staging (no user-visible change)

1. Provision the Hetzner CX32 via existing `infra/hetzner/` cloud-init.
2. Create CF account, add zone `srilanka.lv`, accept Vercel DNS import. Verify MX/TXT/CAA records came across.
3. Generate Origin Certificate. Save PEM cert and key.
4. Add `KAMAL_PROXY_TLS_CERT` and `KAMAL_PROXY_TLS_KEY` to GitHub Actions secrets and local `.env`.
5. Update `infra/kamal/deploy.yml` to use the cert (replacing `ssl: true`). Commit, push.
6. Pre-create CF DNS records for all three hostnames pointing at the Hetzner IP (proxied).
7. Configure CF zone settings per Components → Cloudflare dashboard.
8. Configure CF Access app per Components → Cloudflare dashboard.
9. `kamal deploy` for `development`, `staging`, `production` (in that order). Validate each with `curl --resolve <host>:443:<hetzner-ip> https://<host>/api/up` — must return 200 and present the CF Origin Cert chain. This catches Origin Cert / Kamal config bugs against the box before any DNS change.
10. Confirm at Gandi that DNSSEC is **off**. If on, disable and wait 24h before continuing — turning DS records mismatched with the new NS will break the zone.

### Phase 1 — Move nameservers (Vercel → Cloudflare)

11. At Gandi, replace Vercel's nameservers with the two Cloudflare nameservers shown in the CF dashboard.
12. Propagation: usually <1h, theoretical max 48h. During the window, mixed state — some resolvers still serve old records, others switch to CF. Production may be intermittently unavailable.
13. Verify with `dig +short NS srilanka.lv @8.8.8.8`, `… @1.1.1.1`, `… @<your ISP resolver>` — once they all show CF nameservers, the move is complete.
14. Validate end-to-end through real DNS:
    - `https://srilanka.lv` loads and returns the production app.
    - `https://staging.srilanka.lv` and `https://development.srilanka.lv` bounce to Cloudflare Access, accept the email OTP, then load the right environment.
    - `/api/up` returns 200 on each.
    - Sentry events from the deployed apps still arrive.
    - Email to `*@srilanka.lv` (if configured) still delivers.

### Phase 2 — Firewall lockdown

15. SSH into the Hetzner box. Run `infra/hetzner/cloudflare-firewall.sh` to rewrite UFW so 80/443 only accept traffic from CF IP ranges.
16. Install the systemd timer for weekly refresh.
17. Verify:
    - `curl https://<hetzner-ip>` from a developer machine should hang or refuse.
    - `curl https://srilanka.lv` (going through CF) should still return 200.

### Phase 3 — Cleanup

18. Remove or archive the Vercel project (or keep dormant on hobby tier as a "break glass" reference; costs nothing).
19. Remove any Vercel-specific configuration from the repo if any remains.

## Rollback

| Phase | Rollback | Cost |
|-------|----------|------|
| 0 | None needed; nothing live yet. | — |
| 1 (NS move) | Revert NS at Gandi back to Vercel's. Same propagation window applies. | Hours of mixed state, then back on Vercel. Only commit to Phase 1 when ready to stay on CF. |
| 2 (firewall) | SSH in, `sudo ufw disable`. | Trivial. |
| 3 (cleanup) | Re-create the Vercel project from git if removed. | Minutes (project was on Vercel days earlier). |

## Open questions / verify-during-implementation

1. **Exact Kamal v2 syntax for custom TLS cert in the proxy block.** Read `kamal-proxy` source for the version pinned in this repo before writing the YAML in step 5. Do not guess.
2. **CF Access policy: which email addresses are on the allow-list?** Provided by the user at setup time, captured in the `infra/cloudflare/README.md` runbook.
3. **MX / SPF / DKIM / DMARC / CAA records currently in Vercel DNS** — full list confirmed during Phase 0 step 2 before the NS move.

## Out of scope (possible follow-ups)

- Edge HTML caching with surgical purge on Sanity content updates.
- Cloudflare Workers / KV / R2.
- Cloudflare Tunnel for SSH access (could replace the open port 22).
- Custom WAF rules / rate limiting beyond CF defaults.
- Terraform-managed Cloudflare configuration.
- Multi-region origin / load balancing.

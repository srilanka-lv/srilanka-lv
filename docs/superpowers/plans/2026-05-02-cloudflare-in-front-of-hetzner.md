# Cloudflare In Front of Hetzner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate `srilanka.lv` (and the staging/development subdomains) from Vercel hosting to a Cloudflare-fronted Hetzner CX32, with TLS via a Cloudflare Origin Certificate, dev/staging gated by Cloudflare Access, and the Hetzner firewall locked down so port 80 is closed and port 443 only accepts Cloudflare's IP ranges.

**Architecture:** All three Kamal destinations (`development`, `staging`, `production`) run as containers on one Hetzner CX32 behind kamal-proxy. Cloudflare is the public TLS endpoint and the authoritative DNS. CF↔origin uses Full (strict) with a 15-year Cloudflare Origin Certificate installed in kamal-proxy.

**Tech Stack:** Cloudflare (DNS, CDN, Access, Origin CA), Kamal v2 / kamal-proxy, Hetzner Cloud (CX32, cloud-init, UFW), GitHub Actions, GHCR, Bun, Next.js (existing).

**Spec:** [`docs/superpowers/specs/2026-05-02-cloudflare-in-front-of-hetzner-design.md`](../specs/2026-05-02-cloudflare-in-front-of-hetzner-design.md)

---

## Files Touched

**Created:**
- `infra/cloudflare/README.md` — runbook documenting every Cloudflare dashboard step
- `infra/hetzner/cloudflare-firewall.sh` — script that fetches CF IP ranges and rebuilds UFW
- `infra/hetzner/cloudflare-firewall.service` — systemd one-shot unit
- `infra/hetzner/cloudflare-firewall.timer` — systemd timer (weekly refresh)

**Modified:**
- `infra/kamal/deploy.yml` — add the proxy custom-cert config
- `infra/kamal/deploy.development.yml` — keep `host`, drop `ssl: true` (replaced by global custom cert)
- `infra/kamal/deploy.staging.yml` — same as above
- `infra/kamal/deploy.production.yml` — same as above
- `.kamal/secrets` — add `KAMAL_PROXY_TLS_CERT` and `KAMAL_PROXY_TLS_KEY`
- `infra/hetzner/cloud-init.yaml` — close port 80, install firewall script + timer
- `infra/hetzner/README.md` — update "Point DNS at the VM" section to reference Cloudflare instead of "any DNS provider", drop the LE notes, add a pointer to `infra/cloudflare/README.md`
- `.github/workflows/_kamal-deploy.yml` — pass `KAMAL_PROXY_TLS_CERT` and `KAMAL_PROXY_TLS_KEY` to the deploy step

---

# Phase A — Repo prep (no infrastructure changes yet)

These tasks land in a single PR and merge before any Cloudflare or Hetzner work happens. Nothing here changes user-visible state.

---

### Task 1: Verify the Kamal v2 custom TLS cert syntax

The spec flagged this as "verify-then-write" because Kamal v2's proxy schema has shifted across releases. Do this **first** — every other Kamal-config task depends on the answer.

**Files:** none yet (research task).

- [ ] **Step 1: Confirm Kamal version pinned in this repo and CI**

Run:
```sh
gem list kamal 2>/dev/null || true
grep -n "gem install kamal" .github/workflows/_kamal-deploy.yml
```

Note the version constraint (`~> 2` in CI). The local install (if any) may be different. Use the CI-pinned version as the source of truth.

- [ ] **Step 2: Read the current kamal-proxy custom-cert docs**

Open `https://kamal-deploy.org/docs/configuration/proxy/` in a browser. Specifically look for: how to supply a custom TLS certificate and private key to kamal-proxy via `proxy:` config (instead of letting it fetch from Let's Encrypt).

- [ ] **Step 3: Cross-check against the kamal source**

Run:
```sh
gem unpack kamal --version '~> 2' --target /tmp/kamal-source
grep -rn "tls\|certificate\|ssl" /tmp/kamal-source/kamal-*/lib/kamal/configuration/proxy.rb
```

Read the actual schema the gem accepts. The docs may lag the code.

- [ ] **Step 4: Write down the exact YAML shape**

Capture in a scratchpad:
- The exact key name(s) under `proxy:` for the cert PEM and the key PEM (e.g. `ssl_certificate_pem` / `ssl_private_key_pem`, or `tls.certificate_pem` / `tls.private_key_pem`, or file-path variants).
- Whether the values are inline PEM strings or paths to files on the host.
- Whether `ssl: true` stays, gets replaced, or is incompatible with custom certs.

This shape is referenced in Task 5 — fill it in there. **Do not guess.** If after the docs and source you're still unsure, run `kamal config print -d development -c infra/kamal/deploy.yml` against a test edit and read the validated config back.

- [ ] **Step 5: No commit (research task)**

---

### Task 2: Add the Cloudflare runbook scaffold

A markdown runbook that documents every dashboard click. Future-you (or anyone else) reproduces the CF setup from this file. Filled in incrementally as Phase B progresses; this task scaffolds it.

**Files:**
- Create: `infra/cloudflare/README.md`

- [ ] **Step 1: Create the file with the section structure**

```markdown
# Cloudflare setup

This runbook documents the Cloudflare configuration that fronts the Hetzner-hosted
deployment of `srilanka.lv` and its `staging.` / `development.` subdomains.

See also:
- [`docs/superpowers/specs/2026-05-02-cloudflare-in-front-of-hetzner-design.md`](../../docs/superpowers/specs/2026-05-02-cloudflare-in-front-of-hetzner-design.md)
- [`infra/hetzner/README.md`](../hetzner/README.md)
- [`infra/kamal/deploy.yml`](../kamal/deploy.yml)

---

## 1. Account and zone

_(filled in during Phase B, Task 10)_

## 2. Imported DNS records

_(filled in during Phase B, Task 11)_

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
```

- [ ] **Step 2: Commit**

```sh
git add infra/cloudflare/README.md
git commit -m "docs: 📝 scaffold Cloudflare runbook"
```

---

### Task 3: Write the Cloudflare firewall script

The script that fetches CF's published IP ranges and rebuilds UFW so port 443 only allows those ranges and port 80 is denied entirely. SSH (22) is left untouched.

**Files:**
- Create: `infra/hetzner/cloudflare-firewall.sh`

- [ ] **Step 1: Write the script**

```sh
#!/usr/bin/env bash
# cloudflare-firewall.sh
#
# Rebuilds UFW so:
#   - Port 22 (SSH): allowed from anywhere (managed elsewhere; we don't touch it)
#   - Port 80 (HTTP): denied entirely (Cloudflare handles HTTP→HTTPS redirects
#     at the edge; no Let's Encrypt HTTP-01 challenge needed since we use the
#     Cloudflare Origin Certificate)
#   - Port 443 (HTTPS): allowed only from Cloudflare's published IP ranges
#
# Run as root (sudo). Idempotent: deletes prior CF rules before recreating.
# The systemd timer (cloudflare-firewall.timer) re-runs this weekly to pick up
# changes to Cloudflare's IP list.

set -euo pipefail

CF_V4_URL="https://www.cloudflare.com/ips-v4"
CF_V6_URL="https://www.cloudflare.com/ips-v6"
COMMENT="cloudflare-edge"

if [[ "${EUID}" -ne 0 ]]; then
  echo "must be run as root" >&2
  exit 1
fi

if ! command -v ufw >/dev/null 2>&1; then
  echo "ufw not installed" >&2
  exit 1
fi

# Fetch CF IP ranges. Fail loudly rather than wipe the firewall on a network blip.
v4="$(curl -fsSL --max-time 10 "${CF_V4_URL}")"
v6="$(curl -fsSL --max-time 10 "${CF_V6_URL}")"

if [[ -z "${v4}" || -z "${v6}" ]]; then
  echo "fetched empty CF IP list, aborting" >&2
  exit 1
fi

# Remove prior CF-tagged rules. `ufw status numbered` lists rules with their
# numbers; we filter for our COMMENT and delete from the bottom up so numbers
# stay stable as we delete.
mapfile -t to_delete < <(
  ufw status numbered | grep "${COMMENT}" | awk -F'[][]' '{print $2}' | sort -rn
)
for n in "${to_delete[@]}"; do
  yes | ufw delete "${n}" >/dev/null
done

# Deny port 80 explicitly (and remove any prior allow rules on 80).
ufw delete allow 80/tcp >/dev/null 2>&1 || true
ufw deny 80/tcp comment "${COMMENT}-deny-80" >/dev/null

# Allow 443 only from CF ranges.
while IFS= read -r cidr; do
  [[ -z "${cidr}" ]] && continue
  ufw allow proto tcp from "${cidr}" to any port 443 comment "${COMMENT}" >/dev/null
done <<< "${v4}"

while IFS= read -r cidr; do
  [[ -z "${cidr}" ]] && continue
  ufw allow proto tcp from "${cidr}" to any port 443 comment "${COMMENT}" >/dev/null
done <<< "${v6}"

# Reload UFW so the changes take effect.
ufw reload >/dev/null

echo "cloudflare-firewall: applied $(echo "${v4}" | wc -l) IPv4 + $(echo "${v6}" | wc -l) IPv6 ranges"
```

- [ ] **Step 2: Mark executable**

```sh
chmod +x infra/hetzner/cloudflare-firewall.sh
```

- [ ] **Step 3: Lint with shellcheck**

```sh
shellcheck infra/hetzner/cloudflare-firewall.sh
```

Expected: no warnings. If shellcheck isn't installed locally, run via Docker:

```sh
docker run --rm -v "$PWD:/mnt" koalaman/shellcheck:stable /mnt/infra/hetzner/cloudflare-firewall.sh
```

- [ ] **Step 4: Commit**

```sh
git add infra/hetzner/cloudflare-firewall.sh
git commit -m "feat: 🔒 add UFW lockdown script for Cloudflare IP ranges"
```

---

### Task 4: Write the systemd unit and timer

The script in Task 3 needs to re-run weekly so the firewall picks up changes to Cloudflare's IP list. systemd handles this without a cron daemon.

**Files:**
- Create: `infra/hetzner/cloudflare-firewall.service`
- Create: `infra/hetzner/cloudflare-firewall.timer`

- [ ] **Step 1: Write the service unit**

```ini
# cloudflare-firewall.service
#
# One-shot service that re-applies the UFW rules from cloudflare-firewall.sh.
# Triggered by cloudflare-firewall.timer (weekly) and on demand.

[Unit]
Description=Refresh UFW rules for Cloudflare IP ranges
Wants=network-online.target
After=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/local/sbin/cloudflare-firewall.sh
```

- [ ] **Step 2: Write the timer unit**

```ini
# cloudflare-firewall.timer
#
# Runs cloudflare-firewall.service weekly, plus 5 minutes after every boot
# (so a freshly rebooted box catches up promptly).

[Unit]
Description=Weekly refresh of Cloudflare-IP UFW rules

[Timer]
OnBootSec=5min
OnUnitActiveSec=1week
Persistent=true

[Install]
WantedBy=timers.target
```

- [ ] **Step 3: Commit**

```sh
git add infra/hetzner/cloudflare-firewall.service infra/hetzner/cloudflare-firewall.timer
git commit -m "feat: ⏱️ add systemd unit + timer for weekly Cloudflare-IP refresh"
```

---

### Task 5: Update Kamal config to use the Cloudflare Origin Certificate

Apply the YAML shape discovered in Task 1. The exact key names below are placeholders the engineer fills from Task 1's research.

**Files:**
- Modify: `infra/kamal/deploy.yml`
- Modify: `infra/kamal/deploy.development.yml`
- Modify: `infra/kamal/deploy.staging.yml`
- Modify: `infra/kamal/deploy.production.yml`

- [ ] **Step 1: Add the custom-cert proxy config to `infra/kamal/deploy.yml`**

The current proxy block looks like:

```yaml
proxy:
  app_port: 3000
  healthcheck:
    path: /api/up
    interval: 3
    timeout: 30
```

Replace with (using the exact keys discovered in Task 1; the example below uses `ssl_certificate_pem` / `ssl_private_key_pem` as a placeholder — substitute the real ones):

```yaml
proxy:
  app_port: 3000
  ssl: true
  ssl_certificate_pem: <%= ENV['KAMAL_PROXY_TLS_CERT'] %>
  ssl_private_key_pem: <%= ENV['KAMAL_PROXY_TLS_KEY'] %>
  healthcheck:
    path: /api/up
    interval: 3
    timeout: 30
```

Notes for the engineer:
- The cert and key are passed as PEM-string env vars, not file paths. CI sets them from GitHub Actions secrets; locally they come from `.env` / 1Password CLI.
- **If Task 1 found that Kamal expects file paths, not inline PEM**, then the script needs to write the env-var contents to temp files at deploy time. In that case, prefer Kamal's inline-PEM mode if it exists; if it doesn't, document the file-write step in the per-env files. Don't store the cert/key as committed files.

- [ ] **Step 2: Drop `ssl: true` from each per-env file**

Each of `infra/kamal/deploy.development.yml`, `…staging.yml`, `…production.yml` currently has:

```yaml
proxy:
  ssl: true
  host: development.srilanka.lv  # (or staging / srilanka.lv)
```

Change to (keeping `host`, dropping `ssl: true` since it now lives in the global file as the custom-cert config):

```yaml
proxy:
  host: development.srilanka.lv  # (or staging.srilanka.lv / srilanka.lv)
```

If Task 1 discovered that Kamal v2 requires `ssl: true` even for custom certs (because `ssl: true` is the toggle for "TLS on" generally), keep `ssl: true` in the per-env files. The shape from Task 1 is authoritative.

- [ ] **Step 3: Validate the config parses**

You don't need a real deploy target to validate config. Run with placeholder env vars:

```sh
HETZNER_HOST=1.2.3.4 \
KAMAL_REGISTRY_PASSWORD=x \
KAMAL_PROXY_TLS_CERT="$(printf -- '-----BEGIN CERTIFICATE-----\nx\n-----END CERTIFICATE-----')" \
KAMAL_PROXY_TLS_KEY="$(printf -- '-----BEGIN PRIVATE KEY-----\nx\n-----END PRIVATE KEY-----')" \
SANITY_API_KEY=x RESEND_API_KEY=x RESEND_AUDIENCE_ID=x SERPAPI_API_KEY=x NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID=x \
bun infra:kamal config print -d development
```

Expected: validated YAML printed, no schema errors.

- [ ] **Step 4: Commit**

```sh
git add infra/kamal/deploy.yml infra/kamal/deploy.*.yml
git commit -m "feat: 🔐 use Cloudflare Origin Certificate in kamal-proxy"
```

---

### Task 6: Add new secret references to `.kamal/secrets`

Kamal reads `.kamal/secrets` to know which env vars to read from the surrounding shell.

**Files:**
- Modify: `.kamal/secrets`

- [ ] **Step 1: Add the two new lines**

Append to `.kamal/secrets`:

```sh
KAMAL_PROXY_TLS_CERT=$KAMAL_PROXY_TLS_CERT
KAMAL_PROXY_TLS_KEY=$KAMAL_PROXY_TLS_KEY
```

- [ ] **Step 2: Commit**

```sh
git add .kamal/secrets
git commit -m "feat: 🔐 add Cloudflare Origin Cert env vars to kamal secrets"
```

---

### Task 7: Update CI workflow to pass cert/key secrets

The reusable deploy workflow needs to expose the two new env vars to the `kamal deploy` step.

**Files:**
- Modify: `.github/workflows/_kamal-deploy.yml`

- [ ] **Step 1: Add the two env entries to the `Deploy with Kamal` step**

The existing `env:` block under the `Deploy with Kamal` step lists `HETZNER_HOST`, `KAMAL_REGISTRY_PASSWORD`, etc. Add (alphabetised next to other `KAMAL_*` entries):

```yaml
          KAMAL_PROXY_TLS_CERT: ${{ secrets.KAMAL_PROXY_TLS_CERT }}
          KAMAL_PROXY_TLS_KEY: ${{ secrets.KAMAL_PROXY_TLS_KEY }}
```

- [ ] **Step 2: Validate the workflow YAML parses**

```sh
yq eval '.jobs.deploy.steps[] | select(.name == "Deploy with Kamal") | .env' .github/workflows/_kamal-deploy.yml
```

Expected: outputs the env block including both new keys. (If `yq` isn't installed: `brew install yq`.)

- [ ] **Step 3: Commit**

```sh
git add .github/workflows/_kamal-deploy.yml
git commit -m "ci: 🔐 pass Cloudflare Origin Cert secrets to kamal deploy"
```

---

### Task 8: Update cloud-init to install firewall script + timer (for future provisions)

The new Hetzner box in Phase D will be created with this updated cloud-init. The script and timer should be installed at boot, but **the timer should NOT auto-enable on first boot** — we run it manually after cutover (Phase F) so we don't lock ourselves out before everything is verified. Also: drop the unconditional `ufw allow 80/tcp` (port 80 is denied by the script later, but to be tidy we drop the open rule from the bootstrap too).

**Files:**
- Modify: `infra/hetzner/cloud-init.yaml`

- [ ] **Step 1: Add `write_files` block to install the script and units**

After the `packages:` block and before `runcmd:`, add:

```yaml
write_files:
  - path: /usr/local/sbin/cloudflare-firewall.sh
    permissions: '0755'
    owner: root:root
    content: |
      # Contents of infra/hetzner/cloudflare-firewall.sh — paste verbatim here.
      # Engineer note: keep this in sync with the file in the repo. A future
      # improvement is to fetch it from the repo at provision time, but until
      # the repo is bootstrapped we paste.
  - path: /etc/systemd/system/cloudflare-firewall.service
    permissions: '0644'
    owner: root:root
    content: |
      # Contents of infra/hetzner/cloudflare-firewall.service — paste verbatim.
  - path: /etc/systemd/system/cloudflare-firewall.timer
    permissions: '0644'
    owner: root:root
    content: |
      # Contents of infra/hetzner/cloudflare-firewall.timer — paste verbatim.
```

When committing, replace each `# Contents of … — paste verbatim` placeholder with the actual file body, indented 6 spaces under `content: |` (cloud-init YAML requirement).

- [ ] **Step 2: Update the firewall section of `runcmd:`**

The existing block:

```yaml
  # Firewall: allow SSH + HTTP(S), deny everything else
  - ufw default deny incoming
  - ufw default allow outgoing
  - ufw allow OpenSSH
  - ufw allow 80/tcp
  - ufw allow 443/tcp
  - ufw --force enable
```

Replace with:

```yaml
  # Firewall: allow SSH + HTTPS only (HTTPS will be tightened to Cloudflare IPs
  # after cutover by running cloudflare-firewall.sh manually — see
  # infra/hetzner/README.md). Port 80 stays closed: Cloudflare handles HTTP→HTTPS
  # redirects at the edge, and we use the Cloudflare Origin Certificate, not
  # Let's Encrypt, so no ACME HTTP-01 challenge is needed.
  - ufw default deny incoming
  - ufw default allow outgoing
  - ufw allow OpenSSH
  - ufw allow 443/tcp
  - ufw --force enable
```

- [ ] **Step 3: Commit**

```sh
git add infra/hetzner/cloud-init.yaml
git commit -m "feat: 🔒 cloud-init installs CF firewall script; closes port 80"
```

---

### Task 9: Update `infra/hetzner/README.md` for the new flow

The current README's "Point DNS at the VM" section assumes you add records at any DNS provider. Replace with a pointer to the Cloudflare runbook. Drop the "Let's Encrypt" phrasing since we're not using LE anymore.

**Files:**
- Modify: `infra/hetzner/README.md`

- [ ] **Step 1: Replace the "Point DNS at the VM" section**

Find the section starting with `## 2. Point DNS at the VM` and ending before `## 3. Configure GitHub`. Replace its body with:

```markdown
## 2. Point DNS at the VM (via Cloudflare)

DNS is managed in Cloudflare. See [`infra/cloudflare/README.md`](../cloudflare/README.md)
for the full setup. The relevant records (all proxied / "orange cloud") are:

| Record                       | Type | Target            | Proxied |
| ---------------------------- | ---- | ----------------- | ------- |
| `srilanka.lv`                | A    | `<vm-ip>`         | yes     |
| `staging.srilanka.lv`        | A    | `<vm-ip>`         | yes     |
| `development.srilanka.lv`    | A    | `<vm-ip>`         | yes     |

`staging.srilanka.lv` and `development.srilanka.lv` are also gated by Cloudflare
Access (email one-time PIN) — only addresses on the allow-list can reach them.

> kamal-proxy uses a **Cloudflare Origin Certificate** (15-year validity) for
> the TLS termination on the VM, not Let's Encrypt. The cert and key are passed
> in via `KAMAL_PROXY_TLS_CERT` / `KAMAL_PROXY_TLS_KEY` secrets — see the
> "Configure GitHub" section below.
```

- [ ] **Step 2: Add the two new secrets to the per-environment secrets table**

Find the per-environment secrets table and add:

```markdown
| `KAMAL_PROXY_TLS_CERT`                  | Cloudflare Origin Cert PEM (full chain)   |
| `KAMAL_PROXY_TLS_KEY`                   | Cloudflare Origin Cert private key PEM    |
```

- [ ] **Step 3: Add a "Lock down the firewall" subsection to "Ongoing operations"**

Append to the README:

```markdown
## 6. Lock down the firewall to Cloudflare IP ranges

After cutover (and after verifying the deploy works through Cloudflare), run
the lockdown script on the VM. It rewrites UFW so port 443 only accepts
traffic from Cloudflare's published IP ranges, and confirms port 80 is denied.

```sh
ssh deploy@<vm-ip>
sudo /usr/local/sbin/cloudflare-firewall.sh
sudo systemctl enable --now cloudflare-firewall.timer
```

The systemd timer re-runs the script weekly so the rules pick up changes to
Cloudflare's IP list.
```
```

- [ ] **Step 4: Commit**

```sh
git add infra/hetzner/README.md
git commit -m "docs: 📝 update Hetzner README for Cloudflare-fronted flow"
```

---

### Task 10: Push Phase A to the development branch

All Phase A commits land on the `development` branch (where we already are). **Do not** open a PR to `main` yet — that would trigger release-please and the staging/production deploy chain, which would fail until the box exists in Phase D. The PR to `main` happens at the end (Task 30, after everything is verified).

- [ ] **Step 1: Push the branch**

```sh
git push origin development
```

- [ ] **Step 2: Watch the auto-triggered deploy run (it will fail — that's expected)**

The push triggers `build-development` (succeeds) and `deploy-development` (fails because the Hetzner VM doesn't exist yet, or `HETZNER_HOST` isn't set yet, or `KAMAL_PROXY_TLS_CERT` isn't in environment secrets yet). Acknowledge the failure and move on; it's resolved by the end of Phase D.

GitHub → Actions → confirm `build-development` is green and `deploy-development` is red. Don't try to fix the deploy here.

- [ ] **Step 3: No commit (push task)**

---

# Phase B — Cloudflare account & cert setup (manual, dashboard)

These tasks are dashboard clicks. As you complete each, fill in the corresponding section of `infra/cloudflare/README.md` so the runbook reflects what was actually done.

---

### Task 11: Create CF account and add the zone

- [ ] **Step 1: Sign up / log in to Cloudflare**

`https://dash.cloudflare.com/sign-up` (free plan).

- [ ] **Step 2: Add `srilanka.lv` as a zone**

Dashboard → "Add a Site" → enter `srilanka.lv` → choose Free plan → continue.

- [ ] **Step 3: Accept the DNS scan results**

Cloudflare will scan public DNS for `srilanka.lv` and offer to import the discovered records (currently served by Vercel). Click "Continue" to import. Do not yet move nameservers.

- [ ] **Step 4: Note the assigned Cloudflare nameservers**

Cloudflare displays two nameservers (e.g. `aria.ns.cloudflare.com` and `ned.ns.cloudflare.com`). **Save these** — you'll set them at Gandi in Phase E.

- [ ] **Step 5: Update the runbook**

Fill in `infra/cloudflare/README.md` § 1 with: account email, plan tier, the two assigned nameservers (verbatim).

- [ ] **Step 6: Commit the runbook update**

```sh
git add infra/cloudflare/README.md
git commit -m "docs: 📝 record CF account and nameservers in runbook"
```

---

### Task 12: Verify the imported DNS records

The Vercel scan should have brought across MX, TXT, and CAA records. Missing records here = broken email after the NS move.

- [ ] **Step 1: Compare against the current DNS at Vercel**

Run from your laptop **before** the NS move:

```sh
dig srilanka.lv ANY +noall +answer @ns1.vercel-dns.com
dig srilanka.lv MX +short
dig srilanka.lv TXT +short
dig srilanka.lv CAA +short
```

Capture the output. Some Vercel records may not appear via `dig ANY` due to provider quirks — also check the Vercel dashboard's DNS panel directly.

- [ ] **Step 2: Compare against what Cloudflare imported**

In CF dashboard → DNS → Records, list every record. Cross-check that every MX, TXT, and CAA record from Step 1 is present. Manually add any that are missing (Type, Name, Content match exactly).

For CAA records specifically: if any CAA record restricts which CAs can issue certs for `srilanka.lv`, add `0 issue "letsencrypt.org"` (or remove the restriction) — Cloudflare needs to be able to issue the universal edge cert. Cloudflare also auto-adds itself if needed but be explicit.

- [ ] **Step 3: Update the runbook**

Fill in `infra/cloudflare/README.md` § 2 with the full final list of imported records (table form).

- [ ] **Step 4: Commit the runbook update**

```sh
git add infra/cloudflare/README.md
git commit -m "docs: 📝 record imported DNS records in runbook"
```

---

### Task 13: Generate the Cloudflare Origin Certificate

- [ ] **Step 1: Generate the cert**

CF dashboard → SSL/TLS → Origin Server → "Create Certificate".

Settings:
- Generate private key and CSR with Cloudflare: **Yes** (default)
- Hostnames: `srilanka.lv`, `*.srilanka.lv` — both, on separate lines. The wildcard does **not** cover the apex; you need both.
- Key type: **RSA (2048)**
- Certificate Validity: **15 years**

Click Create.

- [ ] **Step 2: Save the cert and key**

Cloudflare shows two PEM blocks: the certificate and the private key. **The private key is shown once only.** Copy both into a password manager (1Password) immediately. Save them as separate items:

- `srilanka.lv CF Origin Cert (PEM)` — the certificate block, including `-----BEGIN CERTIFICATE-----` / `-----END CERTIFICATE-----`
- `srilanka.lv CF Origin Cert Private Key (PEM)` — the key block, including `-----BEGIN PRIVATE KEY-----` / `-----END PRIVATE KEY-----`

- [ ] **Step 3: Save them to your local `.env` for testing**

Create or update your local `.env` (kept outside the repo):

```sh
KAMAL_PROXY_TLS_CERT="$(cat <<'EOF'
-----BEGIN CERTIFICATE-----
... full cert ...
-----END CERTIFICATE-----
EOF
)"

KAMAL_PROXY_TLS_KEY="$(cat <<'EOF'
-----BEGIN PRIVATE KEY-----
... full key ...
-----END PRIVATE KEY-----
EOF
)"
```

- [ ] **Step 4: Update the runbook**

Fill in `infra/cloudflare/README.md` § 3 with: hostnames covered, key type, validity period, expiry date (today + 15 years), and a note that the private key is in 1Password under the item name above.

- [ ] **Step 5: Commit the runbook update**

```sh
git add infra/cloudflare/README.md
git commit -m "docs: 📝 record Origin Certificate creation in runbook"
```

---

### Task 14: Configure CF zone settings

- [ ] **Step 1: SSL/TLS settings**

CF dashboard → SSL/TLS → Overview:
- Encryption mode: **Full (strict)**

CF dashboard → SSL/TLS → Edge Certificates:
- Always Use HTTPS: **on**
- Minimum TLS Version: **TLS 1.2**
- Opportunistic Encryption: **on**
- Automatic HTTPS Rewrites: **on**
- HTTP Strict Transport Security (HSTS): leave **off for now** (turn on in a follow-up after the deploy is stable — HSTS is hard to roll back)

- [ ] **Step 2: Network / speed settings**

CF dashboard → Speed → Optimization:
- Auto Minify (HTML/CSS/JS): **all off** (Next.js handles this; CF minification breaks some chunked output)
- Brotli: **on**
- Rocket Loader: **off** (interferes with React hydration)
- Early Hints: **on** (Next.js sends 103 Early Hints — CF respects them)

CF dashboard → Scrape Shield:
- Email Address Obfuscation: **off** (mangles `mailto:` links rendered server-side)

CF dashboard → Network:
- HTTP/2: **on** (default)
- HTTP/3 (with QUIC): **on**
- 0-RTT Connection Resumption: **on**

- [ ] **Step 3: Update the runbook**

Fill in `infra/cloudflare/README.md` § 4 with the final settings as a checklist (matching the bullet structure above), so future-you can verify nothing has drifted.

- [ ] **Step 4: Commit the runbook update**

```sh
git add infra/cloudflare/README.md
git commit -m "docs: 📝 record CF zone settings in runbook"
```

---

### Task 15: Configure Cache Rules

- [ ] **Step 1: Create three Cache Rules**

CF dashboard → Caching → Cache Rules → "Create rule" three times. Order them as listed (first match wins):

1. **`bypass /api/*` and HTML**
   - Field: URI Path → matches regex → `^/api/.*$|^/(?!_next/).*$`
   - Then: Cache eligibility → **Bypass cache**

   Why: Next API routes must never be edge-cached; HTML pages are handled by Next's own caching (ISR).

2. **`cache /_next/static/*`**
   - Field: URI Path → starts with → `/_next/static/`
   - Then: Cache eligibility → **Eligible for cache**, Edge TTL → **Override origin**: 1 year, Browser TTL → Override origin: 1 year.

   Why: Next emits these with content-hashed filenames; safe to cache forever.

3. **`cache /_next/image*`**
   - Field: URI Path → starts with → `/_next/image`
   - Then: Cache eligibility → **Eligible for cache**, Edge TTL → Use cache-control header from origin (Next sets sensible defaults).

- [ ] **Step 2: Test each rule's preview**

CF's Cache Rules editor has a "Preview" function — paste sample URLs (`/`, `/api/up`, `/_next/static/abc.js`, `/_next/image?url=…`) and confirm each is matched by the expected rule.

- [ ] **Step 3: Update the runbook**

Fill in `infra/cloudflare/README.md` § 5 with the three rules in order, including the exact regex / prefix matchers used.

- [ ] **Step 4: Commit the runbook update**

```sh
git add infra/cloudflare/README.md
git commit -m "docs: 📝 record Cache Rules in runbook"
```

---

### Task 16: Set up Cloudflare Access for staging and development

- [ ] **Step 1: Enable Cloudflare Zero Trust (free)**

CF dashboard → Zero Trust (left nav) → if first time, you'll be prompted to set a team name (e.g. `srilanka`) and choose the free plan. Up to 50 users.

- [ ] **Step 2: Create the Access application**

Zero Trust → Access → Applications → "Add an application" → **Self-hosted**.

Application config:
- Application name: `srilanka non-prod`
- Session duration: **24 hours**
- Application domain: add **two** rows:
  - `staging.srilanka.lv`
  - `development.srilanka.lv`
- Identity providers: **One-time PIN** (default; emails a 6-digit code)
- Leave other settings at defaults.

- [ ] **Step 3: Add the policy**

When prompted to add a policy:
- Policy name: `allow-listed emails`
- Action: **Allow**
- Configure rules → Include → **Emails**: list the addresses allowed to access staging/dev (at minimum, `account-owner@example.com`; add others as needed).

Click Add application.

- [ ] **Step 4: Update the runbook**

Fill in `infra/cloudflare/README.md` § 6 with: team name, application name, the two domains, policy details (allowed emails — or a note that the canonical list lives in the dashboard if you'd rather not commit emails to git).

- [ ] **Step 5: Commit the runbook update**

```sh
git add infra/cloudflare/README.md
git commit -m "docs: 📝 record CF Access app + policy in runbook"
```

---

# Phase C — GitHub secrets

### Task 17: Add cert/key to GitHub Actions per-environment secrets

The CI deploy expects `KAMAL_PROXY_TLS_CERT` and `KAMAL_PROXY_TLS_KEY` to be in the per-environment secrets, not repo-wide (so future per-env rotation works).

- [ ] **Step 1: Add the secrets to each of the three environments**

GitHub → Repo → Settings → Environments → for each of `development`, `staging`, `production`:

1. Click the environment.
2. Add environment secret: `KAMAL_PROXY_TLS_CERT` → paste the full PEM cert block (including BEGIN/END lines).
3. Add environment secret: `KAMAL_PROXY_TLS_KEY` → paste the full PEM private key block.

All three environments use the **same** cert and key (the wildcard cert covers all three hostnames).

- [ ] **Step 2: Verify the secrets are visible to CI**

Trigger a re-run of the most recent successful deploy workflow (Actions → workflow run → "Re-run all jobs"). It should still succeed (the new secrets aren't actually consumed yet — the new Kamal config landed in Phase A, but the deploy still works because kamal-proxy on the existing box still uses LE… wait, the previous box doesn't exist yet either, so this verification only makes sense after Phase D's first deploy).

Defer verification to Task 23.

---

# Phase D — Provision Hetzner & deploy

### Task 18: Provision the Hetzner CX32

- [ ] **Step 1: Generate the deploy keypair (if not already done)**

```sh
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/srilanka_deploy -N ""
```

- [ ] **Step 2: Prepare the cloud-init**

Copy `infra/hetzner/cloud-init.yaml` to a scratch file. Replace:
- `REPLACE_WITH_ADMIN_SSH_PUBLIC_KEY` → contents of `~/.ssh/id_ed25519.pub` (your personal key)
- `REPLACE_WITH_DEPLOY_SSH_PUBLIC_KEY` → contents of `~/.ssh/srilanka_deploy.pub`

- [ ] **Step 3: Create the VM in Hetzner Cloud**

Hetzner Cloud Console → Servers → Add Server:
- Image: Ubuntu 24.04 LTS
- Type: CX32 (4 vCPU, 8 GB RAM, x86)
- Location: pick the EU region closest to your audience
- SSH keys: add your personal SSH key
- Cloud config: paste the prepared cloud-init from Step 2
- Name: `srilanka-prod` (or whatever — only matters in the Hetzner UI)

Click Create.

- [ ] **Step 4: Note the VM's IPv4 address**

Save it — you'll use it in the next several tasks. Refer to it as `<vm-ip>`.

- [ ] **Step 5: Verify the VM came up correctly**

Wait ~2 minutes for cloud-init to complete. Then:

```sh
ssh deploy@<vm-ip>
# Should connect without a password
sudo systemctl status docker
# Should show "active (running)"
sudo ufw status
# Should show: 22, 443 allow; 80 NOT in the list
ls -l /usr/local/sbin/cloudflare-firewall.sh
# Should exist, mode 0755
systemctl list-unit-files | grep cloudflare-firewall
# Should show .service and .timer (timer disabled — we enable it in Phase F)
```

If any of these fail, debug `/var/log/cloud-init-output.log` on the VM before continuing.

- [ ] **Step 6: Add `HETZNER_HOST` to GitHub repo secrets**

GitHub → Repo → Settings → Secrets and variables → Actions → New repository secret:
- `HETZNER_HOST` = `<vm-ip>`
- `HETZNER_SSH_KEY` = contents of `~/.ssh/srilanka_deploy` (private key)

(If these were created earlier from the original Hetzner README, just verify they exist and are correct.)

---

### Task 19: Pre-create CF DNS records pointing at the VM

- [ ] **Step 1: Edit the imported `srilanka.lv` record**

CF dashboard → DNS → Records → find the existing `srilanka.lv` record (currently CNAME or A pointing at Vercel) → Edit:
- Type: **A**
- Name: `srilanka.lv`
- IPv4 address: `<vm-ip>`
- Proxy status: **Proxied** (orange cloud)
- TTL: Auto

- [ ] **Step 2: Add `staging.srilanka.lv`**

DNS → Records → Add record:
- Type: A, Name: `staging`, IPv4: `<vm-ip>`, Proxied: yes, TTL: Auto

- [ ] **Step 3: Add `development.srilanka.lv`**

DNS → Records → Add record:
- Type: A, Name: `development`, IPv4: `<vm-ip>`, Proxied: yes, TTL: Auto

- [ ] **Step 4: Confirm DNSSEC is OFF at Gandi**

Log in to Gandi → Domains → `srilanka.lv` → DNSSEC tab. If any DS records are configured, **delete them and wait 24h before continuing to Task 26**. Mismatched DS records will break the zone after the NS move.

If DNSSEC was already off, no wait needed.

- [ ] **Step 5: Update the runbook**

Fill in `infra/cloudflare/README.md` § 7 with the final DNS records (proxied A records, three of them).

- [ ] **Step 6: Commit the runbook update**

```sh
git add infra/cloudflare/README.md
git commit -m "docs: 📝 record proxied DNS records in runbook"
```

---

### Task 20: First Kamal deploy — development

- [ ] **Step 1: Set up local env**

In your shell (or via direnv / 1Password CLI), have the following loaded:

```sh
export HETZNER_HOST=<vm-ip>
export KAMAL_REGISTRY_PASSWORD=<a GitHub PAT with read:packages>
export KAMAL_PROXY_TLS_CERT="$(cat <<'EOF'
... full PEM cert ...
EOF
)"
export KAMAL_PROXY_TLS_KEY="$(cat <<'EOF'
... full PEM key ...
EOF
)"
export SANITY_API_KEY=...
export RESEND_API_KEY=...
export RESEND_AUDIENCE_ID=...
export SERPAPI_API_KEY=...
export NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID=...
```

- [ ] **Step 2: Run `kamal setup` for development**

`kamal setup` installs kamal-proxy on the VM, logs in to GHCR, and does the first deploy.

```sh
bun infra:kamal setup -d development
```

Watch the output. Expected: kamal-proxy installs, container pulls from GHCR, container starts, healthcheck on `/api/up` returns 200, traffic switches to the new container.

If it fails on the cert config, the Task 1 syntax is wrong — go back and re-verify against the Kamal source for the version actually pinned.

- [ ] **Step 3: Validate via curl with `--resolve`**

This bypasses DNS entirely (which still points at Vercel) and hits the VM directly with the right `Host` header:

```sh
curl -v --resolve development.srilanka.lv:443:<vm-ip> https://development.srilanka.lv/api/up
```

Expected:
- TLS handshake completes.
- Cert chain shown by `-v` is the **Cloudflare Origin Cert** (issuer: `CloudFlare Inc ECC CA-3` or `CloudFlare Origin SSL Certificate Authority`). It will NOT be trusted by curl by default — that's fine and expected. Add `-k` to ignore the trust failure (or `--cacert` with Cloudflare's Origin CA root if you have it locally).
- HTTP response: 200, body: whatever `/api/up` returns.

```sh
curl -k --resolve development.srilanka.lv:443:<vm-ip> https://development.srilanka.lv/
```

Expected: 200, full HTML page rendered. The `NEXT_PUBLIC_SELF_URL` env var should be `https://development.srilanka.lv` — check the rendered HTML for any absolute URL using a different host.

- [ ] **Step 4: No commit (deploy task)**

---

### Task 21: First Kamal deploy — staging

- [ ] **Step 1: Run `kamal setup` for staging**

```sh
bun infra:kamal setup -d staging
```

Expected: same flow as Task 20 step 2, against the staging container/host.

- [ ] **Step 2: Validate via curl with `--resolve`**

```sh
curl -k --resolve staging.srilanka.lv:443:<vm-ip> https://staging.srilanka.lv/api/up
curl -k --resolve staging.srilanka.lv:443:<vm-ip> https://staging.srilanka.lv/
```

Expected: 200 on both.

- [ ] **Step 3: Confirm host-routing works**

Both `development.srilanka.lv` and `staging.srilanka.lv` now respond on the same VM IP. Confirm kamal-proxy routes them to different containers:

```sh
curl -k --resolve development.srilanka.lv:443:<vm-ip> https://development.srilanka.lv/api/up
curl -k --resolve staging.srilanka.lv:443:<vm-ip> https://staging.srilanka.lv/api/up
```

If both return the same response and you can't tell them apart, check the response headers and rendered HTML for the env-distinguishing markers (`SENTRY_ENVIRONMENT`, `NEXT_PUBLIC_SELF_URL`).

- [ ] **Step 4: No commit (deploy task)**

---

### Task 22: First Kamal deploy — production

- [ ] **Step 1: Run `kamal setup` for production**

```sh
bun infra:kamal setup -d production
```

- [ ] **Step 2: Validate via curl with `--resolve`**

```sh
curl -k --resolve srilanka.lv:443:<vm-ip> https://srilanka.lv/api/up
curl -k --resolve srilanka.lv:443:<vm-ip> https://srilanka.lv/
```

Expected: 200 on both.

- [ ] **Step 3: No commit (deploy task)**

---

### Task 23: Verify CI deploy still works end-to-end

The cert/key secrets are now in GH Environments (Task 17); the workflow expects them (Task 7); the cert is installed in kamal-proxy on the VM (Task 22). Trigger a CI deploy to confirm the full pipeline still works.

- [ ] **Step 1: Trigger a manual CI deploy to development**

GitHub → Actions → "Build and deploy" → "Run workflow" → destination: `development`, version: leave blank (defaults to HEAD SHA).

- [ ] **Step 2: Watch the run**

Expected: build succeeds, deploy step receives all env vars including `KAMAL_PROXY_TLS_CERT` and `KAMAL_PROXY_TLS_KEY` (they appear as `***` in logs). Deploy completes, kamal-proxy switches traffic.

- [ ] **Step 3: Re-validate development via curl**

```sh
curl -k --resolve development.srilanka.lv:443:<vm-ip> https://development.srilanka.lv/api/up
```

Still 200.

---

# Phase E — Cutover

### Task 24: Move nameservers at Gandi

This is the moment the world starts seeing Cloudflare's records. Production downtime during propagation is acceptable (per spec).

- [ ] **Step 1: Sign in to Gandi → Domains → `srilanka.lv` → Nameservers**

- [ ] **Step 2: Switch from Vercel's nameservers to Cloudflare's**

Replace the existing nameservers (Vercel's) with the two from Task 11 step 4. Save.

- [ ] **Step 3: Note the time**

Propagation usually completes in <1h, theoretical max 48h.

---

### Task 25: Verify NS propagation and validate end-to-end

- [ ] **Step 1: Poll multiple resolvers for the NS records**

```sh
dig +short NS srilanka.lv @8.8.8.8
dig +short NS srilanka.lv @1.1.1.1
dig +short NS srilanka.lv @9.9.9.9
```

Expected (eventually): all three return the two Cloudflare nameservers from Task 11. Until they all do, propagation isn't complete.

- [ ] **Step 2: Once NS resolves to Cloudflare, validate prod**

```sh
curl -v https://srilanka.lv/api/up
```

Expected:
- TLS handshake against **Cloudflare's universal cert** (issuer: e.g. `Google Trust Services` or `Let's Encrypt` — depends on which CA CF rotated to). NOT the Origin Cert; that's only seen by Cloudflare.
- HTTP 200, `/api/up` body.

```sh
curl -I https://srilanka.lv/
```

Expected: 200, full response headers including `cf-ray`, `cf-cache-status`, `server: cloudflare`.

- [ ] **Step 3: Validate Cloudflare Access on staging/dev**

Open `https://staging.srilanka.lv` in a browser. Expected:
- Redirect to a Cloudflare Access login page
- Enter `account-owner@example.com` (or whichever allow-listed email), receive OTP, enter it
- Access granted, staging app loads
- Repeat for `https://development.srilanka.lv`

Trying with a non-allow-listed email: access denied page.

- [ ] **Step 4: Verify Sentry events flow**

Trigger a known error path in development (e.g. a route that throws in staging/dev). Check Sentry within ~1 minute for the event with the right `SENTRY_ENVIRONMENT` and `SENTRY_RELEASE` tags.

- [ ] **Step 5: Verify email still delivers**

Send a test email to any `*@srilanka.lv` address (whatever the existing email setup is). Confirm it arrives. If not: re-check MX records in Cloudflare match what was at Vercel (Task 12 step 2).

---

# Phase F — Firewall lockdown

### Task 26: Lock down UFW to Cloudflare IPs

- [ ] **Step 1: SSH into the VM**

```sh
ssh deploy@<vm-ip>
```

- [ ] **Step 2: Run the firewall script**

```sh
sudo /usr/local/sbin/cloudflare-firewall.sh
```

Expected: prints `cloudflare-firewall: applied N IPv4 + M IPv6 ranges`. No errors.

- [ ] **Step 3: Inspect UFW state**

```sh
sudo ufw status numbered
```

Expected: numbered list showing
- 22 allow (from anywhere)
- 80 deny (commented `cloudflare-edge-deny-80`)
- 443 allow from each Cloudflare CIDR (commented `cloudflare-edge`)

No 443 allow rule from anywhere else.

- [ ] **Step 4: Enable the timer for weekly refresh**

```sh
sudo systemctl enable --now cloudflare-firewall.timer
sudo systemctl list-timers cloudflare-firewall.timer
```

Expected: timer is active and shows next run scheduled.

---

### Task 27: Verify the lockdown works

- [ ] **Step 1: From your laptop, confirm direct origin access is blocked**

```sh
curl --max-time 5 -k https://<vm-ip>/api/up
```

Expected: connection times out or is refused. (Without `--max-time` it would hang.)

```sh
curl --max-time 5 http://<vm-ip>/
```

Expected: connection times out or is refused.

- [ ] **Step 2: Confirm traffic through Cloudflare still works**

```sh
curl https://srilanka.lv/api/up
```

Expected: still 200.

```sh
curl -I http://srilanka.lv/
```

Expected: 301 redirect to `https://srilanka.lv/` (Cloudflare's "Always Use HTTPS" feature handles this at the edge — your origin never sees the HTTP request).

- [ ] **Step 3: Confirm SSH still works**

```sh
ssh deploy@<vm-ip> "echo ok"
```

Expected: `ok`. SSH is on port 22, not affected by the firewall script.

---

# Phase G — Cleanup

### Task 28: Decommission Vercel

- [ ] **Step 1: Confirm Vercel isn't serving any traffic**

Vercel dashboard → project → Analytics. Should show requests dropping to ~0 since the NS move.

- [ ] **Step 2: Disconnect the GitHub repo from Vercel**

Vercel project → Settings → Git → Disconnect.

- [ ] **Step 3: (Optional) Delete the project**

Vercel project → Settings → bottom of page → Delete Project.

If you'd rather keep the project on the hobby tier as a "break glass" reference, just disconnect git (Step 2) and skip Step 3. It costs nothing.

- [ ] **Step 4: Remove any Vercel-specific config from the repo**

Search the repo for stale references:

```sh
rg -i 'vercel' --type-not lock
```

Expected: hits in `infra/hetzner/README.md` (now updated by Task 9) and possibly old commit messages or comments. Remove any code-level references that aren't historical.

- [ ] **Step 5: Commit (if anything was removed in Step 4)**

```sh
git commit -am "chore: 🔥 remove stale Vercel references"
```

---

### Task 29: Final repo update — record the new state

- [ ] **Step 1: Update top-level `README.md` (if it exists) or create one**

Check the repo root:

```sh
ls -la README.md 2>/dev/null
```

If absent, skip this task. If present, add a brief deployment section pointing at the runbooks:

```markdown
## Deployment

- Hosting: Hetzner CX32 (one VM, three Kamal destinations)
- DNS / CDN / TLS: Cloudflare (zone setup in [`infra/cloudflare/README.md`](infra/cloudflare/README.md))
- VM provisioning: [`infra/hetzner/README.md`](infra/hetzner/README.md)
- Kamal config: [`infra/kamal/`](infra/kamal/)
```

- [ ] **Step 2: Commit (if README was updated)**

```sh
git commit -am "docs: 📝 link to deployment runbooks from root README"
```

---

### Task 30: Open the PR from `development` to `main`

Now that the box exists, the cert is in place, and CI deploys to development work, it's safe to merge `development` into `main`. Merging triggers release-please, which opens a release PR. Merging that release PR triggers a build of the versioned image, then deploys to staging, then (with manual approval) to production. Both deploys will succeed because the box is running and configured.

- [ ] **Step 1: Open the PR**

```sh
gh pr create --base main --head development --title "feat: 🌥️ migrate to Cloudflare-fronted Hetzner" --body "$(cat <<'EOF'
## Summary
- Replaces Vercel hosting with a Cloudflare-fronted Hetzner CX32
- kamal-proxy serves traffic with a 15-year Cloudflare Origin Certificate
- `staging.srilanka.lv` and `development.srilanka.lv` are gated by Cloudflare Access
- Hetzner firewall locked down: port 443 only from Cloudflare IPs, port 80 closed entirely
- Full setup documented in `infra/cloudflare/README.md` and updated `infra/hetzner/README.md`

## Test plan
- [x] dev/staging/prod all reachable through Cloudflare and serving the right environment
- [x] CF Access gates dev/staging
- [x] Direct origin access blocked (verified `curl --max-time 5` to bare VM IP times out)
- [x] Email delivery still works
- [x] Sentry events flow with correct `SENTRY_ENVIRONMENT` per env

Refs: docs/superpowers/specs/2026-05-02-cloudflare-in-front-of-hetzner-design.md
EOF
)"
```

- [ ] **Step 2: Merge the release-please PR when it appears**

After the PR to main merges, release-please opens a release PR. Review it, merge it. Watch the staging deploy succeed. Approve the production deploy gate. Watch it succeed.

- [ ] **Step 3: Validate the released version through real DNS**

```sh
curl -s https://srilanka.lv/api/up
```

Expected: 200, body. Confirm the deployed version in Sentry matches the release tag.

---

# Done

After Task 30:
- `srilanka.lv` is fully on Cloudflare + Hetzner.
- Origin is unreachable except via Cloudflare.
- TLS is end-to-end with a 15-year cert on origin.
- Dev/staging are gated by Cloudflare Access.
- Vercel is decommissioned.
- Everything is documented in `infra/cloudflare/README.md` and `infra/hetzner/README.md`.

Next 24h to watch for:
- Any Cloudflare-side errors in CF Analytics (Security tab → events).
- Any Sentry uptick.
- Any email delivery issues (DKIM/SPF/DMARC headers in delivered messages).

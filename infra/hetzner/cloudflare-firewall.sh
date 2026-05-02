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
  ufw status numbered | grep -E "# ${COMMENT}\$" | awk -F'[][]' '{print $2}' | sort -rn
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

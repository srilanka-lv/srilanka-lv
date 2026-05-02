# Hetzner setup

One Hetzner Cloud VM hosts three Kamal destinations:

| Destination | URL                          | Triggered by                                 |
| ----------- | ---------------------------- | -------------------------------------------- |
| development | development.srilanka.lv      | push to `development` (rolling, SHA-tagged)  |
| staging     | staging.srilanka.lv          | merging a release-please PR (versioned)      |
| production  | srilanka.lv                  | manual approval after staging (same version) |

All three run as separate containers on the same VM, fronted by `kamal-proxy`
(installed automatically on first `kamal setup`). Zero-downtime deploys are
handled by kamal-proxy's blue/green traffic switch.

## Branch and release flow

```
feature branch ── PR ──▶ development ── auto deploy ──▶ development.srilanka.lv
                              │
                              │ PR
                              ▼
                            main  ◀── release-please opens release PR
                              │
                              │ merge release PR
                              ▼
                       tag v0.2.0 created
                              │
                              ▼ build image once, tagged :v0.2.0
                              │
                              ▼ auto-deploy ──▶ staging.srilanka.lv
                              │
                              ▼ (manual approval gate)
                              │
                              ▼ same v0.2.0 image ──▶ srilanka.lv
```

The same `v0.2.0` image is deployed to both staging and production. Combined
with `SENTRY_ENVIRONMENT` per destination and `SENTRY_RELEASE` set to the
deployed version, Sentry can attribute errors to a specific release across
environments.

---

## 1. Provision the VM

1. **Create a Hetzner Cloud server** (Console → Servers → Add Server):
   - **Image**: Ubuntu 24.04 LTS
   - **Type**: CX32 (4 vCPU, 8 GB RAM, x86)
   - **Location**: pick the EU region closest to your audience
   - **SSH keys**: add your personal SSH key here too (cloud-init also adds it)
   - **Cloud config**: paste the contents of [`cloud-init.yaml`](./cloud-init.yaml)
     after replacing the two `REPLACE_WITH_*` placeholders

2. **Generate the GitHub Actions deploy keypair** locally:
   ```sh
   ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/srilanka_deploy -N ""
   ```
   - Paste the **public** key (`~/.ssh/srilanka_deploy.pub`) into the cloud-init
     before creating the VM.
   - Keep the **private** key (`~/.ssh/srilanka_deploy`) — it goes into the
     `HETZNER_SSH_KEY` GitHub secret in step 3.

3. After the VM boots, verify SSH works:
   ```sh
   ssh deploy@<vm-ip>
   ```

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

## 3. Configure GitHub

### Repo-level secrets (Settings → Secrets and variables → Actions → Repository secrets)

| Secret             | Value                                                       |
| ------------------ | ----------------------------------------------------------- |
| `HETZNER_HOST`     | The VM's public IPv4 (or hostname)                          |
| `HETZNER_SSH_KEY`  | Contents of `~/.ssh/srilanka_deploy` (the private key)      |

`KAMAL_REGISTRY_PASSWORD` is the built-in `GITHUB_TOKEN` — no secret needed.

### Per-environment secrets (Settings → Environments)

Create three environments: `development`, `staging`, `production`.

For **production**, enable **Required reviewers** under the environment's
protection rules and add yourself. Every prod deploy will then pause in the
GitHub Actions UI until you click "Approve and deploy". Staging deploys
auto-promote — only the staging→production hop is gated.

In **each** environment, add the same set of secret names with the values
appropriate to that environment:

| Secret                                  | Why                                       |
| --------------------------------------- | ----------------------------------------- |
| `SANITY_API_KEY`                        | Sanity read token                         |
| `RESEND_API_KEY`                        | Resend API key                            |
| `RESEND_AUDIENCE_ID`                    | Resend audience                           |
| `SERPAPI_API_KEY`                       | SerpAPI key (used by the flights cron)    |
| `NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID`  | Sanity project ID                         |
| `KAMAL_PROXY_TLS_CERT`                  | Cloudflare Origin Cert PEM (full chain)   |
| `KAMAL_PROXY_TLS_KEY`                   | Cloudflare Origin Cert private key PEM    |

The non-secret per-env values (`NEXT_PUBLIC_SELF_URL`,
`NEXT_PUBLIC_SANITY_STUDIO_DATASET`) live in the
`infra/kamal/deploy.<destination>.yml` files in this repo, not in GitHub secrets.

## 4. First deploy

Once the VM is up, DNS resolves, and secrets are configured:

```sh
# From your laptop, with the env vars from your local 1Password / direnv loaded:
HETZNER_HOST=<vm-ip> \
KAMAL_REGISTRY_PASSWORD=<a github PAT with read:packages> \
SANITY_API_KEY=... \
RESEND_API_KEY=... \
RESEND_AUDIENCE_ID=... \
SERPAPI_API_KEY=... \
NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID=... \
bun infra:kamal setup -d development
```

`kamal setup` installs kamal-proxy on the VM, logs in to GHCR, and does the
first deploy. Run it once per destination. Subsequent deploys go through CI
via `kamal deploy`.

> The `bun infra:kamal` script (in `package.json`) is a thin wrapper that passes
> `-c infra/kamal/deploy.yml` so you don't have to type the config path every
> time. Plain `kamal …` commands work too if you pass `-c` yourself.

## 5. Ongoing operations

```sh
bun infra:kamal app logs -d production       # tail logs
bun infra:kamal app details -d production    # current container/image
bun infra:kamal rollback <version> -d production
bun infra:kamal app exec -i -d production "bash"
```

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

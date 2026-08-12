# Agent readiness design

Date: 2026-08-12
Branch: `@feat/agent-improvement`
Trigger: isitagentready.com scan of https://srilanka.lv

## Context

The site already ships two agent-facing pieces:

- `/llms.txt` (Sanity-driven markdown content map, `apps/web/src/app/llms.txt/route.ts`)
- A global `Link: </llms.txt>; rel="llms-txt"` response header (`next.config.ts`)

The scan flags eleven gaps. This spec implements the subset that is honest and useful
for a Latvian-language content site with no protected APIs, and records why the rest
is skipped.

## In scope

### 1. Content Signals in robots.txt

Replace the typed `app/robots.ts` metadata route with `app/robots.txt/route.ts`
(the typed `MetadataRoute.Robots` API cannot emit custom directives). Output keeps
the existing rules (`Allow: /`, `Disallow: /api/`, `Host`, `Sitemap`) and adds under
the `User-agent: *` group:

```
Content-Signal: search=yes, ai-input=yes, ai-train=no
```

Policy rationale: search and AI-assisted answers are how the target audience finds
niche content, so both stay open. Training on the partner's original Latvian writing
is opted out conservatively. **Flag for Dave: flip `ai-train` if you decide otherwise;
it is one line.**

### 2. Agent-useful Link headers

Extend the existing global `Link` header in `next.config.ts` with registered
relation types (RFC 8288 / IANA):

- `</llms.txt>; rel="describedby"; type="text/markdown"` (kept alongside the
  unregistered but conventional `llms-txt` rel)
- `</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`

### 3. API catalog (RFC 9727) + OpenAPI description

The app router ignores dot-prefixed folders, so `/.well-known/*` is served by
routes under `app/well-known/*` plus a `next.config.ts` rewrite
`/.well-known/:path*` → `/well-known/:path*`.

- `app/well-known/api-catalog/route.ts` returns `application/linkset+json` with a
  single linkset entry anchored at the site URL:
  - `service-desc` → `/openapi.json`
  - `service-doc` → `/llms.txt`
  - `status` → `/api/up`
- `app/openapi.json/route.ts` returns a real OpenAPI 3.1 document describing the
  public machine endpoints that genuinely exist: `/llms.txt`, `/sitemap.xml`,
  `/robots.txt`, `/api/up`, `/.well-known/api-catalog`,
  `/.well-known/agent-skills/index.json`. No fabricated operations.

### 4. Agent skills discovery index

- `src/shared/constants/agent-skill.ts` exports the skill name, description, and a
  `buildAgentSkillMarkdown(siteUrl)` builder so the index digest and the served
  file are always byte-identical.
- `app/well-known/agent-skills/index.json/route.ts` returns the v0.2.0 discovery
  schema with one `skill-md` entry and a `sha256:{hex}` digest computed from the
  built markdown (`node:crypto`).
- `app/well-known/agent-skills/srilanka-lv-guide/SKILL.md/route.ts` serves the
  skill: what the site is, how to use `/llms.txt`, markdown negotiation, the core
  guide URLs (LV slugs), products, and contact. English, agent-facing.

### 5. Markdown for agents (content negotiation)

Cloudflare's edge feature requires a Pro plan; the zone is Free. Implemented
app-side instead:

- `src/proxy.ts` (Next 16 proxy convention): when a request's `Accept` header
  includes `text/markdown` and the path is a known page path, rewrite to
  `/markdown/{path}`. Matcher excludes `/_next`, `/api`, static assets; a `has`
  header condition keeps the proxy off the hot path for normal traffic. HTML
  stays the default for browsers.
- `app/markdown/[[...path]]/route.ts` builds markdown per path, `revalidate 3600`:
  - `/` and `/sakums`: site overview (title, summary, section links — shares the
    section structure with `/llms.txt` via an extracted
    `src/shared/constants/site-sections.ts`)
  - Eight info pages: title, description, portable-text body as markdown
  - `/blogi`: post list with excerpts; `/blogi/{slug}`: post body as markdown
  - `/produkti` + three product pages: titles/descriptions from
    `products-page/index.data.ts`
  - `/par-mani`, `/kontakti`, flight-tickets page: title, description, canonical
    link (component-built pages with no portable-text body)
  - Responses: `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`,
    `x-markdown-tokens` (chars/4 estimate). Unknown paths return 404 markdown.
- `src/features/sanity/utils/portable-text-to-markdown.ts`: pure serializer for
  the block types the site actually uses (normal, h2–h6, blockquote, bullet and
  numbered lists with nesting, strong/em/code marks, link markDefs). Unknown
  blocks are skipped. Unit-tested (vitest, colocated `.test.ts` like existing
  utils).

Caching note: the two representations live at distinct internal URLs, and the
Cloudflare cache rules bypass HTML, so there is no cache-poisoning path;
`Vary: Accept` is still set on markdown responses for downstream caches.

## Out of scope (and why)

- **OAuth/OIDC discovery, OAuth protected resource metadata, auth.md** — the site
  has no protected APIs and no agent registration flow. Publishing auth metadata
  would be fabricated and would actively mislead agents.
- **MCP server card** — there is no MCP server. Building one is a product
  decision, not a metadata gap.
- **DNS-AID records** — these advertise agent endpoints (A2A/MCP) that do not
  exist; also a Cloudflare DNS + DNSSEC change outside this repo. If DNSSEC is
  wanted anyway, it is a one-click enable in the Cloudflare dashboard (DNS →
  Settings) plus a DS record at Gandi.
- **WebMCP** — `navigator.modelContext` is a Chrome Early Preview API with no
  stable spec; shipping speculative client JS to every visitor is not worth it
  yet. Revisit when the API reaches origin trial or stable.
- **Cloudflare Markdown for Agents toggle** — Pro plan and above only; covered
  app-side by item 5. If the zone is ever upgraded, the edge feature can replace
  the app-side implementation.

## Verification

- `curl` against the dev server: robots.txt shows Content-Signal; `/` returns the
  extended Link header; `/.well-known/api-catalog` is `application/linkset+json`
  with the linkset array; `/.well-known/agent-skills/index.json` digest matches
  `shasum -a 256` of the served SKILL.md; `Accept: text/markdown` on `/` and an
  info page returns `text/markdown` with `x-markdown-tokens`, while a plain
  request still returns HTML.
- `biome` lint, vitest unit tests, `next build`.

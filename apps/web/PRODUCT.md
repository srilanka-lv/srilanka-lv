# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: young Latvian women (roughly 20-35) planning a solo or first trip to Sri Lanka. They are addressed peer-to-peer, in Latvian, with feminine forms and solo framing ("Tu"). Secondary: families and couples, who buy the personalized holiday plan and the 1:1 consultation but are not the voice the site optimizes for.

## Product Purpose

srilanka.lv is a Latvian-language guide to traveling Sri Lanka, written by someone who lives there. Free content (blog posts, practical guides on visas, budget, transport, accommodation, timing) builds trust; three paid products monetize that trust:

1. **Girls-only 10-day trip**: small group (max 6 women), fully organized, led by the host in person.
2. **1:1 consultation call**: personalized answers about Sri Lanka travel.
3. **Personalized holiday plan**: a custom itinerary delivered within 48 hours.

Success means readers arrive via content, come to trust the host, and book a product.

## Positioning

Personal insider guidance from someone who has actually lived in Sri Lanka for ~4 years, in the reader's own language. Competes with package tour operators through niche trust (solo female Latvian travelers) rather than head-term SEO or price. A tour operator cannot truthfully copy "I live here, I'm one of you, and I'll take you myself."

## Operating Context

- Readers plan trips in Latvian; the public site is entirely Latvian while internal route names are English (Next.js rewrites map LV slugs to EN routes).
- The site is content-led: homepage hero, FAQ, blog sections; practical guide pages per topic; products page; about and contact pages.
- Products are personal services fulfilled by the host, not automated goods; capacity is genuinely limited (trip capped at 6 women).

## Capabilities and Constraints

- Monorepo: Next.js 16 App Router (`apps/web`), Sanity Studio (`apps/studio`), shared Sanity package (`packages/sanity`). Styling via vanilla-extract; content via Sanity.
- `usePathname()` returns the EN route on SSR and the LV slug on the client; any pathname logic must reconcile `PAGES.EN.*` and `PAGES.LV.*`.
- Meta titles use the root layout suffix ` | Šrilanka 26/27`; page titles stay ≤ ~48 chars and never repeat "Šrilanka" or the year.
- Known copy issue to fix (owner: the host): the consultation product description uses the masculine "Esmu gatavs"; the site voice is feminine ("gatava").

## Brand Commitments

- The face and voice of srilanka.lv is Dave's partner (she); every product and page speaks as her, one real person, never a corporate "we".
- All Latvian copy is authored and owned by her. Claude does not write or alter Latvian copy on its own; only when Dave explicitly asks for a translation is it treated as final.
- No em dashes anywhere in copy; substitute with period, comma, colon, or parentheses.
- Tone: peer-to-peer, warm, direct address ("Tu"), feminine forms, solo-travel framing.

## Evidence on Hand

- Real photography from Sri Lanka taken by Dave and his partner (e.g. `public/images/`), usable across the site.
- An active Instagram following that can be referenced as social proof.
- No customer testimonials yet. Design must not fabricate testimonials, review counts, ratings, press mentions, or urgency claims.

## Product Principles

1. **Her voice, not a brand voice.** Every surface reads like a message from one real person the reader could DM.
2. **Trust before transaction.** Content earns belief first; products convert existing trust and never cold-sell.
3. **Niche depth over broad reach.** Serve the solo female Latvian traveler deeply rather than all travelers shallowly.
4. **Real evidence only.** Own photos and the real Instagram presence; nothing invented, no fake scarcity.
5. **Latvian-first.** The reader plans in her own language; copy ownership stays with the host.

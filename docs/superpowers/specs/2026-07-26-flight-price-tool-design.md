# Flight price tool: `/letakie-lidojumi-uz-srilanku-no-rigas`

Date: 2026-07-26
Status: approved by Dave (brainstorm session, concept A)

## Context

The page is a main-nav item ("Lidojumu cenas", `TicketsPlane` icon) currently rendered as an
unstyled stub (`apps/web/src/app/flight-tickets/page.tsx`). Data lives in
`apps/web/src/features/serpapi/data/flight-data.json`: a snapshot (`queriedOn: 2026-05-23`) of the
cheapest RIX→CMB itinerary for ~4-5 sampled departure dates per month (weekly Mondays), May 2026
through Feb 2027. Each date carries the full cheapest itinerary: legs (airline, logo URL, flight
number, airports with Latvian names, times), layovers with durations, total duration, stops, CO2,
price, booking token. Prices are **one-way**, economy, 1 adult, EUR (SerpApi `type: '2'`,
`hl: lv`, `deep_search: true`). Observed range: €382 (Sep/Oct/Nov) to €696 (May).

## Decisions (from discovery)

1. **Primary job: price-lookup tool** (Operate mode), not an editorial guide. Scan → drill → act.
2. **Freshness: weekly CI/CD re-runs** of `fetch-flights.ts` (SerpApi) refresh the data
   automatically. The page hides past dates at render, shows a "pārbaudīts {queriedOn}" stamp,
   and treats prices as real dated observations.
3. **Detail depth: rows + expandable full itinerary** (legs and layovers).
4. **Trip framing: one-way, labeled loudly.** A "vienvirziena cena" chip is always visible near
   prices. No round-trip estimates, no return-leg data in v1.
5. **Row action: per-date Google Flights deep link**, new tab. The SerpApi `bookingToken` cannot
   produce a public booking URL; the deep link is `https://www.google.com/travel/flights?q=`
   prefilled with RIX→CMB, the departure date, one-way, `hl=lv`, EUR. Exact URL format verified at
   implementation time. **Future direction (not v1):** the ultimate goal is a direct booking link
   for Latvians (e.g. via SerpApi's booking-options API using `bookingToken`); the URL builder
   util (`build-google-flights-url.ts`) is the single seam to swap when that lands.
6. **Funnel: one quiet product card** at the end, in her voice, pointing to the personalized
   holiday plan. No newsletter tie-in on this page.
7. **Concept A: price strip + drill-down.** A year-at-a-glance bar strip doubles as month
   navigation; selecting a month reveals its date rows.

## Page anatomy (top to bottom)

1. **Breadcrumbs + H1**: existing `Breadcrumbs` + `findNavLabel` pattern.
2. **Status line** (`flight-status-line`): route chip `RIX → CMB`, "vienvirziena cena" chip, stamp
   "pārbaudīts 23.05.2026" (`queriedOn`, lv-LV formatting).
3. **Intro**: 1-2 sentences, copy slot.
4. **Price strip** (`flight-price-explorer` + `flight-price-strip-tile`): see below.
5. **Month panels** (`flight-month-panel` → `flight-date-row` → `flight-itinerary`): see below.
6. **Method note**: small print explaining sampling (Mondays, Google Flights data, economy,
   1 adult, prices change). Copy slot.
7. **Funnel card**: title, body, CTA to the personalized holiday plan. Copy slots.
8. **SectionBlogs**: "Mani piedzīvojumi Šrilankā", same tail as other static pages.

## Price strip

- One tile per month that still has upcoming dates (~7 at time of writing). Horizontal scroll on
  mobile. Implemented as Ark UI `Tabs` (already a dependency, used in `input-field` and
  `trip-page-hero-section-cta`): keyboard navigation and ARIA come free.
- Tile contents, top to bottom: month abbreviation (lv-LV via `Intl.DateTimeFormat`, derived from
  the `month` field, never from stored English labels), a thin vertical bar, price label
  "no €{lowest}".
- **Bar encoding: bar height = month average of surviving sampled prices** (zero-based scale
  across all months). **Label = month lowest.** Tooltip on hover/focus: "vidēji €{avg} ·
  {n} datumi". Rationale: August reads honestly as "usually pricey (tall bar), one €382 deal
  (label)". Approved by Dave over the bar=lowest alternative.
- Dataviz rules honored: zero-based bars, single series so no legend, thin marks with 4px rounded
  top anchored to a shared baseline, price text in text tokens (never data-colored), cheapness
  carried by geometry and numbers, not color alone.
- **Color**: bars in quiet warm neutrals: light theme `color-mix(in oklch, deep-maroon ~15%,
  transparent)`; dark theme the raised ladder step. Selected tile: coral bar + coral hairline
  border (coral = actionable/current, One Coral Rule intact; no second accent anywhere).
- **Default selection**: the cheapest upcoming month, so the €382 story is visible at load. On a
  tie (Sep/Oct/Nov all bottom out at €382), the earliest tied month wins.
- All month panels are server-rendered into the DOM; inactive panels are `hidden` (SEO keeps all
  dates/prices).

## Month panel and date rows

- Panel header: full lv-LV month name + "zemākā cena €{lowest}" (recomputed, see Data flow).
- Each sampled date is a styled native `<details>` element (server-rendered, zero client JS, free
  a11y, multiple rows can stay open for comparison).
- **Collapsed summary row**: weekday + date (lv-LV), price (semibold anchor), airline logos
  (~20px, gstatic via `next/image`) + names, "{stops} pārsēšanās · {h} st. {m} min", chevron.
- **Expanded itinerary**: vertical timeline per leg: departure time + airport (Latvian name from
  data) → arrival time + airport, airline + flight number; between legs a layover chip
  "{duration} pārsēšanās · {airport}". An "nakts lidojums" marker where `overnight: true`.
- **Cut from v1**: aircraft, legroom, `extensions` (English strings from Google; never shown on
  the Latvian page), CO2 figures.
- **Row action**: primary Button (existing component, `size` prop) "Pārbaudīt cenu Google
  Flights ↗" opening the per-date deep link in a new tab with `rel="noopener"`. Beside it, small
  print: price checked on {queriedOn}, may have changed (copy slot).

## Data flow, staleness, edge cases

- Pure derivation utils in `apps/web/src/features/serpapi/utils/`, all unit-tested:
  - `filter-upcoming-months.ts`: takes the raw JSON + `today` (Temporal polyfill, already a
    dependency); drops past dates, drops emptied months, **recomputes `lowestPrice` and
    `averagePrice` from surviving dates** (stored aggregates include past dates and would lie).
  - `build-google-flights-url.ts`
  - `format-duration.ts` (minutes → "22 st. 20 min")
  - `format-month-label.ts` (abbreviated + full lv-LV month names from `YYYY-MM`)
  - `format-price.ts` (whole euros via `Intl.NumberFormat('lv-LV', ...)`, which renders the € sign
    after the number, e.g. "382 €"; the "€382" in this spec's examples is shorthand, the rendered
    form follows the locale)
- Page exports `revalidate = 86400` so the past-date filter is never staler than a day between
  deploys.
- **Empty state**: if zero months survive, strip and panels are replaced by a staleness notice
  (copy slot) + one route-level Google Flights link. The page is never blank.
- The 148K JSON never reaches the client: the client Tabs wrapper receives slim month summaries
  (label, lowest, average, date count); panels stay server components passed as children.

## Components and files

New components under `apps/web/src/features/serpapi/components/`, one folder per component
(`index.tsx` + `styles.css.ts`), vanilla-extract naming (`...Style` / `...Styles`), no barrel
exports, block statements everywhere.

| Component | Kind | Responsibility |
|---|---|---|
| `flight-price-explorer` | client | Ark Tabs wrapper: strip + panel switching, selection state |
| `flight-price-strip-tile` | client child | month tile: label, bar, price, tooltip |
| `flight-month-panel` | server | month heading + date-row list |
| `flight-date-row` | server | `<details>` row: summary + itinerary + CTA |
| `flight-itinerary` | server | leg timeline + layover chips |
| `flight-status-line` | server | route/one-way chips + checked-on stamp |

- `next.config`: add `remotePatterns` for `www.gstatic.com` (airline logos; `preload`, not the
  deprecated `priority`).
- Copy placeholders centralized in `flight-page-copy.ts` (single review surface for the partner).
- Metadata: unchanged `buildPageMetadata(PAGES.LV.FLIGHT_TICKETS)`. No new JSON-LD in v1.

## Motion and theming

- Bars grow from the baseline once on first view (staggered ~30ms, ~350ms, ease-out). Row
  expansion animates open. Tile hover: raised surface step (dark) / whisper shadow (light). All
  motion behind `prefers-reduced-motion`.
- Dark theme flows only through the 10-slot contract; bars use the elevation ladder; coral
  identical in both themes; dark-only tweaks via `darkThemeSelector`.

## Copy slots (owned by the partner, placeholders at build time)

Intro, method note, one-way chip label, row CTA label, price disclaimer, staleness notice, funnel
card (title, body, CTA). No em dashes. Month names, weekdays, dates, durations come from `Intl`
(lv-LV), not from her.

## Verification

- Unit tests for all derivation utils (past-date filtering, aggregate recomputation, URL builder,
  formatting).
- Screenshot verification with the existing Playwright/pngjs setup: new baselines for this page in
  light and dark themes; axe pass on the rendered page.
- Manual check of the Google Flights deep link format against the live site during implementation.

## Out of scope (explicit)

Round-trip or return-leg data, automated refresh pipeline (cron/CI), CO2 display, sort-by-price,
affiliate links, newsletter tie-in, changes to the fetch/map scripts beyond what the utils need.

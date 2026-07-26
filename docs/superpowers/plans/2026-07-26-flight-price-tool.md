# Flight Price Tool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the stub at `apps/web/src/app/flight-tickets/page.tsx` into the flight price tool designed in `docs/superpowers/specs/2026-07-26-flight-price-tool-design.md`: a year-at-a-glance price strip (Ark Tabs) that drills into per-date rows with expandable itineraries and per-date Google Flights links.

**Architecture:** Pure derivation utils (filter past dates, recompute aggregates, format lv-LV strings) feed a server-rendered page. One client component pair (Ark Tabs explorer + strip tile) handles month selection; all month panels are server components passed as children and stay in the DOM (SEO). Date rows are native `<details>` elements (zero client JS).

**Tech Stack:** Next.js 16 App Router (RSC), vanilla-extract (+ `@vanilla-extract/dynamic`), Ark UI Tabs (`@ark-ui/react` v5, already a dep), `@js-temporal/polyfill`, `bun:test` for unit tests, Biome for lint.

## Global Constraints

- Work on branch `@feat/flight-price-tool` (already created; spec is committed there).
- Data source: `apps/web/src/features/serpapi/data/flight-data.json` (mapped shape from `scripts/map-flights.ts`, camelCase). Prices are one-way, economy, EUR. A weekly CI/CD job re-runs the SerpApi fetch, so the JSON refreshes without code changes; never hardcode values from the current snapshot.
- `build-google-flights-url.ts` is the deliberate seam for a future direct booking link (SerpApi booking options via `bookingToken`); keep all outbound-link construction inside that util.
- Biome rules: block statements ALWAYS (`if (x) { ... }`, never single-line bodies); run `bun repo:lint` from repo root before every commit.
- vanilla-extract naming: `style(...)` exports end in `Style`, `styleVariants(...)`/`recipe(...)` end in `Styles`.
- No barrel exports; import from specific file paths.
- Imports: `@/*` = `apps/web/src/*`, `@packages/sanity/*` = `packages/sanity/src/*`.
- All UI colors come from `vars` (`@/shared/styles/themes/theme.contract.css`). No hardcoded colors, no per-component dark overrides; dark-only tweaks use `darkThemeSelector` from `@/shared/styles/themes/theme.dark.css`.
- Coral (`vars.color.accent`) is ONLY for: selected strip tile + existing Button primary. No new saturated colors.
- Shadows: existing `vars.shadow.*` only (5% alpha, "whisper" rule).
- All Latvian strings live in `flight-page-copy.ts` and are PLACEHOLDERS for the site owner's review. No em dashes anywhere ("—" is banned; use period, comma, colon, or parens).
- `next/image`: use `preload` semantics, never the deprecated `priority` prop (not needed here anyway; logos are small).
- Next.js 16 has breaking changes vs training data: consult `apps/web/node_modules/next/dist/docs/` when an API surprises you.
- Unit tests: `bun:test`, colocated `*.test.ts`, run with `cd apps/web && bun test src/features/serpapi`.
- Commits: conventional + gitmoji, e.g. `feat: ✨ flight price strip`. Commit only the files each task touches.
- **Before Task 5 (first UI task): load `.claude/skills/impeccable/reference/craft-floor.md`** and keep it loaded for Tasks 5-10.
- Intl caveat: lv-LV golden strings in tests (month names, `382 €`) assume Bun's ICU. If an assertion fails purely on ICU output, print the actual value, verify it is sensible lv-LV, and update the golden string. Never switch locale away from `lv-LV`.

---

### Task 1: Flight data models

**Files:**
- Create: `apps/web/src/features/serpapi/models/flight-data-model.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: types `FlightDataModel`, `FlightMonthModel`, `FlightDateModel`, `FlightCheapestModel`, `FlightLegModel`, `FlightLayoverStopModel`, `FlightAirportModel`, `FlightMonthSummaryModel` — used by every later task.

- [ ] **Step 1: Write the model file**

```ts
export type FlightAirportModel = {
  name: string;
  id: string;
  time: string; // "2026-07-06 16:00"
};

export type FlightLegModel = {
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  departureAirport: FlightAirportModel;
  arrivalAirport: FlightAirportModel;
  duration: number; // minutes
  airplane?: string;
  travelClass?: string;
  legroom?: string;
  extensions?: string[];
  overnight?: boolean;
};

export type FlightLayoverStopModel = {
  name: string;
  id: string;
  duration: number; // minutes
};

export type FlightCarbonEmissionsModel = {
  this_flight?: number;
  typical_for_this_route?: number;
  difference_percent?: number;
};

export type FlightCheapestModel = {
  price: number; // EUR, one-way
  totalDuration: number; // minutes
  stops: number;
  flights: FlightLegModel[];
  layovers: FlightLayoverStopModel[];
  carbonEmissions?: FlightCarbonEmissionsModel;
  bookingToken?: string;
};

export type FlightDateModel = {
  date: string; // YYYY-MM-DD
  cheapestFlight: FlightCheapestModel;
};

export type FlightMonthModel = {
  month: string; // YYYY-MM
  label: string; // English label written by map-flights.ts; never rendered
  averagePrice: number;
  lowestPrice: number;
  dates: FlightDateModel[];
};

export type FlightDataModel = {
  queriedOn: string; // YYYY-MM-DD
  months: FlightMonthModel[];
};

// Slim shape sent to the client Tabs component (the 148K JSON must stay server-side)
export type FlightMonthSummaryModel = {
  month: string;
  lowestPrice: number;
  averagePrice: number;
  dateCount: number;
};
```

- [ ] **Step 2: Typecheck**

Run: `cd apps/web && bunx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/features/serpapi/models/flight-data-model.ts
git commit -m "feat: ✨ flight data models for mapped flight json"
```

---

### Task 2: filterUpcomingMonths + findCheapestUpcomingMonth (TDD)

**Files:**
- Create: `apps/web/src/features/serpapi/utils/filter-upcoming-months.ts`
- Test: `apps/web/src/features/serpapi/utils/filter-upcoming-months.test.ts`

**Interfaces:**
- Consumes: `FlightDataModel`, `FlightMonthModel` from Task 1; `Temporal` from `@js-temporal/polyfill`.
- Produces: `filterUpcomingMonths(data: FlightDataModel, today: Temporal.PlainDate): FlightMonthModel[]` and `findCheapestUpcomingMonth(months: FlightMonthModel[]): string | undefined`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'bun:test';
import { Temporal } from '@js-temporal/polyfill';

import type { FlightDataModel, FlightDateModel } from '../models/flight-data-model';
import { filterUpcomingMonths, findCheapestUpcomingMonth } from './filter-upcoming-months';

const buildDate = (date: string, price: number): FlightDateModel => ({
  date,
  cheapestFlight: {
    price,
    totalDuration: 1340,
    stops: 2,
    flights: [],
    layovers: [],
  },
});

const buildData = (): FlightDataModel => ({
  queriedOn: '2026-05-23',
  months: [
    {
      month: '2026-07',
      label: 'July 2026',
      averagePrice: 640,
      lowestPrice: 594,
      dates: [buildDate('2026-07-06', 602), buildDate('2026-07-13', 594)],
    },
    {
      month: '2026-08',
      label: 'August 2026',
      averagePrice: 543,
      lowestPrice: 382,
      dates: [buildDate('2026-08-03', 543), buildDate('2026-08-24', 382), buildDate('2026-08-31', 601)],
    },
    {
      month: '2026-09',
      label: 'September 2026',
      averagePrice: 382,
      lowestPrice: 382,
      dates: [buildDate('2026-09-07', 382)],
    },
  ],
});

describe('filterUpcomingMonths', () => {
  it('drops past dates and keeps today', () => {
    const months = filterUpcomingMonths(buildData(), Temporal.PlainDate.from('2026-08-24'));

    expect(months.map((month) => month.month)).toEqual(['2026-08', '2026-09']);
    expect(months[0]?.dates.map((entry) => entry.date)).toEqual(['2026-08-24', '2026-08-31']);
  });

  it('drops months whose dates are all past', () => {
    const months = filterUpcomingMonths(buildData(), Temporal.PlainDate.from('2026-07-26'));

    expect(months.map((month) => month.month)).toEqual(['2026-08', '2026-09']);
  });

  it('recomputes lowest and average price from surviving dates', () => {
    const months = filterUpcomingMonths(buildData(), Temporal.PlainDate.from('2026-08-24'));

    expect(months[0]?.lowestPrice).toBe(382);
    expect(months[0]?.averagePrice).toBe(Math.round((382 + 601) / 2));
  });

  it('returns an empty array when everything is past', () => {
    expect(filterUpcomingMonths(buildData(), Temporal.PlainDate.from('2027-01-01'))).toEqual([]);
  });
});

describe('findCheapestUpcomingMonth', () => {
  it('returns the month with the lowest price, earliest on a tie', () => {
    const months = filterUpcomingMonths(buildData(), Temporal.PlainDate.from('2026-07-26'));

    // 2026-08 and 2026-09 both bottom out at 382; earliest wins
    expect(findCheapestUpcomingMonth(months)).toBe('2026-08');
  });

  it('returns undefined for an empty list', () => {
    expect(findCheapestUpcomingMonth([])).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/web && bun test src/features/serpapi/utils/filter-upcoming-months.test.ts`
Expected: FAIL (module `./filter-upcoming-months` not found).

- [ ] **Step 3: Write the implementation**

```ts
import { Temporal } from '@js-temporal/polyfill';

import type { FlightDataModel, FlightMonthModel } from '../models/flight-data-model';

export const filterUpcomingMonths = (
  data: FlightDataModel,
  today: Temporal.PlainDate,
): FlightMonthModel[] => {
  const months: FlightMonthModel[] = [];

  for (const month of data.months) {
    const dates = month.dates.filter((entry) => {
      return Temporal.PlainDate.compare(Temporal.PlainDate.from(entry.date), today) >= 0;
    });

    if (dates.length === 0) {
      continue;
    }

    const prices = dates.map((entry) => entry.cheapestFlight.price);

    months.push({
      ...month,
      dates,
      lowestPrice: Math.min(...prices),
      averagePrice: Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length),
    });
  }

  return months;
};

export const findCheapestUpcomingMonth = (months: FlightMonthModel[]): string | undefined => {
  let cheapest: FlightMonthModel | undefined;

  for (const month of months) {
    if (!cheapest || month.lowestPrice < cheapest.lowestPrice) {
      cheapest = month;
    }
  }

  return cheapest?.month;
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/web && bun test src/features/serpapi/utils/filter-upcoming-months.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: Lint and commit**

```bash
bun repo:lint
git add apps/web/src/features/serpapi/utils/filter-upcoming-months.ts apps/web/src/features/serpapi/utils/filter-upcoming-months.test.ts
git commit -m "feat: ✨ filter upcoming flight months with recomputed aggregates"
```

---

### Task 3: buildGoogleFlightsUrl (TDD)

**Files:**
- Create: `apps/web/src/features/serpapi/utils/build-google-flights-url.ts`
- Test: `apps/web/src/features/serpapi/utils/build-google-flights-url.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `buildGoogleFlightsUrl(departureDate: string): string` (per-date deep link) and `buildGoogleFlightsRouteUrl(): string` (route-level link for the empty state).

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'bun:test';

import { buildGoogleFlightsRouteUrl, buildGoogleFlightsUrl } from './build-google-flights-url';

describe('buildGoogleFlightsUrl', () => {
  it('builds a one-way RIX to CMB deep link for a date', () => {
    expect(buildGoogleFlightsUrl('2026-10-05')).toBe(
      'https://www.google.com/travel/flights?q=Flights+from+RIX+to+CMB+on+2026-10-05+one+way&hl=lv&curr=EUR',
    );
  });
});

describe('buildGoogleFlightsRouteUrl', () => {
  it('builds a route-level link without a date', () => {
    expect(buildGoogleFlightsRouteUrl()).toBe(
      'https://www.google.com/travel/flights?q=Flights+from+RIX+to+CMB&hl=lv&curr=EUR',
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/web && bun test src/features/serpapi/utils/build-google-flights-url.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Write the implementation**

```ts
const GOOGLE_FLIGHTS_BASE_URL = 'https://www.google.com/travel/flights';

const buildUrl = (query: string): string => {
  const params = new URLSearchParams({ q: query, hl: 'lv', curr: 'EUR' });

  return `${GOOGLE_FLIGHTS_BASE_URL}?${params.toString()}`;
};

export const buildGoogleFlightsUrl = (departureDate: string): string => {
  return buildUrl(`Flights from RIX to CMB on ${departureDate} one way`);
};

export const buildGoogleFlightsRouteUrl = (): string => {
  return buildUrl('Flights from RIX to CMB');
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/web && bun test src/features/serpapi/utils/build-google-flights-url.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Lint and commit**

```bash
bun repo:lint
git add apps/web/src/features/serpapi/utils/build-google-flights-url.ts apps/web/src/features/serpapi/utils/build-google-flights-url.test.ts
git commit -m "feat: ✨ google flights deep link builder"
```

---

### Task 4: Formatting utils (TDD)

**Files:**
- Create: `apps/web/src/features/serpapi/utils/format-duration.ts`
- Create: `apps/web/src/features/serpapi/utils/format-month-label.ts`
- Create: `apps/web/src/features/serpapi/utils/format-date-label.ts`
- Create: `apps/web/src/features/serpapi/utils/format-short-date.ts`
- Create: `apps/web/src/features/serpapi/utils/format-price.ts`
- Test: `apps/web/src/features/serpapi/utils/format.test.ts` (one file for all five; they are tiny and change together)

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `formatDuration(totalMinutes: number): string` → `"22 st. 20 min"`
  - `formatMonthLabel(monthKey: string, variant: 'short' | 'long'): string` → `"okt."` / `"2026. gada oktobris"`
  - `formatDateLabel(isoDate: string): string` → `"pirmdiena, 5. oktobris"`
  - `formatShortDate(isoDate: string): string` → `"23.05.2026."` (lv-LV adds the trailing dot)
  - `formatPrice(price: number): string` → `"382 €"` (nbsp before €)

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'bun:test';

import { formatDateLabel } from './format-date-label';
import { formatDuration } from './format-duration';
import { formatMonthLabel } from './format-month-label';
import { formatPrice } from './format-price';
import { formatShortDate } from './format-short-date';

describe('formatDuration', () => {
  it('formats hours and minutes', () => {
    expect(formatDuration(1340)).toBe('22 st. 20 min');
  });

  it('omits minutes when zero', () => {
    expect(formatDuration(120)).toBe('2 st.');
  });

  it('omits hours when under one hour', () => {
    expect(formatDuration(45)).toBe('45 min');
  });
});

// Golden lv-LV strings below depend on Bun's ICU. If one fails, log the actual
// output, confirm it is valid lv-LV, and update the golden value (keep lv-LV).
describe('formatMonthLabel', () => {
  it('formats a short month label', () => {
    expect(formatMonthLabel('2026-10', 'short')).toBe('okt.');
  });

  it('formats a long month label with year', () => {
    expect(formatMonthLabel('2027-01', 'long')).toBe('2027. gada janvāris');
  });
});

describe('formatDateLabel', () => {
  it('formats weekday, day and month', () => {
    expect(formatDateLabel('2026-10-05')).toBe('pirmdiena, 5. oktobris');
  });
});

describe('formatShortDate', () => {
  it('formats a dotted short date', () => {
    expect(formatShortDate('2026-05-23')).toBe('23.05.2026.');
  });
});

describe('formatPrice', () => {
  it('formats whole euros with trailing sign', () => {
    expect(formatPrice(382)).toBe('382 €');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/web && bun test src/features/serpapi/utils/format.test.ts`
Expected: FAIL (modules not found).

- [ ] **Step 3: Write the implementations**

`format-duration.ts`:

```ts
export const formatDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (minutes === 0) {
    return `${hours} st.`;
  }

  return `${hours} st. ${minutes} min`;
};
```

`format-month-label.ts`:

```ts
const shortFormatter = new Intl.DateTimeFormat('lv-LV', { month: 'short', timeZone: 'UTC' });
const longFormatter = new Intl.DateTimeFormat('lv-LV', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export const formatMonthLabel = (monthKey: string, variant: 'short' | 'long'): string => {
  const date = new Date(`${monthKey}-01T00:00:00Z`);

  if (variant === 'short') {
    return shortFormatter.format(date);
  }

  return longFormatter.format(date);
};
```

`format-date-label.ts`:

```ts
const formatter = new Intl.DateTimeFormat('lv-LV', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
});

export const formatDateLabel = (isoDate: string): string => {
  return formatter.format(new Date(`${isoDate}T00:00:00Z`));
};
```

`format-short-date.ts`:

```ts
const formatter = new Intl.DateTimeFormat('lv-LV', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
});

export const formatShortDate = (isoDate: string): string => {
  return formatter.format(new Date(`${isoDate}T00:00:00Z`));
};
```

`format-price.ts`:

```ts
const formatter = new Intl.NumberFormat('lv-LV', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export const formatPrice = (price: number): string => {
  return formatter.format(price);
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/web && bun test src/features/serpapi/utils/format.test.ts`
Expected: PASS. If an lv-LV golden string fails, follow the comment in the test file.

- [ ] **Step 5: Lint and commit**

```bash
bun repo:lint
git add apps/web/src/features/serpapi/utils/format-*.ts
git commit -m "feat: ✨ lv-LV formatting utils for flight data"
```

---

### Task 5: Copy constants + FlightStatusLine

**Files:**
- Create: `apps/web/src/features/serpapi/constants/flight-page-copy.ts`
- Create: `apps/web/src/features/serpapi/components/flight-status-line/index.tsx`
- Create: `apps/web/src/features/serpapi/components/flight-status-line/styles.css.ts`

**Interfaces:**
- Consumes: `formatShortDate` (Task 4).
- Produces: `FLIGHT_PAGE_COPY` constant (all Latvian placeholder strings); `<FlightStatusLine queriedOn={string} />` (server component).

Reminder: load `.claude/skills/impeccable/reference/craft-floor.md` before starting this task.

- [ ] **Step 1: Write the copy constants**

```ts
/**
 * PLACEHOLDER COPY. Every string is a draft awaiting review by the site owner,
 * who owns all Latvian copy on this site. Do not merge to production without
 * her sign-off. No em dashes; substitute with period, comma, colon, or parens.
 */
export const FLIGHT_PAGE_COPY = {
  routeChip: 'Rīga (RIX) → Kolombo (CMB)',
  oneWayChip: 'vienvirziena cena',
  checkedOnPrefix: 'pārbaudīts',
  intro:
    'Šeit redzēsi reālas lētāko biļešu cenas lidojumam no Rīgas uz Šrilanku pa mēnešiem. Izvēlies mēnesi, apskati datumus un pārbaudi aktuālo cenu.',
  priceFromPrefix: 'no',
  averagePrefix: 'vidēji',
  datesSuffix: 'datumi',
  lowestPriceLabel: 'zemākā cena',
  stopsSuffix: 'pārsēšanās',
  overnightLabel: 'nakts lidojums',
  layoverSuffix: 'pārsēšanās',
  rowCtaLabel: 'Pārbaudīt cenu Google Flights',
  priceDisclaimer: 'Cena pārbaudīta {date}, šobrīd tā var atšķirties.',
  methodNote:
    'Cenas ir vienvirziena ekonomiskās klases biļetes vienai personai. Dati iegūti no Google Flights, pārbaudot izlidošanas pirmdienās. Cenas regulāri mainās, tāpēc pirms pirkuma vienmēr pārbaudi aktuālo cenu.',
  staleNotice: 'Šie dati ir novecojuši. Aktuālās cenas vari pārbaudīt Google Flights.',
  staleCtaLabel: 'Atvērt Google Flights',
  funnelTitle: 'Atradi savu lidojumu?',
  funnelBody: 'Es palīdzēšu ar visu pārējo: personalizēts ceļojuma plāns 48 stundu laikā.',
  funnelCtaLabel: 'Uzzināt vairāk',
} as const;
```

- [ ] **Step 2: Write the status line styles** (`styles.css.ts`)

```ts
import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, font, spacing, border } = vars;

export const statusLineStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: spacing[2],
});

const chipBaseStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: `${spacing[1]} ${spacing[3]}`,
  borderRadius: border.radius.small,
  backgroundColor: color.secondary,
  color: color.secondaryForeground,
  fontSize: font.size.xs,
  lineHeight: font.lineHeight.normal,
});

export const chipStyles = styleVariants({
  route: [chipBaseStyle],
  oneWay: [chipBaseStyle, { fontWeight: font.weight.semibold }],
});

export const stampStyle = style({
  fontSize: font.size.xs,
  color: color.secondaryForeground,
});
```

- [ ] **Step 3: Write the component** (`index.tsx`)

```tsx
import type { FunctionComponent } from 'react';

import { FLIGHT_PAGE_COPY } from '../../constants/flight-page-copy';
import { formatShortDate } from '../../utils/format-short-date';
import { chipStyles, stampStyle, statusLineStyle } from './styles.css';

type FlightStatusLineProps = {
  queriedOn: string;
};

export const FlightStatusLine: FunctionComponent<FlightStatusLineProps> = ({ queriedOn }) => (
  <div className={statusLineStyle}>
    <span className={chipStyles.route}>{FLIGHT_PAGE_COPY.routeChip}</span>
    <span className={chipStyles.oneWay}>{FLIGHT_PAGE_COPY.oneWayChip}</span>
    <span className={stampStyle}>
      {FLIGHT_PAGE_COPY.checkedOnPrefix} {formatShortDate(queriedOn)}
    </span>
  </div>
);
```

- [ ] **Step 4: Typecheck, lint, commit**

```bash
cd apps/web && bunx tsc --noEmit && cd ../..
bun repo:lint
git add apps/web/src/features/serpapi/constants/flight-page-copy.ts apps/web/src/features/serpapi/components/flight-status-line/
git commit -m "feat: ✨ flight page copy placeholders and status line"
```

---

### Task 6: FlightItinerary

**Files:**
- Create: `apps/web/src/features/serpapi/components/flight-itinerary/index.tsx`
- Create: `apps/web/src/features/serpapi/components/flight-itinerary/styles.css.ts`

**Interfaces:**
- Consumes: `FlightCheapestModel` (Task 1), `formatDuration` (Task 4), `FLIGHT_PAGE_COPY` (Task 5).
- Produces: `<FlightItinerary flight={FlightCheapestModel} />` (server component).

- [ ] **Step 1: Write the styles** (`styles.css.ts`)

```ts
import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, font, spacing, border } = vars;

export const itineraryListStyle = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gap: spacing[2],
});

export const legStyle = style({
  display: 'grid',
  gap: spacing[1],
});

export const legRouteStyle = style({
  fontSize: font.size.sm,
  lineHeight: font.lineHeight.normal,
});

export const legTimeStyle = style({
  fontWeight: font.weight.semibold,
  fontVariantNumeric: 'tabular-nums',
});

export const legMetaStyle = style({
  fontSize: font.size.xs,
  color: color.secondaryForeground,
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing[2],
});

export const overnightStyle = style({
  fontWeight: font.weight.semibold,
});

export const layoverStyle = style({
  justifySelf: 'start',
  padding: `${spacing[1]} ${spacing[3]}`,
  borderRadius: border.radius.small,
  backgroundColor: color.secondary,
  color: color.secondaryForeground,
  fontSize: font.size.xs,
});
```

- [ ] **Step 2: Write the component** (`index.tsx`)

```tsx
import { Fragment, type FunctionComponent } from 'react';

import { FLIGHT_PAGE_COPY } from '../../constants/flight-page-copy';
import type { FlightCheapestModel } from '../../models/flight-data-model';
import { formatDuration } from '../../utils/format-duration';
import {
  itineraryListStyle,
  layoverStyle,
  legMetaStyle,
  legRouteStyle,
  legStyle,
  legTimeStyle,
  overnightStyle,
} from './styles.css';

type FlightItineraryProps = {
  flight: FlightCheapestModel;
};

const formatTime = (dateTime: string): string => dateTime.slice(11);

export const FlightItinerary: FunctionComponent<FlightItineraryProps> = ({ flight }) => (
  <ol className={itineraryListStyle}>
    {flight.flights.map((leg, index) => {
      const layover = flight.layovers[index];

      return (
        <Fragment key={leg.flightNumber}>
          <li className={legStyle}>
            <span className={legRouteStyle}>
              <span className={legTimeStyle}>{formatTime(leg.departureAirport.time)}</span>{' '}
              {leg.departureAirport.name} ({leg.departureAirport.id}) →{' '}
              <span className={legTimeStyle}>{formatTime(leg.arrivalAirport.time)}</span>{' '}
              {leg.arrivalAirport.name} ({leg.arrivalAirport.id})
            </span>
            <span className={legMetaStyle}>
              <span>
                {leg.airline} {leg.flightNumber} · {formatDuration(leg.duration)}
              </span>
              {leg.overnight && (
                <span className={overnightStyle}>{FLIGHT_PAGE_COPY.overnightLabel}</span>
              )}
            </span>
          </li>
          {layover && (
            <li className={layoverStyle}>
              {formatDuration(layover.duration)} {FLIGHT_PAGE_COPY.layoverSuffix} · {layover.id}
            </li>
          )}
        </Fragment>
      );
    })}
  </ol>
);
```

Note: `index` is only used to pair layovers with the leg they follow (layover `i` sits after leg `i`); the last leg has no layover, and `flight.layovers[index]` is naturally `undefined` there.

- [ ] **Step 3: Typecheck, lint, commit**

```bash
cd apps/web && bunx tsc --noEmit && cd ../..
bun repo:lint
git add apps/web/src/features/serpapi/components/flight-itinerary/
git commit -m "feat: ✨ flight itinerary leg timeline"
```

---

### Task 7: FlightDateRow + gstatic remote pattern

**Files:**
- Create: `apps/web/src/features/serpapi/components/flight-date-row/index.tsx`
- Create: `apps/web/src/features/serpapi/components/flight-date-row/styles.css.ts`
- Modify: `apps/web/next.config.ts:13-21` (add `www.gstatic.com` to `images.remotePatterns`)

**Interfaces:**
- Consumes: `FlightDateModel` (Task 1), `buildGoogleFlightsUrl` (Task 3), `formatDateLabel`/`formatDuration`/`formatPrice` (Task 4), `FLIGHT_PAGE_COPY` (Task 5), `FlightItinerary` (Task 6), `Button` from `@/shared/components/button` (`as="a"`, `variant`, `size` props; NEVER a `fontSize` prop).
- Produces: `<FlightDateRow entry={FlightDateModel} queriedOnLabel={string} />` (server component; native `<details>`).

- [ ] **Step 1: Add the remote pattern in `next.config.ts`**

```ts
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'www.gstatic.com',
      },
    ],
    qualities: [75, 100],
  },
```

- [ ] **Step 2: Write the styles** (`styles.css.ts`)

```ts
import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, font, spacing, border, shadow } = vars;

const contentEnterKeyframes = keyframes({
  from: { opacity: 0, transform: 'translateY(-0.25rem)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const rowStyle = style({
  backgroundColor: color.surface,
  borderRadius: border.radius.medium,
  boxShadow: shadow.small,
});

export const summaryStyle = style({
  listStyle: 'none',
  cursor: 'pointer',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: spacing[3],
  padding: spacing[4],
  borderRadius: border.radius.medium,
  selectors: {
    '&::-webkit-details-marker': {
      display: 'none',
    },
  },
  ':focus-visible': {
    outline: `${vars.focus.width} solid ${vars.focus.color}`,
    outlineOffset: vars.focus.offset,
  },
});

export const dateStyle = style({
  fontWeight: font.weight.medium,
  fontSize: font.size.sm,
});

export const airlinesStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing[2],
  fontSize: font.size.xs,
  color: color.secondaryForeground,
});

export const logoStyle = style({
  borderRadius: border.radius.small,
});

export const metaStyle = style({
  fontSize: font.size.xs,
  color: color.secondaryForeground,
});

export const priceStyle = style({
  marginLeft: 'auto',
  fontWeight: font.weight.semibold,
  fontVariantNumeric: 'tabular-nums',
});

export const chevronStyle = style({
  transition: `rotate ${vars.transition.duration.fast} ${vars.transition.easing.easeInOut}`,
  selectors: {
    'details[open] &': {
      rotate: '180deg',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const contentStyle = style({
  display: 'grid',
  gap: spacing[4],
  padding: spacing[4],
  paddingTop: 0,
  animation: `${contentEnterKeyframes} ${vars.transition.duration.fast} ${vars.transition.easing.easeInOut}`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});

export const actionsStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: spacing[3],
});

export const disclaimerStyle = style({
  fontSize: font.size.xs,
  color: color.secondaryForeground,
});
```

- [ ] **Step 3: Write the component** (`index.tsx`)

```tsx
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import type { FunctionComponent } from 'react';

import { Button } from '@/shared/components/button';

import { FLIGHT_PAGE_COPY } from '../../constants/flight-page-copy';
import type { FlightDateModel } from '../../models/flight-data-model';
import { buildGoogleFlightsUrl } from '../../utils/build-google-flights-url';
import { formatDateLabel } from '../../utils/format-date-label';
import { formatDuration } from '../../utils/format-duration';
import { formatPrice } from '../../utils/format-price';
import { FlightItinerary } from '../flight-itinerary';
import {
  actionsStyle,
  airlinesStyle,
  chevronStyle,
  contentStyle,
  dateStyle,
  disclaimerStyle,
  logoStyle,
  metaStyle,
  priceStyle,
  rowStyle,
  summaryStyle,
} from './styles.css';

type FlightDateRowProps = {
  entry: FlightDateModel;
  queriedOnLabel: string;
};

export const FlightDateRow: FunctionComponent<FlightDateRowProps> = ({
  entry,
  queriedOnLabel,
}) => {
  const { cheapestFlight } = entry;
  const airlines = [
    ...new Map(cheapestFlight.flights.map((leg) => [leg.airline, leg.airlineLogo])).entries(),
  ];

  return (
    <details className={rowStyle}>
      <summary className={summaryStyle}>
        <span className={dateStyle}>{formatDateLabel(entry.date)}</span>
        <span className={airlinesStyle}>
          {airlines.map(([airline, logo]) => (
            <Image
              key={airline}
              className={logoStyle}
              src={logo}
              alt={airline}
              width={20}
              height={20}
            />
          ))}
          {airlines.map(([airline]) => airline).join(', ')}
        </span>
        <span className={metaStyle}>
          {cheapestFlight.stops} {FLIGHT_PAGE_COPY.stopsSuffix} ·{' '}
          {formatDuration(cheapestFlight.totalDuration)}
        </span>
        <span className={priceStyle}>{formatPrice(cheapestFlight.price)}</span>
        <ChevronDown className={chevronStyle} size={20} aria-hidden />
      </summary>
      <div className={contentStyle}>
        <FlightItinerary flight={cheapestFlight} />
        <div className={actionsStyle}>
          <Button
            as="a"
            variant="primary"
            size="medium"
            href={buildGoogleFlightsUrl(entry.date)}
            target="_blank"
            rel="noopener"
          >
            {FLIGHT_PAGE_COPY.rowCtaLabel}
          </Button>
          <span className={disclaimerStyle}>
            {FLIGHT_PAGE_COPY.priceDisclaimer.replace('{date}', queriedOnLabel)}
          </span>
        </div>
      </div>
    </details>
  );
};
```

- [ ] **Step 4: Typecheck, lint, commit**

```bash
cd apps/web && bunx tsc --noEmit && cd ../..
bun repo:lint
git add apps/web/src/features/serpapi/components/flight-date-row/ apps/web/next.config.ts
git commit -m "feat: ✨ expandable flight date row with google flights link"
```

---

### Task 8: FlightMonthPanel

**Files:**
- Create: `apps/web/src/features/serpapi/components/flight-month-panel/index.tsx`
- Create: `apps/web/src/features/serpapi/components/flight-month-panel/styles.css.ts`

**Interfaces:**
- Consumes: `FlightMonthModel` (Task 1), `formatMonthLabel`/`formatPrice` (Task 4), `FLIGHT_PAGE_COPY` (Task 5), `FlightDateRow` (Task 7).
- Produces: `<FlightMonthPanel month={FlightMonthModel} queriedOnLabel={string} />` (server component).

- [ ] **Step 1: Write the styles** (`styles.css.ts`)

```ts
import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, font, spacing } = vars;

export const panelStyle = style({
  display: 'grid',
  gap: spacing[4],
});

export const panelHeaderStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  gap: spacing[3],
});

export const panelTitleStyle = style({
  margin: 0,
  fontSize: font.size['2xl'],
  fontWeight: font.weight.semibold,
  lineHeight: font.lineHeight.tight,
});

export const panelLowestStyle = style({
  fontSize: font.size.sm,
  color: color.secondaryForeground,
});

export const rowListStyle = style({
  display: 'grid',
  gap: spacing[3],
});
```

- [ ] **Step 2: Write the component** (`index.tsx`)

```tsx
import type { FunctionComponent } from 'react';

import { FLIGHT_PAGE_COPY } from '../../constants/flight-page-copy';
import type { FlightMonthModel } from '../../models/flight-data-model';
import { formatMonthLabel } from '../../utils/format-month-label';
import { formatPrice } from '../../utils/format-price';
import { FlightDateRow } from '../flight-date-row';
import {
  panelHeaderStyle,
  panelLowestStyle,
  panelStyle,
  panelTitleStyle,
  rowListStyle,
} from './styles.css';

type FlightMonthPanelProps = {
  month: FlightMonthModel;
  queriedOnLabel: string;
};

export const FlightMonthPanel: FunctionComponent<FlightMonthPanelProps> = ({
  month,
  queriedOnLabel,
}) => (
  <section className={panelStyle}>
    <header className={panelHeaderStyle}>
      <h2 className={panelTitleStyle}>{formatMonthLabel(month.month, 'long')}</h2>
      <span className={panelLowestStyle}>
        {FLIGHT_PAGE_COPY.lowestPriceLabel} {formatPrice(month.lowestPrice)}
      </span>
    </header>
    <div className={rowListStyle}>
      {month.dates.map((entry) => (
        <FlightDateRow key={entry.date} entry={entry} queriedOnLabel={queriedOnLabel} />
      ))}
    </div>
  </section>
);
```

Note: lv-LV month names are lowercase ("2026. gada oktobris") and must stay exactly as `Intl` produces them; never add `textTransform` to the title (capitalizing mid-phrase words is wrong Latvian).

- [ ] **Step 3: Typecheck, lint, commit**

```bash
cd apps/web && bunx tsc --noEmit && cd ../..
bun repo:lint
git add apps/web/src/features/serpapi/components/flight-month-panel/
git commit -m "feat: ✨ flight month panel with date rows"
```

---

### Task 9: FlightPriceStripTile + FlightPriceExplorer (client pair)

**Files:**
- Create: `apps/web/src/features/serpapi/components/flight-price-strip-tile/index.tsx`
- Create: `apps/web/src/features/serpapi/components/flight-price-strip-tile/styles.css.ts`
- Create: `apps/web/src/features/serpapi/components/flight-price-explorer/index.tsx`
- Create: `apps/web/src/features/serpapi/components/flight-price-explorer/styles.css.ts`

**Interfaces:**
- Consumes: `FlightMonthSummaryModel` (Task 1), `formatMonthLabel`/`formatPrice` (Task 4), `FLIGHT_PAGE_COPY` (Task 5), Ark `Tabs` from `@ark-ui/react/tabs`, `assignInlineVars` from `@vanilla-extract/dynamic`.
- Produces: `<FlightPriceExplorer summaries={FlightMonthSummaryModel[]} defaultMonth={string}>{panels}</FlightPriceExplorer>` where `children` is one server-rendered panel per summary IN THE SAME ORDER (zipped by index). `FlightPriceStripTile` is internal to the explorer (imported only by it).

Chart rules (from the spec, non-negotiable): bars are zero-based (height = averagePrice / max averagePrice across summaries), single series so no legend, price text wears text tokens, selected tile is the only coral element.

- [ ] **Step 1: Write the tile styles** (`flight-price-strip-tile/styles.css.ts`)

```ts
import { createVar, keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, font, spacing, border, transition } = vars;

export const barHeightVar = createVar();
export const barIndexVar = createVar();

const growKeyframes = keyframes({
  from: { transform: 'scaleY(0)' },
  to: { transform: 'scaleY(1)' },
});

export const tileStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing[2],
  padding: `${spacing[3]} ${spacing[4]}`,
  border: '1px solid transparent',
  borderRadius: border.radius.medium,
  backgroundColor: 'transparent',
  cursor: 'pointer',
  flexShrink: 0,
  ':focus-visible': {
    outline: `${vars.focus.width} solid ${vars.focus.color}`,
    outlineOffset: vars.focus.offset,
  },
  selectors: {
    '&[data-selected]': {
      borderColor: color.accent,
    },
    '&:hover:not([data-selected])': {
      backgroundColor: color.secondary,
    },
  },
});

export const monthLabelStyle = style({
  fontSize: font.size.xs,
  color: color.secondaryForeground,
});

export const barTrackStyle = style({
  display: 'flex',
  alignItems: 'flex-end',
  height: '4rem',
  width: '0.75rem',
});

export const barStyle = style({
  width: '100%',
  height: barHeightVar,
  borderRadius: `${border.radius.small} ${border.radius.small} 0 0`,
  backgroundColor: `color-mix(in oklch, ${color.primary} 15%, transparent)`,
  transformOrigin: 'bottom',
  animation: `${growKeyframes} ${transition.duration.normal} ${transition.easing.easeInOut} backwards`,
  animationDelay: `calc(${barIndexVar} * 30ms)`,
  selectors: {
    [`${tileStyle}[data-selected] &`]: {
      backgroundColor: color.accent,
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});

export const priceLabelStyle = style({
  fontSize: font.size.sm,
  fontWeight: font.weight.semibold,
  fontVariantNumeric: 'tabular-nums',
});

export const visuallyHiddenStyle = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: 0,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
});
```

- [ ] **Step 2: Write the tile component** (`flight-price-strip-tile/index.tsx`)

```tsx
'use client';

import { Tabs } from '@ark-ui/react/tabs';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FunctionComponent } from 'react';

import { FLIGHT_PAGE_COPY } from '../../constants/flight-page-copy';
import type { FlightMonthSummaryModel } from '../../models/flight-data-model';
import { formatMonthLabel } from '../../utils/format-month-label';
import { formatPrice } from '../../utils/format-price';
import {
  barHeightVar,
  barIndexVar,
  barStyle,
  barTrackStyle,
  monthLabelStyle,
  priceLabelStyle,
  tileStyle,
  visuallyHiddenStyle,
} from './styles.css';

type FlightPriceStripTileProps = {
  summary: FlightMonthSummaryModel;
  maxAveragePrice: number;
  index: number;
};

export const FlightPriceStripTile: FunctionComponent<FlightPriceStripTileProps> = ({
  summary,
  maxAveragePrice,
  index,
}) => {
  const heightPercent = Math.round((summary.averagePrice / maxAveragePrice) * 100);
  const hint = `${FLIGHT_PAGE_COPY.averagePrefix} ${formatPrice(summary.averagePrice)} · ${summary.dateCount} ${FLIGHT_PAGE_COPY.datesSuffix}`;

  return (
    <Tabs.Trigger
      value={summary.month}
      className={tileStyle}
      title={hint}
      style={assignInlineVars({
        [barHeightVar]: `${heightPercent}%`,
        [barIndexVar]: `${index}`,
      })}
    >
      <span className={monthLabelStyle}>{formatMonthLabel(summary.month, 'short')}</span>
      <span className={barTrackStyle} aria-hidden>
        <span className={barStyle} />
      </span>
      <span className={priceLabelStyle}>
        {FLIGHT_PAGE_COPY.priceFromPrefix} {formatPrice(summary.lowestPrice)}
      </span>
      <span className={visuallyHiddenStyle}>{hint}</span>
    </Tabs.Trigger>
  );
};
```

- [ ] **Step 3: Write the explorer styles** (`flight-price-explorer/styles.css.ts`)

```ts
import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing } = vars;

export const rootStyle = style({
  display: 'grid',
  gap: spacing[6],
});

export const listStyle = style({
  display: 'flex',
  alignItems: 'flex-end',
  gap: spacing[2],
  overflowX: 'auto',
  paddingBottom: spacing[2],
});
```

- [ ] **Step 4: Write the explorer component** (`flight-price-explorer/index.tsx`)

```tsx
'use client';

import { Tabs } from '@ark-ui/react/tabs';
import { Children, type FunctionComponent, type ReactNode } from 'react';

import type { FlightMonthSummaryModel } from '../../models/flight-data-model';
import { FlightPriceStripTile } from '../flight-price-strip-tile';
import { listStyle, rootStyle } from './styles.css';

type FlightPriceExplorerProps = {
  summaries: FlightMonthSummaryModel[];
  defaultMonth: string;
  // One server-rendered panel per summary, in the same order as `summaries`
  children: ReactNode;
};

export const FlightPriceExplorer: FunctionComponent<FlightPriceExplorerProps> = ({
  summaries,
  defaultMonth,
  children,
}) => {
  const panels = Children.toArray(children);
  const maxAveragePrice = Math.max(...summaries.map((summary) => summary.averagePrice));

  return (
    <Tabs.Root defaultValue={defaultMonth} className={rootStyle}>
      <Tabs.List className={listStyle}>
        {summaries.map((summary, index) => (
          <FlightPriceStripTile
            key={summary.month}
            summary={summary}
            maxAveragePrice={maxAveragePrice}
            index={index}
          />
        ))}
      </Tabs.List>
      {summaries.map((summary, index) => (
        <Tabs.Content key={summary.month} value={summary.month}>
          {panels[index]}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
```

Implementation notes:
- Ark Tabs keeps all `Tabs.Content` mounted (hidden via `hidden` attribute) by default: do NOT pass `lazyMount` or `unmountOnExit`; all months must stay in the DOM for SEO.
- Verify the selected-trigger attribute in the rendered DOM: Ark v5 sets `data-selected` on the active trigger. If the installed version emits `data-state="active"` instead, update the two selectors in the tile styles accordingly.
- If Bun/TS complains about `style={assignInlineVars(...)}` on `Tabs.Trigger`, wrap the trigger content in a `span` carrying the style instead; the vars only need to be an ancestor of `barStyle`.

- [ ] **Step 5: Typecheck, lint, commit**

```bash
cd apps/web && bunx tsc --noEmit && cd ../..
bun repo:lint
git add apps/web/src/features/serpapi/components/flight-price-strip-tile/ apps/web/src/features/serpapi/components/flight-price-explorer/
git commit -m "feat: ✨ flight price strip with month tabs"
```

---

### Task 10: Page assembly

**Files:**
- Modify: `apps/web/src/app/flight-tickets/page.tsx` (full rewrite of the stub)
- Create: `apps/web/src/app/flight-tickets/styles.css.ts`

**Interfaces:**
- Consumes: everything above, plus `Breadcrumbs`/`buildSectionItems`/`findNavLabel` (`@/shared/components/breadcrumbs`, `.../build-items`), `Card` (`@/shared/components/card`, props `variant`/`shadow`/`radius`), `Button`, `SectionBlogs` (`@/shared/components/section-blogs`, props `sectionTitle: string`, `blogsLimit: number`), `buildPageMetadata` (`@/features/sanity/utils/build-page-metadata`), `PAGES` (`@packages/sanity/constants/pages-slugs`), `Temporal`.
- Produces: the finished route.

- [ ] **Step 1: Write the page styles** (`styles.css.ts`)

```ts
import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { breakpoint, color, font, spacing } = vars;

export const pageStyle = style({
  maxWidth: breakpoint.md,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: spacing[24],
  display: 'grid',
  gap: spacing[6],
});

export const introStyle = style({
  margin: 0,
});

export const methodNoteStyle = style({
  margin: 0,
  fontSize: font.size.xs,
  color: color.secondaryForeground,
});

export const funnelCardStyle = style({
  display: 'grid',
  gap: spacing[3],
  justifyItems: 'start',
  padding: spacing[6],
});

export const funnelTitleStyle = style({
  margin: 0,
  fontSize: font.size.xl,
  fontWeight: font.weight.semibold,
});

export const funnelBodyStyle = style({
  margin: 0,
});

export const staleCardStyle = style({
  display: 'grid',
  gap: spacing[3],
  justifyItems: 'start',
  padding: spacing[6],
});
```

- [ ] **Step 2: Rewrite the page** (`page.tsx`)

```tsx
import { Temporal } from '@js-temporal/polyfill';
import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { FlightMonthPanel } from '@/features/serpapi/components/flight-month-panel';
import { FlightPriceExplorer } from '@/features/serpapi/components/flight-price-explorer';
import { FlightStatusLine } from '@/features/serpapi/components/flight-status-line';
import { FLIGHT_PAGE_COPY } from '@/features/serpapi/constants/flight-page-copy';
import flightData from '@/features/serpapi/data/flight-data.json';
import type { FlightDataModel } from '@/features/serpapi/models/flight-data-model';
import { buildGoogleFlightsRouteUrl } from '@/features/serpapi/utils/build-google-flights-url';
import {
  filterUpcomingMonths,
  findCheapestUpcomingMonth,
} from '@/features/serpapi/utils/filter-upcoming-months';
import { formatShortDate } from '@/features/serpapi/utils/format-short-date';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems, findNavLabel } from '@/shared/components/breadcrumbs/build-items';
import { Button } from '@/shared/components/button';
import { Card } from '@/shared/components/card';
import { SectionBlogs } from '@/shared/components/section-blogs';

import {
  funnelBodyStyle,
  funnelCardStyle,
  funnelTitleStyle,
  introStyle,
  methodNoteStyle,
  pageStyle,
  staleCardStyle,
} from './styles.css';

export const revalidate = 86400;

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGES.LV.FLIGHT_TICKETS);

const data = flightData as FlightDataModel;

const NextFlightCalendarPage: FunctionComponent = () => {
  const href = `/${PAGES.LV.FLIGHT_TICKETS}`;
  const today = Temporal.Now.plainDateISO('Europe/Riga');
  const months = filterUpcomingMonths(data, today);
  const defaultMonth = findCheapestUpcomingMonth(months);
  const queriedOnLabel = formatShortDate(data.queriedOn);
  const summaries = months.map((month) => ({
    month: month.month,
    lowestPrice: month.lowestPrice,
    averagePrice: month.averagePrice,
    dateCount: month.dates.length,
  }));

  return (
    <>
      <div className={pageStyle}>
        <Breadcrumbs items={buildSectionItems(href)} />
        <h1>{findNavLabel(href)}</h1>
        <FlightStatusLine queriedOn={data.queriedOn} />
        <p className={introStyle}>{FLIGHT_PAGE_COPY.intro}</p>
        {defaultMonth ? (
          <FlightPriceExplorer summaries={summaries} defaultMonth={defaultMonth}>
            {months.map((month) => (
              <FlightMonthPanel key={month.month} month={month} queriedOnLabel={queriedOnLabel} />
            ))}
          </FlightPriceExplorer>
        ) : (
          <Card variant="filled" className={staleCardStyle}>
            <p>{FLIGHT_PAGE_COPY.staleNotice}</p>
            <Button
              as="a"
              variant="primary"
              size="medium"
              href={buildGoogleFlightsRouteUrl()}
              target="_blank"
              rel="noopener"
            >
              {FLIGHT_PAGE_COPY.staleCtaLabel}
            </Button>
          </Card>
        )}
        <p className={methodNoteStyle}>{FLIGHT_PAGE_COPY.methodNote}</p>
        <Card variant="filled" className={funnelCardStyle}>
          <h2 className={funnelTitleStyle}>{FLIGHT_PAGE_COPY.funnelTitle}</h2>
          <p className={funnelBodyStyle}>{FLIGHT_PAGE_COPY.funnelBody}</p>
          <Button
            as="a"
            variant="primary"
            size="medium"
            href={`/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_HOLIDAY_PLAN}`}
          >
            {FLIGHT_PAGE_COPY.funnelCtaLabel}
          </Button>
        </Card>
      </div>
      <SectionBlogs sectionTitle="Mani piedzīvojumi Šrilankā" blogsLimit={6} />
    </>
  );
};

export default NextFlightCalendarPage;
```

Implementation notes:
- If `flightData as FlightDataModel` fails to typecheck (JSON literal widening), use `flightData as unknown as FlightDataModel` and leave a one-line comment saying the JSON is produced by `scripts/map-flights.ts`.
- `SectionBlogs` sits outside `pageStyle` on purpose (it manages its own width, same as `StaticPageLayout`).
- `revalidate = 86400` keeps the past-date filter fresh daily without a deploy.

- [ ] **Step 3: Run all tests, typecheck, lint**

```bash
cd apps/web && bun test src/features/serpapi && bunx tsc --noEmit && cd ../..
bun repo:lint
```
Expected: all pass.

- [ ] **Step 4: Build and eyeball**

```bash
bun web:build
```
Expected: build succeeds. Then `bun web:dev` and open `http://localhost:3000/letakie-lidojumi-uz-srilanku-no-rigas` in a Chromium browser (Firefox dev has a known HMR reload loop; not our code). Verify: strip renders with the cheapest month preselected, July/past dates absent, rows expand, Google Flights link opens the right date.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/app/flight-tickets/
git commit -m "feat: ✨ flight price tool page"
```

---

### Task 11: Verification pass

**Files:**
- Create (scratch, not committed): screenshot script in the session scratchpad directory.

**Interfaces:**
- Consumes: the running dev server (`bun web:dev`), Playwright from `apps/web` devDependencies.

- [ ] **Step 1: Screenshots in both themes**

Write a scratch Playwright script (in the scratchpad dir, NOT the repo) that opens `http://localhost:3000/letakie-lidojumi-uz-srilanku-no-rigas` at 390px and 1280px widths, once with `colorScheme: 'light'` and once with `colorScheme: 'dark'`, saving four PNGs. Read the PNGs and check: strip bars visible in both themes, selected tile coral in both, no horizontal page scroll at 390px, text legible on all surfaces.

```ts
import { chromium } from 'playwright';

const run = async () => {
  const browser = await chromium.launch();

  for (const colorScheme of ['light', 'dark'] as const) {
    for (const width of [390, 1280]) {
      const page = await browser.newPage({ colorScheme, viewport: { width, height: 1200 } });
      await page.goto('http://localhost:3000/letakie-lidojumi-uz-srilanku-no-rigas');
      await page.waitForTimeout(1500);
      await page.screenshot({
        path: `flight-tool-${colorScheme}-${width}.png`,
        fullPage: true,
      });
      await page.close();
    }
  }

  await browser.close();
};

run();
```

Run with `cd apps/web && bunx playwright install chromium` (if needed) then `bun <scratchpad>/screenshot.ts`.

- [ ] **Step 2: Automated a11y check**

Run axe against the dev server (no repo dependency change; use the CLI ad hoc):

```bash
bunx @axe-core/cli http://localhost:3000/letakie-lidojumi-uz-srilanku-no-rigas
```
Expected: no violations attributable to the new page (pre-existing global findings, if any, are out of scope). Fix any new violation before proceeding.

- [ ] **Step 3: Keyboard walkthrough**

In the browser: Tab reaches the strip; Arrow keys move between month tiles (Ark Tabs); Enter/Space toggles a `<details>` row; every focused element shows the lime focus ring; the row CTA is reachable and announces as a link.

- [ ] **Step 4: Link spot-check**

Click one row CTA; confirm Google Flights opens RIX→CMB, one-way, with the row's date prefilled, UI in Latvian, prices in EUR. If the `q=` parsing misbehaves, adjust the query string in `build-google-flights-url.ts` (and its test) until it prefills correctly.

- [ ] **Step 5: Fix anything found, re-run tests and lint, commit fixes**

```bash
cd apps/web && bun test src/features/serpapi && cd ../..
bun repo:lint
git add -A apps/web
git commit -m "fix: 🐛 flight price tool verification fixes"
```
(Skip the commit if nothing changed.)

- [ ] **Step 6: Final review gate**

Run the superpowers:requesting-code-review flow for the branch, then hand back to Dave for: (a) visual review, (b) partner's copy review of `flight-page-copy.ts` (BLOCKING for production merge).

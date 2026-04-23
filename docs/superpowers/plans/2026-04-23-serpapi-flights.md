# SerpAPI Flights Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a SerpAPI feature with provider/repository pattern and a fetch script that produces dated JSON files of raw Google Flights data for RIX → CMB.

**Architecture:** Provider wraps the `serpapi` package's `getJson` with typed params/responses. Repository delegates to provider. A standalone script uses the repository to fetch one-way flight data for every Monday across 9 months and writes raw responses to a dated JSON file. A GitHub Actions workflow runs the script weekly and commits the result to `main`.

**Tech Stack:** `serpapi` npm package, TypeScript, GitHub Actions

**Spec:** `docs/superpowers/specs/2026-04-23-flights-calendar-design.md`

---

### File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `apps/web/src/features/serpapi/models/serp-api-config-model.ts` | Config type for provider constructor |
| Create | `apps/web/src/features/serpapi/models/serp-api-flight-model.ts` | Individual flight segment type |
| Create | `apps/web/src/features/serpapi/models/serp-api-layover-model.ts` | Layover type |
| Create | `apps/web/src/features/serpapi/models/serp-api-flight-result-model.ts` | Flight result (itinerary) type |
| Create | `apps/web/src/features/serpapi/models/serp-api-price-insights-model.ts` | Price insights type |
| Create | `apps/web/src/features/serpapi/models/serp-api-flight-response-model.ts` | Top-level API response type |
| Create | `apps/web/src/features/serpapi/interfaces/serpapi-provider-interface.ts` | Provider contract |
| Create | `apps/web/src/features/serpapi/interfaces/serpapi-repository-interface.ts` | Repository contract |
| Create | `apps/web/src/features/serpapi/providers/default-serpapi-provider.ts` | Wraps `serpapi` package |
| Create | `apps/web/src/features/serpapi/repositories/default-serpapi-repository.ts` | Delegates to provider |
| Create | `apps/web/scripts/fetch-flights.ts` | Cron script that fetches and writes data |
| Create | `.github/workflows/fetch-flights.yml` | Weekly GitHub Actions workflow |

---

### Task 1: Create all model types

**Files:**
- Create: `apps/web/src/features/serpapi/models/serp-api-config-model.ts`
- Create: `apps/web/src/features/serpapi/models/serp-api-flight-model.ts`
- Create: `apps/web/src/features/serpapi/models/serp-api-layover-model.ts`
- Create: `apps/web/src/features/serpapi/models/serp-api-flight-result-model.ts`
- Create: `apps/web/src/features/serpapi/models/serp-api-price-insights-model.ts`
- Create: `apps/web/src/features/serpapi/models/serp-api-flight-response-model.ts`

- [ ] **Step 1: Create `serp-api-config-model.ts`**

```typescript
export type SerpApiConfigModel = {
  apiKey: string;
};
```

- [ ] **Step 2: Create `serp-api-flight-model.ts`**

```typescript
export type SerpApiFlightModel = {
  departure_airport: {
    name: string;
    id: string;
    time: string;
  };
  arrival_airport: {
    name: string;
    id: string;
    time: string;
  };
  duration: number;
  airline: string;
  airline_logo: string;
  flight_number: string;
  travel_class: string;
  extensions: string[];
};
```

- [ ] **Step 3: Create `serp-api-layover-model.ts`**

```typescript
export type SerpApiLayoverModel = {
  duration: number;
  name: string;
  id: string;
};
```

- [ ] **Step 4: Create `serp-api-flight-result-model.ts`**

```typescript
import type { SerpApiFlightModel } from './serp-api-flight-model';
import type { SerpApiLayoverModel } from './serp-api-layover-model';

export type SerpApiFlightResultModel = {
  flights: SerpApiFlightModel[];
  layovers?: SerpApiLayoverModel[];
  total_duration: number;
  price: number;
  type: string;
  airline_logo: string;
  booking_token?: string;
};
```

- [ ] **Step 5: Create `serp-api-price-insights-model.ts`**

```typescript
export type SerpApiPriceInsightsModel = {
  lowest_price: number;
  price_level: string;
  typical_price_range: [number, number];
};
```

- [ ] **Step 6: Create `serp-api-flight-response-model.ts`**

```typescript
import type { SerpApiFlightResultModel } from './serp-api-flight-result-model';
import type { SerpApiPriceInsightsModel } from './serp-api-price-insights-model';

export type SerpApiFlightResponseModel = {
  best_flights: SerpApiFlightResultModel[];
  other_flights?: SerpApiFlightResultModel[];
  price_insights?: SerpApiPriceInsightsModel;
};
```

- [ ] **Step 7: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep serpapi`
Expected: No errors related to serpapi files

- [ ] **Step 8: Commit**

```bash
git add apps/web/src/features/serpapi/models/
git commit -m "feat: ✨ add serpapi model types"
```

---

### Task 2: Create provider and repository interfaces

**Files:**
- Create: `apps/web/src/features/serpapi/interfaces/serpapi-provider-interface.ts`
- Create: `apps/web/src/features/serpapi/interfaces/serpapi-repository-interface.ts`

- [ ] **Step 1: Create `serpapi-provider-interface.ts`**

```typescript
import type { SerpApiFlightResponseModel } from '../models/serp-api-flight-response-model';

export interface SerpApiProviderInterface {
  searchFlights(params: {
    departureId: string;
    arrivalId: string;
    outboundDate: string;
    currency?: string;
  }): Promise<SerpApiFlightResponseModel>;
}
```

- [ ] **Step 2: Create `serpapi-repository-interface.ts`**

```typescript
import type { SerpApiFlightResponseModel } from '../models/serp-api-flight-response-model';

export interface SerpApiRepositoryInterface {
  searchFlights(params: {
    departureId: string;
    arrivalId: string;
    outboundDate: string;
    currency?: string;
  }): Promise<SerpApiFlightResponseModel>;
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep serpapi`
Expected: No errors related to serpapi files

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/features/serpapi/interfaces/
git commit -m "feat: ✨ add serpapi provider and repository interfaces"
```

---

### Task 3: Implement the default provider

**Files:**
- Create: `apps/web/src/features/serpapi/providers/default-serpapi-provider.ts`

- [ ] **Step 1: Create `default-serpapi-provider.ts`**

```typescript
import { getJson } from 'serpapi';

import type { SerpApiProviderInterface } from '../interfaces/serpapi-provider-interface';
import type { SerpApiConfigModel } from '../models/serp-api-config-model';
import type { SerpApiFlightResponseModel } from '../models/serp-api-flight-response-model';

export class DefaultSerpApiProvider implements SerpApiProviderInterface {
  private readonly apiKey: string;

  constructor(config: SerpApiConfigModel) {
    this.apiKey = config.apiKey;
  }

  public async searchFlights(params: {
    departureId: string;
    arrivalId: string;
    outboundDate: string;
    currency?: string;
  }): Promise<SerpApiFlightResponseModel> {
    const response = await getJson('google_flights', {
      api_key: this.apiKey,
      departure_id: params.departureId,
      arrival_id: params.arrivalId,
      outbound_date: params.outboundDate,
      type: '2',
      adults: 1,
      travel_class: 1,
      currency: params.currency ?? 'EUR',
      gl: 'lv',
      hl: 'en',
      deep_search: true,
    });

    return response as unknown as SerpApiFlightResponseModel;
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep serpapi`
Expected: No errors related to serpapi files

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/features/serpapi/providers/default-serpapi-provider.ts
git commit -m "feat: ✨ add default serpapi provider"
```

---

### Task 4: Implement the default repository

**Files:**
- Create: `apps/web/src/features/serpapi/repositories/default-serpapi-repository.ts`

- [ ] **Step 1: Create `default-serpapi-repository.ts`**

```typescript
import type { SerpApiProviderInterface } from '../interfaces/serpapi-provider-interface';
import type { SerpApiRepositoryInterface } from '../interfaces/serpapi-repository-interface';

export class DefaultSerpApiRepository implements SerpApiRepositoryInterface {
  readonly provider: SerpApiProviderInterface;

  constructor(provider: SerpApiProviderInterface) {
    this.provider = provider;
  }

  public async searchFlights(params: {
    departureId: string;
    arrivalId: string;
    outboundDate: string;
    currency?: string;
  }) {
    return this.provider.searchFlights(params);
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep serpapi`
Expected: No errors related to serpapi files

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/features/serpapi/repositories/default-serpapi-repository.ts
git commit -m "feat: ✨ add default serpapi repository"
```

---

### Task 5: Create the fetch-flights script

**Files:**
- Create: `apps/web/scripts/fetch-flights.ts`

- [ ] **Step 1: Create `fetch-flights.ts`**

This script generates every Monday for the next 9 months, fetches one-way flight data from SerpAPI for each date, and writes the raw responses to a dated JSON file.

```typescript
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

import { DefaultSerpApiProvider } from '../src/features/serpapi/providers/default-serpapi-provider';
import { DefaultSerpApiRepository } from '../src/features/serpapi/repositories/default-serpapi-repository';

const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY;

if (!SERPAPI_API_KEY) {
  console.error('SERPAPI_API_KEY environment variable is required');
  process.exit(1);
}

function getMondaysForNextMonths(months: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  const end = new Date(today);
  end.setMonth(end.getMonth() + months);

  const current = new Date(today);
  // Advance to next Monday
  const dayOfWeek = current.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
  current.setDate(current.getDate() + daysUntilMonday);

  while (current <= end) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const day = String(current.getDate()).padStart(2, '0');
    dates.push(`${year}-${month}-${day}`);
    current.setDate(current.getDate() + 7);
  }

  return dates;
}

async function main() {
  const provider = new DefaultSerpApiProvider({ apiKey: SERPAPI_API_KEY });
  const repository = new DefaultSerpApiRepository(provider);

  const dates = getMondaysForNextMonths(9);
  console.log(`Fetching flights for ${dates.length} dates...`);

  const flights: Record<string, unknown> = {};

  for (const date of dates) {
    console.log(`Fetching ${date}...`);
    try {
      const response = await repository.searchFlights({
        departureId: 'RIX',
        arrivalId: 'CMB',
        outboundDate: date,
        currency: 'EUR',
      });
      flights[date] = response;
    } catch (error) {
      console.error(`Failed to fetch ${date}:`, error);
      flights[date] = null;
    }
  }

  const output = {
    fetchedAt: new Date().toISOString(),
    flights,
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const filename = `flights-${year}-${month}-${day}.json`;

  const outputPath = resolve(
    dirname(new URL(import.meta.url).pathname),
    '../src/features/serpapi/data',
    filename,
  );

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`Written to ${outputPath}`);
}

main();
```

- [ ] **Step 2: Create the empty `data` directory with a `.gitkeep`**

Run: `mkdir -p apps/web/src/features/serpapi/data && touch apps/web/src/features/serpapi/data/.gitkeep`

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep serpapi`
Expected: No errors related to serpapi files (the script may need a separate tsconfig — check if it compiles)

- [ ] **Step 4: Commit**

```bash
git add apps/web/scripts/fetch-flights.ts apps/web/src/features/serpapi/data/.gitkeep
git commit -m "feat: ✨ add fetch-flights script"
```

---

### Task 6: Create the GitHub Actions workflow

**Files:**
- Create: `.github/workflows/fetch-flights.yml`

- [ ] **Step 1: Create `.github/workflows/fetch-flights.yml`**

```yaml
name: Fetch Flights Data

on:
  schedule:
    - cron: '0 3 * * 0' # Every Sunday at 03:00 UTC
  workflow_dispatch: # Allow manual triggers

jobs:
  fetch-flights:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          ref: main

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2

      - name: Install dependencies
        run: bun install

      - name: Run fetch-flights script
        env:
          SERPAPI_API_KEY: ${{ secrets.SERPAPI_API_KEY }}
        run: bun run apps/web/scripts/fetch-flights.ts

      - name: Commit and push
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add apps/web/src/features/serpapi/data/
          git diff --cached --quiet && echo "No changes to commit" && exit 0
          git commit -m "data: ✈️ update flights data $(date +%Y-%m-%d)"
          git pull --rebase origin main
          git push origin main
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/fetch-flights.yml
git commit -m "feat: ✨ add weekly fetch-flights github action"
```

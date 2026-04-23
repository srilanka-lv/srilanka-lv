# Flights Calendar Page Design

## Overview

A static page at `/flights-calendar` that shows Latvians the cheapest one-way flights from Riga (RIX) to Colombo (CMB) across the next 9 months. Data is fetched weekly via a cron job using SerpAPI's Google Flights engine and cached as a static JSON file. The cron samples one date per week (every Monday) to stay within the free 250 credits/month limit (~39 calls/week, ~156 calls/month). The page displays month rows with average prices, expandable to show per-sampled-date details with booking links.

## Data Source

**SerpAPI Google Flights** (`engine: "google_flights"`)
- Package: `serpapi` (installed via bun)
- API key env var: `SERPAPI_API_KEY`
- One-way flights (`type: 2`), 1 adult, economy, EUR currency
- Fixed route: RIX -> CMB
- ~39 API calls per cron run (one Monday per week across 9 months)
- Weekly cron schedule, ~156 credits/month (within 250 free tier)

## Feature Structure

```
apps/web/src/features/serpapi/
├── data/
│   ├── flights-2026-04-23.json   # Raw SerpAPI responses, one file per weekly run
│   ├── flights-2026-04-30.json   # Committed by GitHub Actions, accumulates over time
│   └── ...
├── interfaces/
│   ├── serpapi-provider-interface.ts
│   └── serpapi-repository-interface.ts
├── models/
│   ├── serp-api-config-model.ts
│   ├── serp-api-flight-model.ts
│   ├── serp-api-flight-response-model.ts
│   ├── serp-api-flight-result-model.ts
│   ├── serp-api-layover-model.ts
│   └── serp-api-price-insights-model.ts
├── providers/
│   └── default-serpapi-provider.ts
├── repositories/
│   └── default-serpapi-repository.ts
```

## Interfaces

### SerpApiProviderInterface

```typescript
export interface SerpApiProviderInterface {
  searchFlights(params: {
    departureId: string;
    arrivalId: string;
    outboundDate: string;
    currency?: string;
  }): Promise<SerpApiFlightResponseModel>;
}
```

### SerpApiRepositoryInterface

```typescript
export interface SerpApiRepositoryInterface {
  searchFlights(params: {
    departureId: string;
    arrivalId: string;
    outboundDate: string;
    currency?: string;
  }): Promise<SerpApiFlightResponseModel>;
}
```

## Models

### `serp-api-config-model.ts`

```typescript
export type SerpApiConfigModel = {
  apiKey: string;
};
```

### `serp-api-flight-model.ts`

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

### `serp-api-layover-model.ts`

```typescript
export type SerpApiLayoverModel = {
  duration: number;
  name: string;
  id: string;
};
```

### `serp-api-flight-result-model.ts`

```typescript
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

### `serp-api-price-insights-model.ts`

```typescript
export type SerpApiPriceInsightsModel = {
  lowest_price: number;
  price_level: string;
  typical_price_range: [number, number];
};
```

### `serp-api-flight-response-model.ts`

```typescript
export type SerpApiFlightResponseModel = {
  best_flights: SerpApiFlightResultModel[];
  other_flights?: SerpApiFlightResultModel[];
  price_insights?: SerpApiPriceInsightsModel;
};
```

## Implementations

### DefaultSerpApiProvider

- Takes `SerpApiConfigModel` in constructor
- Uses the `serpapi` package's `getJson` function with `engine: "google_flights"`
- Passes search params: `departure_id`, `arrival_id`, `outbound_date`, `type: "2"` (one-way), `adults: 1`, `travel_class: 1` (economy), `currency`, `gl: "lv"`, `hl: "en"`, `deep_search: true`
- Returns typed `SerpApiFlightResponseModel`

### DefaultSerpApiRepository

- Takes `SerpApiProviderInterface` in constructor (dependency injection)
- Delegates `searchFlights` to provider

## Data Pipeline (Cron Job)

A standalone script at `apps/web/scripts/fetch-flights.ts` that:

1. Generates sampled departure dates — every Monday for the next 9 months (~39 dates)
2. For each date, calls `repository.searchFlights({ departureId: "RIX", arrivalId: "CMB", outboundDate: date, currency: "EUR" })`
3. Stores the raw SerpAPI response for each date (no data transformation — the frontend decides what to use)
4. Writes the result to `apps/web/src/features/serpapi/data/flights-YYYY-MM-DD.json` (dated with the run date)

### Output JSON Shape

The raw SerpAPI responses keyed by departure date, with a `fetchedAt` timestamp:

```json
{
  "fetchedAt": "2026-04-23T08:00:00Z",
  "flights": {
    "2026-05-05": { "best_flights": [...], "other_flights": [...], "price_insights": {...}, ... },
    "2026-05-12": { "best_flights": [...], "other_flights": [...], "price_insights": {...}, ... },
    "2026-05-19": { "best_flights": [...], "other_flights": [...], "price_insights": {...}, ... },
    "2026-05-26": { "best_flights": [...], "other_flights": [...], "price_insights": {...}, ... }
  }
}
```

This gives the frontend full access to all SerpAPI data: flights, layovers, airlines, price insights, booking tokens, carbon emissions, etc. Previous runs are preserved as separate files, enabling price trend analysis over time.

### Cron Execution

GitHub Actions workflow runs weekly (e.g. every Sunday night). The workflow:
- Reads `SERPAPI_API_KEY` from environment
- Runs the fetch script, which creates a new dated file
- Pulls latest `main` with rebase to avoid conflicts
- Commits and pushes directly to `main`, triggering a redeploy
- Budget: ~156 credits/month, well within the 250 free tier

Since the Action only ever adds new files in `data/`, merge conflicts with regular development are extremely unlikely. The pull + rebase step handles the edge case where someone else pushed to `main` between the fetch and commit.

## Design Decisions

- **SerpAPI over flightapi.io**: Cleaner response format, human-readable data (no ID resolution needed), booking tokens for direct Google Flights links, price insights included.
- **Raw responses committed to repo**: No data transformation in the pipeline — raw SerpAPI responses stored as dated files (`flights-YYYY-MM-DD.json`) in `apps/web/src/features/serpapi/data/`, committed via GitHub Actions directly to `main`. Previous results are preserved, enabling price trend analysis. Frontend imports the latest file and has full data to work with.
- **Weekly sampling**: One date per week (every Monday) instead of every day. Keeps API usage within the 250 credits/month free tier (~156 credits/month) while still giving visitors a useful price indication per month.
- **One-way prices**: Simpler than round-trip (one call per date), gives visitors a price indication. 1 adult, economy class.
- **9-month window**: Latvians travel to Sri Lanka mainly in winter — 9 months covers the next winter season from any point in the year.
- **EUR currency**: Target audience is Latvian (eurozone).
- **Sequential API calls in cron**: Respects rate limits. ~39 calls per run is lightweight.
- **Booking links**: The `booking_token` from SerpAPI can be used to construct a Google Flights URL: `https://www.google.com/travel/flights/booking?token=<booking_token>`. This is included in the JSON output for the frontend to consume.

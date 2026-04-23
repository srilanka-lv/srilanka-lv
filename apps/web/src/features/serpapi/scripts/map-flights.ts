import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import type { RawFlight } from '../types/raw-flight';
import type { RawFlightResult } from '../types/raw-flight-result';
import type { RawLayover } from '../types/raw-layover';
import type { RawResponse } from '../types/raw-response';

function findLatestQueryDate(dataDir: string): string | null {
  const files = readdirSync(dataDir).filter((f) => f.startsWith('flights_queried-on-'));
  if (files.length === 0) {
    return null;
  }

  const queryDates = files
    .map((f) => f.match(/queried-on-(\d{4}-\d{2}-\d{2})/)?.[1])
    .filter((d): d is string => d !== undefined);

  return queryDates.sort().reverse()[0] ?? null;
}

function transformFlight(raw: RawFlight) {
  return {
    airline: raw.airline,
    airlineLogo: raw.airline_logo,
    flightNumber: raw.flight_number,
    departureAirport: raw.departure_airport,
    arrivalAirport: raw.arrival_airport,
    duration: raw.duration,
    airplane: raw.airplane,
    travelClass: raw.travel_class,
    legroom: raw.legroom,
    extensions: raw.extensions,
    overnight: raw.overnight,
  };
}

function transformLayover(raw: RawLayover) {
  return {
    name: raw.name,
    id: raw.id,
    duration: raw.duration,
  };
}

function getCheapestFlight(data: RawResponse): RawFlightResult | null {
  const allFlights = [...(data.best_flights ?? []), ...(data.other_flights ?? [])];
  if (allFlights.length === 0) {
    return null;
  }

  return allFlights.reduce((cheapest, current) => {
    return current.price < cheapest.price ? current : cheapest;
  });
}

function main() {
  const dataDir = resolve(dirname(new URL(import.meta.url).pathname), '../data');
  const queryDate = findLatestQueryDate(dataDir);

  if (!queryDate) {
    console.error('No flight data files found');
    process.exit(1);
  }

  console.log(`Processing files from query date: ${queryDate}`);

  const files = readdirSync(dataDir)
    .filter((f) => f.startsWith(`flights_queried-on-${queryDate}`))
    .sort();

  const dateEntries: Array<{
    date: string;
    cheapestFlight: {
      price: number;
      totalDuration: number;
      stops: number;
      flights: ReturnType<typeof transformFlight>[];
      layovers: ReturnType<typeof transformLayover>[];
      carbonEmissions: RawFlightResult['carbon_emissions'];
      bookingToken: string | undefined;
    };
  }> = [];

  for (const file of files) {
    const resultDate = file.match(/results-for-(\d{4}-\d{2}-\d{2})/)?.[1];
    if (!resultDate) {
      continue;
    }

    const raw: RawResponse = JSON.parse(readFileSync(resolve(dataDir, file), 'utf-8'));
    const cheapest = getCheapestFlight(raw);

    if (!cheapest) {
      console.warn(`No flights found for ${resultDate}, skipping`);
      continue;
    }

    dateEntries.push({
      date: resultDate,
      cheapestFlight: {
        price: cheapest.price,
        totalDuration: cheapest.total_duration,
        stops: (cheapest.layovers ?? []).length,
        flights: cheapest.flights.map(transformFlight),
        layovers: (cheapest.layovers ?? []).map(transformLayover),
        carbonEmissions: cheapest.carbon_emissions,
        bookingToken: cheapest.booking_token,
      },
    });
  }

  // Group by month
  const monthMap = new Map<string, typeof dateEntries>();

  for (const entry of dateEntries) {
    const monthKey = entry.date.slice(0, 7);
    const existing = monthMap.get(monthKey) ?? [];
    existing.push(entry);
    monthMap.set(monthKey, existing);
  }

  const months = Array.from(monthMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([monthKey, dates]) => {
      const prices = dates.map((d) => d.cheapestFlight.price);
      const averagePrice = Math.round(prices.reduce((sum, p) => sum + p, 0) / prices.length);
      const lowestPrice = Math.min(...prices);

      const [year, month] = monthKey.split('-');
      const label = new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });

      return {
        month: monthKey,
        label,
        averagePrice,
        lowestPrice,
        dates,
      };
    });

  const output = {
    queriedOn: queryDate,
    months,
  };

  const outputPath = resolve(dataDir, 'flight-data.json');
  writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`Written flight-data.json with ${months.length} months, ${dateEntries.length} dates`);
}

main();

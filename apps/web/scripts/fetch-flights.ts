import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

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
  const provider = new DefaultSerpApiProvider({ apiKey: SERPAPI_API_KEY! });
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

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { config } from 'serpapi';

import { DefaultSerpApiProvider } from '../providers/default-serpapi-provider';
import { DefaultSerpApiRepository } from '../repositories/default-serpapi-repository';

// deep_search responses regularly exceed the serpapi client's 60s default.
config.timeout = 180_000;

const FETCH_ATTEMPTS = 3;

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
  const provider = new DefaultSerpApiProvider();
  const repository = new DefaultSerpApiRepository(provider);

  const dates = getMondaysForNextMonths(9);
  console.log(`Fetching flights for ${dates.length} dates...`);

  const today = new Date();
  const queriedOn = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const dataDir = resolve(dirname(new URL(import.meta.url).pathname), '../data');
  mkdirSync(dataDir, { recursive: true });

  const failedDates: string[] = [];

  for (const date of dates) {
    let written = false;

    for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt++) {
      console.log(`Fetching ${date} (attempt ${attempt}/${FETCH_ATTEMPTS})...`);
      try {
        const response = await repository.searchFlights({
          airportDepartureId: 'RIX',
          airportArrivalId: 'CMB',
          outboundDate: date,
        });

        const filename = `flights_queried-on-${queriedOn}_results-for-${date}.json`;
        const outputPath = resolve(dataDir, filename);
        writeFileSync(outputPath, JSON.stringify(response));
        console.log(`Written ${filename}`);
        written = true;
        break;
      } catch (error) {
        console.error(`Failed to fetch ${date} (attempt ${attempt}/${FETCH_ATTEMPTS}):`, error);
      }
    }

    if (!written) {
      failedDates.push(date);
    }
  }

  if (failedDates.length > 0) {
    console.error(`Failed after ${FETCH_ATTEMPTS} attempts: ${failedDates.join(', ')}`);
    process.exitCode = 1;
  }

  console.log(`Done. Queried ${dates.length} dates.`);
}

main();

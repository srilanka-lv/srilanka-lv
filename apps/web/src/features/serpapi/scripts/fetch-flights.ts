import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { DefaultSerpApiProvider } from '../providers/default-serpapi-provider';
import { DefaultSerpApiRepository } from '../repositories/default-serpapi-repository';

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

  for (const date of dates) {
    console.log(`Fetching ${date}...`);
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
    } catch (error) {
      console.error(`Failed to fetch ${date}:`, error);
    }
  }

  console.log(`Done. Queried ${dates.length} dates.`);
}

main();

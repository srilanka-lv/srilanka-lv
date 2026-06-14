import { PAGE_FLIGHT_TICKETS_SLUG } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import flightData from '@/features/serpapi/data/flight-data.json';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems, findNavLabel } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata(PAGE_FLIGHT_TICKETS_SLUG);

export default function FlightCalendarPage() {
  const href = `/${PAGE_FLIGHT_TICKETS_SLUG}`;

  return (
    <>
      <Breadcrumbs items={buildSectionItems(href)} />
      <h1>{findNavLabel(href)}</h1>
      <div>
        {flightData.months.map((month) => (
          <div key={month.month}>
            <ul>
              <li>{month.label}</li>
              <li>Average price to fly from Riga to Colombo: {month.averagePrice}</li>
              <li>Cheapest price to fly from Riga to Colombo: {month.lowestPrice}</li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import flightData from '@/features/serpapi/data/flight-data.json';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems, findNavLabel } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGES.LV.FLIGHT_TICKETS);

const NextFlightCalendarPage: FunctionComponent = () => {
  const href = `/${PAGES.LV.FLIGHT_TICKETS}`;

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
};

export default NextFlightCalendarPage;

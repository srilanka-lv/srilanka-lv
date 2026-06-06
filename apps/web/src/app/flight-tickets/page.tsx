import { PAGE_FLIGHT_TICKETS_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import flightData from '@/features/serpapi/data/flight-data.json';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = () => buildPageMetadata(PAGE_FLIGHT_TICKETS_SLUG);

export default function FlightCalendarPage() {
  return (
    <>
      <Breadcrumbs items={buildSectionItems(`/${PAGE_FLIGHT_TICKETS_SLUG}`)} />
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

import { metaDataBySlugQuery } from '@packages/sanity/queries/meta-data-by-slug-query';
import type { Metadata } from 'next';

import { DefaultSanityProvider } from '@/features/sanity/providers/default-sanity-provider';
import { DefaultSanityRepository } from '@/features/sanity/repositories/default-sanity-repository';
import flightData from '@/features/serpapi/data/flight-data.json';

const slug = 'letakie-lidojumi-uz-srilanku-no-rigas';

const sanityProvider = new DefaultSanityProvider();
const sanityRepository = new DefaultSanityRepository(sanityProvider);

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityRepository.query(metaDataBySlugQuery, { slug });

  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
  };
}

export default function FlightCalendarPage() {
  return (
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
  );
}

import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { FunctionComponent } from 'react';

import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildItems } from '@/shared/components/breadcrumbs/build-items';

import { Heading } from '../heading';
import { TripPageHeroSection } from '../trip-page-hero-section';
import { TripPageItinerarySection } from '../trip-page-itinerary-section';
import { TripPageUspSection } from '../trip-page-usp-section';
import { tripPageTitleStyle } from './styles.css';

export const ProductPageTrip: FunctionComponent = () => {
  const productsHref = `/${PAGES.LV.PRODUCTS}`;

  return (
    <>
      <Breadcrumbs
        items={buildItems(productsHref, {
          name: '10 dienu ceļojums Šrilankā (tikai meitenēm)',
          href: `${productsHref}/${PAGES.LV.PRODUCTS_GIRLS_TRIP}`,
        })}
      />
      <Heading as="h1" variant="h1" className={tripPageTitleStyle}>
        10 dienu ceļojums Šrilankā tikai meitenēm (2027)
      </Heading>
      <TripPageHeroSection />
      <TripPageUspSection />
      <Heading as="h1" variant="h3" className={tripPageTitleStyle}>
        Ceļojuma plāns
      </Heading>
      <TripPageItinerarySection />
    </>
  );
};

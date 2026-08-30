import { PAGES } from '@packages/sanity/constants/pages-slugs';
import Image from 'next/image';
import type { FunctionComponent } from 'react';

import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildItems } from '@/shared/components/breadcrumbs/build-items';

import { Heading } from '../heading';
import { TripPageHeroSection } from '../trip-page-hero-section';
import { TripPageItinerarySection } from '../trip-page-itinerary-section';
import { TripPageUspSection } from '../trip-page-usp-section';
import {
  tripPageCollaborationLinkStyle,
  tripPageCollaborationLogoStyle,
  tripPageCollaborationStyle,
  tripPageTitleStyle,
} from './styles.css';

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
      <div className={tripPageCollaborationStyle}>
        <a
          className={tripPageCollaborationLinkStyle}
          href="https://celoarmariku.lv?utm_source=srilanka-lv&utm_medium=banner-product-page&utm_campaign=girls-trip"
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="outbound-link"
          data-umami-event-url="https://celoarmariku.lv"
        >
          <Image
            className={tripPageCollaborationLogoStyle}
            src="/images/srilanka-lv_logo_celoarmariku.png"
            alt="Ceļo ar Mariku"
            width={74}
            height={50}
          />
        </a>
        <span>
          ☀️ Šī ir sadarbība ar{' '}
          <a
            href="https://celoarmariku.lv/products/srilanka-paradize-indijas-okeana?utm_source=srilanka-lv&utm_medium=banner-product-page&utm_campaign=girls-trip"
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="outbound-link"
            data-umami-event-url="https://celoarmariku.lv/products/srilanka-paradize-indijas-okeana?utm_source=srilanka-lv&utm_medium=banner-product-page&utm_campaign=girls-trip"
          >
            Ceļo ar Mariku
          </a>
        </span>
      </div>
      <TripPageHeroSection />
      <TripPageUspSection />
      <TripPageItinerarySection />
    </>
  );
};

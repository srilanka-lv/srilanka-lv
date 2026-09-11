import { PAGES } from '@packages/sanity/constants/pages-slugs';
import Image from 'next/image';
import type { FunctionComponent } from 'react';

import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildItems } from '@/shared/components/breadcrumbs/build-items';
import {
  GIRLS_TRIP_PARTNER_PRODUCT_CAMPAIGN_URL,
  GIRLS_TRIP_PARTNER_PRODUCT_URL,
} from '@/shared/constants/girls-trip-partner-url';
import { quietLinkStyle } from '@/shared/styles/quiet-link.css';

import { Heading } from '../heading';
import { TripPageHeroSection } from '../trip-page-hero-section';
import { TripPageItinerarySection } from '../trip-page-itinerary-section';
import { TripPageUspSection } from '../trip-page-usp-section';
import { TripPageVideoSection } from '../trip-page-video-section';
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
          href={GIRLS_TRIP_PARTNER_PRODUCT_CAMPAIGN_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="outbound-link"
          data-umami-event-url={GIRLS_TRIP_PARTNER_PRODUCT_URL}
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
            className={quietLinkStyle}
            href={GIRLS_TRIP_PARTNER_PRODUCT_CAMPAIGN_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="outbound-link"
            data-umami-event-url={GIRLS_TRIP_PARTNER_PRODUCT_URL}
          >
            Ceļo ar Mariku
          </a>
        </span>
      </div>
      <TripPageHeroSection />
      <TripPageVideoSection />
      <TripPageUspSection />
      <TripPageItinerarySection />
    </>
  );
};

import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { FunctionComponent } from 'react';

import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildItems } from '@/shared/components/breadcrumbs/build-items';
import { GuideTestimonials } from '@/shared/components/guide-testimonials';
import type { GirlsTripBookingPhase } from '@/shared/constants/girls-trip-booking';
import { travellerTestimonials } from '@/shared/constants/traveller-testimonials';

import { Heading } from '../heading';
import { TripPageBookingProvider } from '../trip-page-booking-provider';
import { TRIP_PAGE_CLOSING_SECTION_ID, TripPageClosingSection } from '../trip-page-closing-section';
import { TripPageCostSection } from '../trip-page-cost-section';
import { TripPageFaqSection } from '../trip-page-faq-section';
import { TRIP_PAGE_SUMMARY_ID, TripPageHeroSection } from '../trip-page-hero-section';
import { TripPageIncludedSection } from '../trip-page-included-section';
import { TripPageItinerarySection } from '../trip-page-itinerary-section';
import { TripPagePaymentSection } from '../trip-page-payment-section';
import { TripPageSection } from '../trip-page-section';
import { TripPageStickyBar } from '../trip-page-sticky-bar';
import { TripPageUspSection } from '../trip-page-usp-section';
import { TripPageVideoSection } from '../trip-page-video-section';
import { tripPageTitleStyle } from './styles.css';

const stickyBarHideWhileVisibleIds = [TRIP_PAGE_SUMMARY_ID, TRIP_PAGE_CLOSING_SECTION_ID];

type ProductPageTripProps = {
  /** The booking phase when the page was rendered; the browser re-checks it. */
  phase: GirlsTripBookingPhase;
};

/*
 * Read top to bottom as a careful first-time buyer would: the facts, the
 * price and both next steps first; then what the price covers, the whole
 * cost and how paying works; then the trip itself; then other people's words,
 * the open questions, and one last invitation instead of a product list.
 */
export const ProductPageTrip: FunctionComponent<ProductPageTripProps> = ({ phase }) => {
  const productsHref = `/${PAGES.LV.PRODUCTS}`;

  return (
    <TripPageBookingProvider initialPhase={phase}>
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
      <TripPageIncludedSection />
      <TripPageVideoSection />
      <TripPageCostSection />
      <TripPagePaymentSection />
      <TripPageUspSection />
      <TripPageItinerarySection />
      <TripPageSection id="atsauksmes" title="Ko saka citi ceļotāji">
        <GuideTestimonials items={travellerTestimonials} />
      </TripPageSection>
      <TripPageFaqSection />
      <TripPageClosingSection />
      <TripPageStickyBar hideWhileVisibleIds={stickyBarHideWhileVisibleIds} />
    </TripPageBookingProvider>
  );
};

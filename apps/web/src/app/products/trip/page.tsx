import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { buildProductPageMetadata } from '@/shared/components/products-page/build-product-page-metadata';
import { products } from '@/shared/components/products-page/index.data';
import { TripJsonLd } from '@/shared/components/trip-json-ld';
import { ProductPageTrip } from '@/shared/components/trip-page';
import { getGirlsTripBookingPhase } from '@/shared/constants/girls-trip-booking';
import { GIRLS_TRIP_SEO_TITLE, buildGirlsTripDescription } from '@/shared/utils/girls-trip-seo';

// Title and description are authored here: the page has no Sanity document,
// and Sanity's SEO fields still win if one is ever added. The description
// names today's price, so it is worked out per (hourly) regeneration.
export const generateMetadata = (): Promise<Metadata> =>
  buildProductPageMetadata(PAGES.LV.PRODUCTS_GIRLS_TRIP, {
    title: GIRLS_TRIP_SEO_TITLE,
    description: buildGirlsTripDescription(getGirlsTripBookingPhase(Date.now())),
  });

const NextProductPageTrip: FunctionComponent = () => {
  const product = products.find((item) => item.slug === PAGES.LV.PRODUCTS_GIRLS_TRIP);

  // Worked out on every (hourly) regeneration; the page re-checks in the
  // browser, so the early-bird and the deadline switch on time either way.
  const phase = getGirlsTripBookingPhase(Date.now());

  return (
    <>
      {product && <TripJsonLd product={product} phase={phase} />}
      <ProductPageTrip phase={phase} />
    </>
  );
};

export default NextProductPageTrip;

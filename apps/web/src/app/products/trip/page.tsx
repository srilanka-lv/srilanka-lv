import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { ProductJsonLd } from '@/shared/components/product-json-ld';
import { buildProductPageMetadata } from '@/shared/components/products-page/build-product-page-metadata';
import { products } from '@/shared/components/products-page/index.data';
import { ProductPageTrip } from '@/shared/components/trip-page';
import { tripPageFaqs } from '@/shared/components/trip-page-faq-section/index.data';
import {
  getGirlsTripBookingPhase,
  getGirlsTripPriceEur,
} from '@/shared/constants/girls-trip-booking';

export const generateMetadata = (): Promise<Metadata> =>
  buildProductPageMetadata(PAGES.LV.PRODUCTS_GIRLS_TRIP);

const NextProductPageTrip: FunctionComponent = () => {
  const product = products.find((item) => item.slug === PAGES.LV.PRODUCTS_GIRLS_TRIP);

  // Worked out on every (hourly) regeneration; the page re-checks in the
  // browser, so the early-bird and the deadline switch on time either way.
  const phase = getGirlsTripBookingPhase(Date.now());

  return (
    <>
      {product && (
        <ProductJsonLd
          product={{
            ...product,
            // The offer carries the price the page shows today.
            priceEur: String(getGirlsTripPriceEur(phase)),
          }}
          kind="trip"
          faqs={tripPageFaqs}
        />
      )}
      <ProductPageTrip phase={phase} />
    </>
  );
};

export default NextProductPageTrip;

import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { ProductPageTrip } from '@/shared/components/trip-page';

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata(PAGES.LV.PRODUCTS_GIRLS_TRIP);

const NextProductPageTrip: FunctionComponent = () => {
  return <ProductPageTrip />;
};

export default NextProductPageTrip;

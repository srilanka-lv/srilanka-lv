import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { buildProductPageMetadata } from '@/shared/components/products-page/build-product-page-metadata';
import { ProductPageTrip } from '@/shared/components/trip-page';

export const generateMetadata = (): Promise<Metadata> =>
  buildProductPageMetadata(PAGES.LV.PRODUCTS_CONSULTATION);

const NextProductPageConsultation: FunctionComponent = () => {
  return <ProductPageTrip />;
};

export default NextProductPageConsultation;

import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { ProductJsonLd } from '@/shared/components/product-json-ld';
import { buildProductPageMetadata } from '@/shared/components/products-page/build-product-page-metadata';
import { products } from '@/shared/components/products-page/index.data';
import { ProductPageTrip } from '@/shared/components/trip-page';

export const generateMetadata = (): Promise<Metadata> =>
  buildProductPageMetadata(PAGES.LV.PRODUCTS_CONSULTATION);

const NextProductPageConsultation: FunctionComponent = () => {
  const product = products.find((item) => item.slug === PAGES.LV.PRODUCTS_CONSULTATION);

  return (
    <>
      {product && <ProductJsonLd product={product} kind="service" />}
      <ProductPageTrip />
    </>
  );
};

export default NextProductPageConsultation;

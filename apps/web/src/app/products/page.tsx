import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { ProductsPage } from '@/shared/components/products-page';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGES.LV.PRODUCTS);

const NextProductsPage: FunctionComponent = () => {
  return <ProductsPage />;
};

export default NextProductsPage;

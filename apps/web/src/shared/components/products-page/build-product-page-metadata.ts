import type { Metadata } from 'next';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';

import { products } from './index.data';

export const buildProductPageMetadata = async (slug: string): Promise<Metadata> => {
  const product = products.find((item) => item.slug === slug);
  const metadata = await buildPageMetadata(slug, product?.href);

  return {
    ...metadata,
    title: metadata.title ?? product?.title,
    description: metadata.description ?? product?.description,
  };
};

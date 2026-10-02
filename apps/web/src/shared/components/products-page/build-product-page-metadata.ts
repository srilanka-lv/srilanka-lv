import type { Metadata } from 'next';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';

import { products } from './index.data';

type MetadataFallback = {
  title: string;
  description: string;
};

/**
 * Metadata for a product page: Sanity's SEO and Open Graph fields when the
 * page has them, otherwise `fallback` (a page's own search copy) or the
 * product's title and description.
 */
export const buildProductPageMetadata = async (
  slug: string,
  fallback?: MetadataFallback,
): Promise<Metadata> => {
  const product = products.find((item) => item.slug === slug);
  const metadata = await buildPageMetadata(slug, product?.href, product?.ogImage);

  const title = metadata.title ?? fallback?.title ?? product?.title;
  const description = metadata.description ?? fallback?.description ?? product?.description;

  return {
    ...metadata,
    title,
    description,
    openGraph: {
      ...metadata.openGraph,
      title: metadata.openGraph?.title ?? title ?? undefined,
      description: metadata.openGraph?.description ?? description ?? undefined,
    },
  };
};

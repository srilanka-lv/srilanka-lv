import { pagesMetaDataBySlugQuery } from '@packages/sanity/queries/pages-meta-data-by-slug-query';
import type { Metadata } from 'next';

import { urlForImage } from '@/features/sanity/utils/url-for-image';

import { buildSanityRepository } from './build-sanity-repository';

export async function buildPageMetadata(slug: string): Promise<Metadata> {
  const repository = buildSanityRepository();
  const data = await repository.query(pagesMetaDataBySlugQuery, { slug });

  const ogTitle = data?.openGraph?.openGraphTitle ?? data?.seo?.metaTitle ?? undefined;
  const ogDescription =
    data?.openGraph?.openGraphDescription ?? data?.seo?.metaDescription ?? undefined;
  const ogImage = data?.openGraph?.openGraphImage;

  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      ...(ogImage
        ? {
            images: [
              {
                url: urlForImage(ogImage)
                  .width(1200)
                  .height(630)
                  // biome-ignore lint/suspicious/noFocusedTests: This isn't a test - it's the Sanity image URL.
                  .fit('crop')
                  .auto('format')
                  .quality(100)
                  .url(),
                width: 1200,
                height: 630,
                alt: ogImage.alt ?? '',
              },
            ],
          }
        : {}),
    },
  };
}

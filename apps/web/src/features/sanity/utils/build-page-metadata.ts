import { pagesMetaDataBySlugQuery } from '@packages/sanity/queries/pages-meta-data-by-slug-query';
import type { Metadata } from 'next';

import { urlForImage } from '@/features/sanity/utils/url-for-image';
import { DEFAULT_OG_IMAGE } from '@/shared/constants/og-image';

import { buildSanityRepository } from './build-sanity-repository';

export type OgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export async function buildPageMetadata(
  slug: string,
  canonicalPath: string = `/${slug}`,
  fallbackOgImage: OgImage = DEFAULT_OG_IMAGE,
): Promise<Metadata> {
  const repository = buildSanityRepository();
  const data = await repository.query(pagesMetaDataBySlugQuery, { slug });

  const ogTitle = data?.openGraph?.openGraphTitle ?? data?.seo?.metaTitle ?? undefined;
  const ogDescription =
    data?.openGraph?.openGraphDescription ?? data?.seo?.metaDescription ?? undefined;
  const ogImage = data?.openGraph?.openGraphImage;

  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalPath,
      siteName: 'Šrilanka.lv',
      locale: 'lv_LV',
      type: 'website',
      images: [
        ogImage
          ? {
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
            }
          : fallbackOgImage,
      ],
    },
  };
}

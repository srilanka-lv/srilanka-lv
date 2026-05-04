import type { SanityImageAssetReference } from '@packages/sanity/sanity.types';
import type { SanityImageSource } from '@sanity/image-url';

import { AUTHOR_NAME } from '@/shared/constants/author-name';
import { getAuthorUrl } from '@/shared/utils/get-author-url';
import { getLicenseUrl } from '@/shared/utils/get-license-url';

import { urlForImage } from './url-for-image';

type SanityImageWithMeta = {
  asset?: SanityImageAssetReference;
  alt?: string;
  caption?: string;
};

export type ImageObjectJsonLd = {
  '@type': 'ImageObject';
  '@id': string;
  contentUrl: string;
  url: string;
  name?: string;
  description?: string;
  creator: { '@type': 'Person'; name: string; url: string };
  creditText: string;
  copyrightNotice: string;
  license: string;
  acquireLicensePage: string;
};

type ImageObjectOptions = {
  image: SanityImageWithMeta;
  width: number;
  copyrightYear: number;
  pageUrl: string;
};

export function imageObjectFor({
  image,
  width,
  copyrightYear,
  pageUrl,
}: ImageObjectOptions): ImageObjectJsonLd | null {
  if (!image?.asset) {
    return null;
  }

  const contentUrl = urlForImage(image as SanityImageSource)
    .width(width)
    .quality(100)
    // biome-ignore lint/suspicious/noFocusedTests: This isn't a test - it's the Sanity image URL.
    .fit('max')
    .auto('format')
    .url();

  const licenseUrl = getLicenseUrl();

  return {
    '@type': 'ImageObject',
    '@id': contentUrl,
    contentUrl,
    url: pageUrl,
    name: image.alt || undefined,
    description: image.caption || undefined,
    creator: { '@type': 'Person', name: AUTHOR_NAME, url: getAuthorUrl() },
    creditText: AUTHOR_NAME,
    copyrightNotice: `© ${copyrightYear} ${AUTHOR_NAME}`,
    license: licenseUrl,
    acquireLicensePage: licenseUrl,
  };
}

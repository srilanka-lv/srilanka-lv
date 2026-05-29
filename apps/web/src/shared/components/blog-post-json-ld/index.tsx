import { Temporal } from '@js-temporal/polyfill';
import type { BlockContent, BlogPostsBySlugQueryResult } from '@packages/sanity/sanity.types';

import { collectBlockContentImages } from '@/features/sanity/utils/collect-block-content-images';
import { type ImageObjectJsonLd, imageObjectFor } from '@/features/sanity/utils/image-object';
import { AUTHOR_NAME } from '@/shared/constants/author-name';
import { SITE_NAME } from '@/shared/constants/site-name';
import { getAuthorUrl } from '@/shared/utils/get-author-url';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { getSiteUrl } from '@/shared/utils/get-site-url';

type BlogPostJsonLdProps = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string | null;
  coverImage: NonNullable<BlogPostsBySlugQueryResult>['coverImage'];
  openGraph: NonNullable<BlogPostsBySlugQueryResult>['openGraph'];
  body: BlockContent | null;
};

export function BlogPostJsonLd({
  slug,
  title,
  excerpt,
  publishedAt,
  coverImage,
  openGraph,
  body,
}: BlogPostJsonLdProps) {
  const year = publishedAt
    ? Temporal.Instant.from(publishedAt).toZonedDateTimeISO('UTC').year
    : Temporal.Now.zonedDateTimeISO('UTC').year;

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/blogi/${slug}`;

  const cover = coverImage
    ? imageObjectFor({ image: coverImage, width: 2400, copyrightYear: year, pageUrl })
    : null;
  const og = openGraph?.openGraphImage
    ? imageObjectFor({
        image: openGraph.openGraphImage,
        width: 1200,
        copyrightYear: year,
        pageUrl,
      })
    : null;
  const bodyImages = collectBlockContentImages(body)
    .map((image) => imageObjectFor({ image, width: 1920, copyrightYear: year, pageUrl }))
    .filter((image): image is ImageObjectJsonLd => image !== null);

  const allImages = [cover, og, ...bodyImages].filter(
    (image): image is ImageObjectJsonLd => image !== null,
  );

  const blogPosting = {
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#post`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    url: pageUrl,
    headline: title,
    description: excerpt,
    datePublished: publishedAt,
    author: { '@type': 'Person', name: AUTHOR_NAME, url: getAuthorUrl() },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: getLogoUrl(),
      },
    },
    image: allImages.map((image) => ({ '@id': image['@id'] })),
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [blogPosting, ...allImages],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

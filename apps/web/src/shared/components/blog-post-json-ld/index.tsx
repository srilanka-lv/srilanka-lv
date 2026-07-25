import { Temporal } from '@js-temporal/polyfill';
import type { BlockContent, BlogPostsBySlugQueryResult } from '@packages/sanity/sanity.types';

import { blockContentToPlainText } from '@/features/sanity/utils/block-content-to-text';
import { collectBlockContentImages } from '@/features/sanity/utils/collect-block-content-images';
import { discoverImageCrops } from '@/features/sanity/utils/discover-image-crops';
import { type ImageObjectJsonLd, imageObjectFor } from '@/features/sanity/utils/image-object';
import { getSiteUrl } from '@/shared/utils/get-site-url';
import {
  organizationId,
  organizationNode,
  personId,
  personNode,
} from '@/shared/utils/json-ld-nodes';

type BlogPostJsonLdProps = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string | null;
  updatedAt: string;
  coverImage: NonNullable<BlogPostsBySlugQueryResult>['coverImage'];
  openGraph: NonNullable<BlogPostsBySlugQueryResult>['openGraph'];
  body: BlockContent | null;
  faqs: NonNullable<BlogPostsBySlugQueryResult>['faqs'];
};

export function BlogPostJsonLd({
  slug,
  title,
  excerpt,
  publishedAt,
  updatedAt,
  coverImage,
  openGraph,
  body,
  faqs,
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

  const heroCrops = discoverImageCrops(coverImage ?? openGraph?.openGraphImage);

  const blogPosting = {
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#post`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    url: pageUrl,
    inLanguage: 'lv',
    headline: title,
    description: excerpt,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { '@id': personId() },
    publisher: { '@id': organizationId() },
    image: [...heroCrops, ...allImages.map((image) => ({ '@id': image['@id'] }))],
  };

  const faqPairs = (faqs ?? []).flatMap((faq) => {
    const answer = blockContentToPlainText(faq.answer);
    if (!faq.question || answer === '') {
      return [];
    }

    return [
      {
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      },
    ];
  });
  const faqPage =
    faqPairs.length > 0
      ? {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: faqPairs,
        }
      : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      blogPosting,
      personNode(),
      organizationNode(),
      ...(faqPage ? [faqPage] : []),
      ...allImages,
    ],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

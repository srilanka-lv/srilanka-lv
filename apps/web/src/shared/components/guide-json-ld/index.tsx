import { Temporal } from '@js-temporal/polyfill';
import type { PagesBySlugQueryResult } from '@packages/sanity/sanity.types';

import { discoverImageCrops } from '@/features/sanity/utils/discover-image-crops';
import { extractFaqFromBlockContent } from '@/features/sanity/utils/extract-faq-from-block-content';
import { type ImageObjectJsonLd, imageObjectFor } from '@/features/sanity/utils/image-object';
import { getSiteUrl } from '@/shared/utils/get-site-url';
import { organizationNode, personId, personNode } from '@/shared/utils/json-ld-nodes';

type GuideJsonLdProps = {
  page: NonNullable<PagesBySlugQueryResult>;
  path: string;
  title: string;
};

export function GuideJsonLd({ page, path, title }: GuideJsonLdProps) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${path}`;
  const year = Temporal.Instant.from(page._createdAt).toZonedDateTimeISO('UTC').year;

  const ogImage = page.openGraph?.openGraphImage
    ? imageObjectFor({
        image: page.openGraph.openGraphImage,
        width: 1200,
        copyrightYear: year,
        pageUrl,
      })
    : null;

  const heroCrops = discoverImageCrops(page.openGraph?.openGraphImage);
  const imageEntries = [...heroCrops, ...(ogImage ? [{ '@id': ogImage['@id'] }] : [])];

  const article = {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    url: pageUrl,
    inLanguage: 'lv',
    headline: title,
    ...(page.seo?.metaDescription ? { description: page.seo.metaDescription } : {}),
    datePublished: page._createdAt,
    dateModified: page._updatedAt,
    author: { '@id': personId() },
    publisher: { '@id': `${siteUrl}#organization` },
    ...(imageEntries.length > 0 ? { image: imageEntries } : {}),
  };

  const faqPairs = extractFaqFromBlockContent(page.body);
  const faqPage =
    faqPairs.length > 0
      ? {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: faqPairs.map((pair) => ({
            '@type': 'Question',
            name: pair.question,
            acceptedAnswer: { '@type': 'Answer', text: pair.answer },
          })),
        }
      : null;

  const graph: unknown[] = [article, personNode(), organizationNode()];
  if (faqPage) {
    graph.push(faqPage);
  }
  if (ogImage) {
    graph.push(ogImage satisfies ImageObjectJsonLd);
  }

  const jsonLd = { '@context': 'https://schema.org', '@graph': graph };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

import type { FunctionComponent } from 'react';

import type { GuideFaqItem } from '@/shared/components/guide-faq';
import type { GuideVideoData } from '@/shared/components/guide-video';
import { buildVideoObject } from '@/shared/utils/build-video-object';
import { getSiteUrl } from '@/shared/utils/get-site-url';
import {
  organizationId,
  organizationNode,
  personId,
  personNode,
} from '@/shared/utils/json-ld-nodes';

type GuideImage = {
  src: string;
  width: number;
  height: number;
};

type GuideJsonLdProps = {
  path: string;
  title: string;
  description: string;
  /** ISO dates. `dateModified` must match the visible "Atjaunots" date. */
  datePublished: string;
  dateModified: string;
  images: GuideImage[];
  faqs: GuideFaqItem[];
  videos: GuideVideoData[];
};

/**
 * Structured data for the code-authored guide: Article, FAQPage, one
 * VideoObject per clip, and the site's Person and Organization nodes, all in
 * one graph. Built from the same arrays the page renders, so the schema can
 * never describe content that is not on the page.
 */
export const GuideJsonLd: FunctionComponent<GuideJsonLdProps> = ({
  path,
  title,
  description,
  datePublished,
  dateModified,
  images,
  faqs,
  videos,
}) => {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${path}`;

  const imageObjects = images.map((image) => ({
    '@type': 'ImageObject',
    '@id': `${siteUrl}${image.src}#image`,
    url: `${siteUrl}${image.src}`,
    contentUrl: `${siteUrl}${image.src}`,
    width: image.width,
    height: image.height,
    creator: { '@id': personId() },
    creditText: 'Šrilanka.lv',
  }));

  const article = {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    url: pageUrl,
    inLanguage: 'lv',
    headline: title,
    description,
    datePublished,
    dateModified,
    author: { '@id': personId() },
    publisher: { '@id': organizationId() },
    image: imageObjects.map((image) => ({ '@id': image['@id'] })),
  };

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const videoObjects = videos
    .map((video) =>
      buildVideoObject({
        url: video.url,
        name: video.title,
        description: video.description,
        uploadDate: video.uploadDate,
      }),
    )
    .filter((node) => node !== null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      article,
      faqPage,
      ...videoObjects,
      ...imageObjects,
      personNode(),
      organizationNode(),
    ],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

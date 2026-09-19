import type { FunctionComponent } from 'react';

import type { GuideFaqItem } from '@/shared/components/guide-faq';
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

type GuideSubject = {
  name: string;
  wikidata: string;
  wikipediaLv: string;
  wikipediaEn: string;
};

type GuideMention = {
  name: string;
  wikidata: string;
};

type GuideJsonLdProps = {
  path: string;
  title: string;
  description: string;
  /** The one thing the page is about, linked to its Wikidata item. */
  subject: GuideSubject;
  /** Places and topics the text covers, each linked to its Wikidata item. */
  mentions: GuideMention[];
  /** ISO dates. `dateModified` must match the visible "Atjaunots" date. */
  datePublished: string;
  dateModified: string;
  images: GuideImage[];
  faqs: GuideFaqItem[];
};

/**
 * Structured data for the code-authored guide: Article, FAQPage and the
 * site's Person and Organization nodes, all in one graph. Built from the same arrays the page renders, so the schema can
 * never describe content that is not on the page.
 */
export const GuideJsonLd: FunctionComponent<GuideJsonLdProps> = ({
  path,
  title,
  description,
  subject,
  mentions,
  datePublished,
  dateModified,
  images,
  faqs,
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

  // Naming the real-world things behind the Latvian text. `about` is the one
  // subject; `mentions` are the places the guide actually covers. Both point
  // at Wikidata so the entity is unambiguous regardless of the language or the
  // spelling used on the page.
  const aboutNode = {
    '@type': 'TouristDestination',
    '@id': `${pageUrl}#destination`,
    name: subject.name,
    sameAs: [subject.wikidata, subject.wikipediaLv, subject.wikipediaEn],
  };

  const mentionNodes = mentions.map((mention) => ({
    '@type': 'Place',
    name: mention.name,
    sameAs: mention.wikidata,
  }));

  const article = {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    about: { '@id': aboutNode['@id'] },
    mentions: mentionNodes,
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [article, aboutNode, faqPage, ...imageObjects, personNode(), organizationNode()],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

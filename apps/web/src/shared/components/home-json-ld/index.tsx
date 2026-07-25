import { getSiteUrl } from '@/shared/utils/get-site-url';
import { organizationNode, personNode, websiteNode } from '@/shared/utils/json-ld-nodes';

import { faqItems } from '../section-faqs/index.data';

export function HomeJsonLd() {
  const siteUrl = getSiteUrl();

  const organization = organizationNode();
  const website = websiteNode();
  const person = personNode();

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${siteUrl}#faq`,
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [organization, website, person, faqPage],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

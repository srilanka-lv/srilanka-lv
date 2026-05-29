import { socialMediaItems } from '@/features/layout/components/navigation/index.data';
import { SITE_NAME } from '@/shared/constants/site-name';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { getSiteUrl } from '@/shared/utils/get-site-url';

import { faqItems } from '../section-faqs/index.data';

export function HomeJsonLd() {
  const siteUrl = getSiteUrl();

  const organization = {
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: SITE_NAME,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: getLogoUrl(),
    },
    sameAs: socialMediaItems.map((item) => item.href),
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    url: siteUrl,
    name: SITE_NAME,
    inLanguage: 'lv',
    publisher: { '@id': `${siteUrl}#organization` },
  };

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
    '@graph': [organization, website, faqPage],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

import { socialMediaItems } from '@/features/layout/components/navigation/index.data';
import { AUTHOR_NAME } from '@/shared/constants/author-name';
import { SITE_NAME } from '@/shared/constants/site-name';
import { getAuthorUrl } from '@/shared/utils/get-author-url';
import { getLogoUrl } from '@/shared/utils/get-logo-url';
import { getSiteUrl } from '@/shared/utils/get-site-url';

export const AUTHOR_DESCRIPTION = 'Latviete, kura kopš 2022. gada dzīvo Šrilankā';

export function personId(): string {
  return `${getSiteUrl()}#person`;
}

export function organizationId(): string {
  return `${getSiteUrl()}#organization`;
}

export function personNode() {
  return {
    '@type': 'Person',
    '@id': personId(),
    name: AUTHOR_NAME,
    description: AUTHOR_DESCRIPTION,
    url: getAuthorUrl(),
    sameAs: socialMediaItems.map((item) => item.href),
  };
}

export function organizationNode() {
  const siteUrl = getSiteUrl();

  return {
    '@type': 'Organization',
    '@id': organizationId(),
    name: SITE_NAME,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: getLogoUrl(),
    },
    founder: { '@id': personId() },
    sameAs: socialMediaItems.map((item) => item.href),
  };
}

export function websiteNode() {
  const siteUrl = getSiteUrl();

  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    url: siteUrl,
    name: SITE_NAME,
    inLanguage: 'lv',
    publisher: { '@id': organizationId() },
  };
}

import { getSiteUrl } from '@/shared/utils/get-site-url';
import { organizationNode, personId, personNode } from '@/shared/utils/json-ld-nodes';

type AboutJsonLdProps = {
  path: string;
  title: string;
};

export function AboutJsonLd({ path, title }: AboutJsonLdProps) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${path}`;

  const aboutPage = {
    '@type': 'AboutPage',
    '@id': `${pageUrl}#about`,
    url: pageUrl,
    inLanguage: 'lv',
    name: title,
    mainEntity: { '@id': personId() },
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [aboutPage, personNode(), organizationNode()],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

import type { Product } from '@/shared/components/products-page/index.data';
import { getSiteUrl } from '@/shared/utils/get-site-url';
import { organizationId, organizationNode, personNode } from '@/shared/utils/json-ld-nodes';

type ProductJsonLdProps = {
  product: Product;
  kind: 'trip' | 'service';
};

export function ProductJsonLd({ product, kind }: ProductJsonLdProps) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${product.href}`;

  const mainNode =
    kind === 'trip'
      ? {
          '@type': 'TouristTrip',
          '@id': `${pageUrl}#trip`,
          url: pageUrl,
          inLanguage: 'lv',
          name: product.title,
          description: product.description,
          provider: { '@id': organizationId() },
          ...(product.departureDate ? { departureTime: product.departureDate } : {}),
          ...(product.returnDate ? { arrivalTime: product.returnDate } : {}),
          ...(product.priceEur
            ? {
                offers: {
                  '@type': 'Offer',
                  price: product.priceEur,
                  priceCurrency: 'EUR',
                  url: pageUrl,
                },
              }
            : {}),
        }
      : {
          '@type': 'Product',
          '@id': `${pageUrl}#product`,
          url: pageUrl,
          inLanguage: 'lv',
          name: product.title,
          description: product.description,
          brand: { '@id': organizationId() },
        };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [mainNode, personNode(), organizationNode()],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

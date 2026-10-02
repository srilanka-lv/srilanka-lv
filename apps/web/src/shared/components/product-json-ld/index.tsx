import type { GuideFaqItem } from '@/shared/components/guide-faq';
import type { Product } from '@/shared/components/products-page/index.data';
import {
  GIRLS_TRIP_VIDEO_TITLE,
  GIRLS_TRIP_VIDEO_UPLOAD_DATE,
  GIRLS_TRIP_VIDEO_URL,
} from '@/shared/constants/girls-trip-video';
import { buildVideoObject } from '@/shared/utils/build-video-object';
import { getSiteUrl } from '@/shared/utils/get-site-url';
import { organizationId, organizationNode, personNode } from '@/shared/utils/json-ld-nodes';

type ProductJsonLdProps = {
  product: Product;
  kind: 'trip' | 'service';
  /** Questions and answers shown on the page, emitted as a FAQPage node. */
  faqs?: GuideFaqItem[];
};

export function ProductJsonLd({ product, kind, faqs }: ProductJsonLdProps) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${product.href}`;

  const video =
    kind === 'trip'
      ? buildVideoObject({
          url: GIRLS_TRIP_VIDEO_URL,
          name: GIRLS_TRIP_VIDEO_TITLE,
          description: product.description,
          uploadDate: GIRLS_TRIP_VIDEO_UPLOAD_DATE,
        })
      : null;

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
          ...(video ? { video } : {}),
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

  const faqPage =
    faqs && faqs.length > 0
      ? {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }
      : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [mainNode, ...(faqPage ? [faqPage] : []), personNode(), organizationNode()],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

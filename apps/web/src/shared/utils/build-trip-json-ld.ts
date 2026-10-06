import type { GuideFaqItem } from '@/shared/components/guide-faq';
import type { GirlsTripBookingPhase } from '@/shared/constants/girls-trip-booking';

import { answeredFaqs, buildGirlsTripOffer } from './girls-trip-seo';

type TripJsonLdInput = {
  pageUrl: string;
  siteUrl: string;
  name: string;
  description: string;
  phase: GirlsTripBookingPhase;
  departureDate?: string;
  returnDate?: string;
  /** A schema.org VideoObject, or null when the video cannot be described. */
  video: Record<string, unknown> | null;
  /** Site-relative image paths, the first being the lead photo. */
  images: string[];
  itinerary: { title: string; subject: string }[];
  faqs: GuideFaqItem[];
  providerId: string;
  /** Person and Organization nodes the trip points to. */
  nodes: Record<string, unknown>[];
};

/**
 * The girls trip as schema.org: one TouristTrip carrying the only Offer on
 * the page (no separate Product, so prices can never conflict), the
 * day-by-day plan as an ItemList, the video, and an FAQPage of the answered
 * questions only.
 */
export const buildTripJsonLd = ({
  pageUrl,
  siteUrl,
  name,
  description,
  phase,
  departureDate,
  returnDate,
  video,
  images,
  itinerary,
  faqs,
  providerId,
  nodes,
}: TripJsonLdInput) => {
  const trip = {
    '@type': 'TouristTrip',
    '@id': `${pageUrl}#trip`,
    url: pageUrl,
    inLanguage: 'lv',
    name,
    description,
    touristType: 'Sievietes',
    image: images.map((src) => `${siteUrl}${src}`),
    provider: { '@id': providerId },
    ...(departureDate ? { departureTime: departureDate } : {}),
    ...(returnDate ? { arrivalTime: returnDate } : {}),
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: itinerary.length,
      itemListElement: itinerary.map((day, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${day.title}: ${day.subject}`,
      })),
    },
    offers: buildGirlsTripOffer(phase, pageUrl),
    ...(video ? { video } : {}),
  };

  const questions = answeredFaqs(faqs);
  const faqPage =
    questions.length > 0
      ? {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: questions.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }
      : null;

  return {
    '@context': 'https://schema.org',
    '@graph': [trip, ...(faqPage ? [faqPage] : []), ...nodes],
  };
};

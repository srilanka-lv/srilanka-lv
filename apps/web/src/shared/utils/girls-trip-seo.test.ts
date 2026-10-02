import { describe, expect, it } from 'bun:test';

import { tripPageFaqs } from '@/shared/components/trip-page-faq-section/index.data';
import { tripItineraryDays } from '@/shared/components/trip-page-itinerary-section/index.data';
import {
  TRIP_GALLERY_GRID_SIZE,
  tripGalleryImageSrc,
  tripGalleryPhotos,
} from '@/shared/components/trip-page-photo-gallery/index.data';
import type { GirlsTripBookingPhase } from '@/shared/constants/girls-trip-booking';
import { TODO_GRIETA } from '@/shared/constants/todo-grieta';

import { buildTripJsonLd } from './build-trip-json-ld';
import { buildVideoObject } from './build-video-object';
import {
  GIRLS_TRIP_SEO_TITLE,
  answeredFaqs,
  buildGirlsTripDescription,
  buildGirlsTripOffer,
  hasPlaceholder,
} from './girls-trip-seo';

const phases: GirlsTripBookingPhase[] = ['early-bird', 'regular', 'closed'];
const TITLE_SUFFIX = ' | Šrilanka 26/27';
const PAGE_URL = 'https://srilanka.lv/produkti/meitenu-celojums-uz-srilanku';

const buildRealJsonLd = (phase: GirlsTripBookingPhase) =>
  buildTripJsonLd({
    pageUrl: PAGE_URL,
    siteUrl: 'https://srilanka.lv',
    name: '10 dienu piedzīvojums Šrilankā',
    description: buildGirlsTripDescription(phase),
    phase,
    departureDate: '2027-01-10',
    returnDate: '2027-01-19',
    video: buildVideoObject({
      url: 'https://youtu.be/A44GNYkbX5Y',
      name: 'Video',
      description: 'Par ceļojumu.',
      uploadDate: '2026-09-11',
      thumbnailUrl: 'https://srilanka.lv/images/srilanka-lv_meitenu-celojums_video-poster.webp',
    }),
    images: tripGalleryPhotos
      .slice(0, TRIP_GALLERY_GRID_SIZE)
      .map(({ slug }) => tripGalleryImageSrc(slug, 'lg')),
    itinerary: tripItineraryDays,
    faqs: tripPageFaqs,
    providerId: 'https://srilanka.lv#organization',
    nodes: [],
  });

type Node = Record<string, unknown> & { '@type'?: string };
const nodeOfType = (jsonLd: ReturnType<typeof buildRealJsonLd>, type: string) =>
  (jsonLd['@graph'] as Node[]).find((node) => node['@type'] === type);

describe('girls trip title and description', () => {
  it('fit in a search result', () => {
    expect(`${GIRLS_TRIP_SEO_TITLE}${TITLE_SUFFIX}`.length).toBeLessThanOrEqual(60);

    for (const phase of phases) {
      expect(buildGirlsTripDescription(phase).length).toBeLessThanOrEqual(155);
    }
  });

  it('name the dates and the price that applies today', () => {
    expect(buildGirlsTripDescription('early-bird')).toContain('10.–19. janvāris 2027');
    expect(buildGirlsTripDescription('early-bird')).toContain('1.575 € līdz 31. oktobrim');
    expect(buildGirlsTripDescription('regular')).toContain('1.700 €');
    expect(buildGirlsTripDescription('closed')).toContain('Pieteikšanās ir slēgta');
  });
});

describe('placeholders never reach metadata or structured data', () => {
  it('keeps the title and every description clean', () => {
    expect(hasPlaceholder(GIRLS_TRIP_SEO_TITLE)).toBe(false);
    for (const phase of phases) {
      expect(buildGirlsTripDescription(phase)).not.toContain(TODO_GRIETA);
    }
  });

  it('keeps the trip JSON-LD clean in every phase, with the real page data', () => {
    for (const phase of phases) {
      expect(JSON.stringify(buildRealJsonLd(phase))).not.toContain(TODO_GRIETA);
    }
  });

  it('leaves unanswered questions out of the FAQ and keeps the answered ones', () => {
    const answered = answeredFaqs(tripPageFaqs);
    const unanswered = tripPageFaqs.filter((faq) => hasPlaceholder(faq.answer));

    expect(answered.length + unanswered.length).toBe(tripPageFaqs.length);
    expect(answered.map((faq) => faq.id)).toContain('come-alone');
    for (const faq of unanswered) {
      expect(answered).not.toContain(faq);
    }
  });
});

describe('the trip offer', () => {
  it('carries the early-bird price until 31 October and the deadline', () => {
    expect(buildGirlsTripOffer('early-bird', PAGE_URL)).toEqual({
      '@type': 'Offer',
      price: '1575',
      priceCurrency: 'EUR',
      url: PAGE_URL,
      availability: 'https://schema.org/LimitedAvailability',
      priceValidUntil: '2026-10-31',
      validThrough: '2026-11-30T21:59:59.000Z',
    });
  });

  it('carries the full price without a price end date after the early-bird', () => {
    const offer = buildGirlsTripOffer('regular', PAGE_URL);

    expect(offer.price).toBe('1700');
    expect(offer).not.toHaveProperty('priceValidUntil');
    expect(offer.availability).toBe('https://schema.org/LimitedAvailability');
  });

  it('is marked discontinued once bookings close', () => {
    expect(buildGirlsTripOffer('closed', PAGE_URL).availability).toBe(
      'https://schema.org/Discontinued',
    );
  });
});

describe('buildTripJsonLd', () => {
  it('has one TouristTrip with the offer and no separate Product', () => {
    const graph = buildRealJsonLd('early-bird')['@graph'] as Node[];

    expect(graph.filter((node) => node['@type'] === 'TouristTrip')).toHaveLength(1);
    expect(graph.some((node) => node['@type'] === 'Product')).toBe(false);
  });

  it('lists the ten days as the itinerary', () => {
    const trip = nodeOfType(buildRealJsonLd('regular'), 'TouristTrip') as {
      itinerary: { numberOfItems: number; itemListElement: { position: number; name: string }[] };
    };

    expect(trip.itinerary.numberOfItems).toBe(10);
    expect(trip.itinerary.itemListElement[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'Diena 1: Ielidošana Kolombo, iekārtošanās',
    });
  });

  it('carries a VideoObject with every field Google requires', () => {
    const trip = nodeOfType(buildRealJsonLd('regular'), 'TouristTrip') as {
      video: Record<string, string>;
    };

    for (const field of ['name', 'description', 'thumbnailUrl', 'uploadDate']) {
      expect(trip.video[field]).toBeTruthy();
    }
    expect(trip.video.embedUrl ?? trip.video.contentUrl).toBeTruthy();
    expect(trip.video.thumbnailUrl).toEndWith('video-poster.webp');
  });

  it('builds the FAQPage from answered questions only', () => {
    const faqPage = nodeOfType(buildRealJsonLd('regular'), 'FAQPage') as {
      mainEntity: { name: string }[];
    };

    expect(faqPage.mainEntity).toHaveLength(answeredFaqs(tripPageFaqs).length);
  });
});

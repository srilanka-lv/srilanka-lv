import type { FunctionComponent } from 'react';

import type { Product } from '@/shared/components/products-page/index.data';
import { tripPageFaqs } from '@/shared/components/trip-page-faq-section/index.data';
import { tripItineraryDays } from '@/shared/components/trip-page-itinerary-section/index.data';
import {
  TRIP_GALLERY_GRID_SIZE,
  tripGalleryImageSrc,
  tripGalleryPhotos,
} from '@/shared/components/trip-page-photo-gallery/index.data';
import type { GirlsTripBookingPhase } from '@/shared/constants/girls-trip-booking';
import {
  GIRLS_TRIP_VIDEO_POSTER_SRC,
  GIRLS_TRIP_VIDEO_TITLE,
  GIRLS_TRIP_VIDEO_UPLOAD_DATE,
  GIRLS_TRIP_VIDEO_URL,
} from '@/shared/constants/girls-trip-video';
import { buildTripJsonLd } from '@/shared/utils/build-trip-json-ld';
import { buildVideoObject } from '@/shared/utils/build-video-object';
import { getSiteUrl } from '@/shared/utils/get-site-url';
import { organizationId, organizationNode, personNode } from '@/shared/utils/json-ld-nodes';

type TripJsonLdProps = {
  product: Product;
  /** The booking phase at render time, which sets the offer. */
  phase: GirlsTripBookingPhase;
};

/** Structured data for the girls trip page; see buildTripJsonLd. */
export const TripJsonLd: FunctionComponent<TripJsonLdProps> = ({ product, phase }) => {
  const siteUrl = getSiteUrl();

  const jsonLd = buildTripJsonLd({
    pageUrl: `${siteUrl}${product.href}`,
    siteUrl,
    name: product.title,
    description: product.description,
    phase,
    departureDate: product.departureDate,
    returnDate: product.returnDate,
    video: buildVideoObject({
      url: GIRLS_TRIP_VIDEO_URL,
      name: GIRLS_TRIP_VIDEO_TITLE,
      description: product.description,
      uploadDate: GIRLS_TRIP_VIDEO_UPLOAD_DATE,
      thumbnailUrl: `${siteUrl}${GIRLS_TRIP_VIDEO_POSTER_SRC}`,
    }),
    images: [
      ...(product.ogImage ? [product.ogImage.url] : []),
      ...tripGalleryPhotos
        .slice(0, TRIP_GALLERY_GRID_SIZE)
        .map(({ slug }) => tripGalleryImageSrc(slug, 'lg')),
    ],
    itinerary: tripItineraryDays,
    faqs: tripPageFaqs,
    providerId: organizationId(),
    nodes: [personNode(), organizationNode()],
  });

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

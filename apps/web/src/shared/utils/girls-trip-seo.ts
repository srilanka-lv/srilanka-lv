import type { GuideFaqItem } from '@/shared/components/guide-faq';
import {
  GIRLS_TRIP_BOOKING_CLOSES_AT,
  GIRLS_TRIP_BOOKING_LAST_DAY_DISPLAY,
  GIRLS_TRIP_EARLY_BIRD_LAST_DAY,
  GIRLS_TRIP_EARLY_BIRD_LAST_DAY_DISPLAY,
  GIRLS_TRIP_GUESTS,
  type GirlsTripBookingPhase,
  formatEur,
  getGirlsTripPriceEur,
} from '@/shared/constants/girls-trip-booking';
import { TODO_GRIETA } from '@/shared/constants/todo-grieta';

/**
 * The page title before the root layout's " | Šrilanka 26/27" suffix: 41
 * characters, 58 with it, so it fits the ~60 a search result shows. The
 * suffix already carries "Šrilanka" and the season, so neither repeats here.
 */
export const GIRLS_TRIP_SEO_TITLE = 'Ceļojums tikai meitenēm: 10.–19. janvāris';

const descriptionLead = `10 dienas Šrilankā tikai meitenēm, 10.–19. janvāris 2027. ${GIRLS_TRIP_GUESTS} meitenes un es kā Tava latviešu gide.`;

/** The meta description for today's booking phase; at most 155 characters. */
export const buildGirlsTripDescription = (phase: GirlsTripBookingPhase): string => {
  const price = formatEur(getGirlsTripPriceEur(phase));

  if (phase === 'early-bird') {
    return `${descriptionLead} Agrā cena ${price} līdz ${GIRLS_TRIP_EARLY_BIRD_LAST_DAY_DISPLAY}.`;
  }

  if (phase === 'regular') {
    return `${descriptionLead} ${price}, pieteikšanās līdz ${GIRLS_TRIP_BOOKING_LAST_DAY_DISPLAY}.`;
  }

  return `${descriptionLead} Pieteikšanās ir slēgta.`;
};

/** True when a string still carries an unfilled placeholder. */
export const hasPlaceholder = (value: string): boolean => value.includes(`${TODO_GRIETA}:`);

/**
 * The FAQ items fit for search: an answer that still waits on Grieta or the
 * partner would put placeholder text into the FAQPage rich result, so it
 * stays out until it is filled.
 */
export const answeredFaqs = <T extends GuideFaqItem>(faqs: T[]): T[] =>
  faqs.filter((faq) => !hasPlaceholder(faq.question) && !hasPlaceholder(faq.answer));

/**
 * The trip's schema.org Offer for today's phase. The early-bird price is
 * valid until 31 October; the offer itself until bookings close. Seven places
 * make it LimitedAvailability; after the deadline it is Discontinued.
 */
export const buildGirlsTripOffer = (phase: GirlsTripBookingPhase, url: string) => ({
  '@type': 'Offer',
  price: String(getGirlsTripPriceEur(phase)),
  priceCurrency: 'EUR',
  url,
  availability:
    phase === 'closed'
      ? 'https://schema.org/Discontinued'
      : 'https://schema.org/LimitedAvailability',
  ...(phase === 'early-bird' ? { priceValidUntil: GIRLS_TRIP_EARLY_BIRD_LAST_DAY } : {}),
  // The last second before bookings close in Riga.
  validThrough: new Date(Date.parse(GIRLS_TRIP_BOOKING_CLOSES_AT) - 1000).toISOString(),
});

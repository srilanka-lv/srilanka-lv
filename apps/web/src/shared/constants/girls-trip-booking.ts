/**
 * Price, early-bird and booking deadline for the girls trip, in one place.
 * Every amount and date the trip page shows is derived from these, and the
 * phase is worked out at request time (and again in the browser), so the
 * early-bird ends and bookings close at the cut-off without a redeploy.
 */

/** Per-person trip price in EUR, without the early-bird discount. */
export const GIRLS_TRIP_PRICE_EUR = 1700;

/** EUR off the trip price for bookings made before the early-bird cut-off. */
export const GIRLS_TRIP_EARLY_BIRD_DISCOUNT_EUR = 125;

export const GIRLS_TRIP_EARLY_BIRD_PRICE_EUR =
  GIRLS_TRIP_PRICE_EUR - GIRLS_TRIP_EARLY_BIRD_DISCOUNT_EUR;

/** Paid online through the partner store to reserve a place; part of the trip price. */
export const GIRLS_TRIP_RESERVATION_EUR = 400;

/** Guests in the group, not counting Grieta. */
export const GIRLS_TRIP_GUESTS = 7;

/** The time zone the cut-offs are set in. */
export const GIRLS_TRIP_TIME_ZONE = 'Europe/Riga';

/**
 * The early-bird runs to the end of 31 October 2026 in Riga (EET, UTC+2 once
 * summer time ends on 25 October), so it is over from midnight on 1 November.
 * Written as an instant so the browser needs no time zone database; the tests
 * check it against Europe/Riga.
 */
export const GIRLS_TRIP_EARLY_BIRD_ENDS_AT = '2026-11-01T00:00:00+02:00';

/** Bookings close at the end of 30 November 2026 in Riga. */
export const GIRLS_TRIP_BOOKING_CLOSES_AT = '2026-12-01T00:00:00+02:00';

/** The same cut-offs as the page words them. */
export const GIRLS_TRIP_EARLY_BIRD_LAST_DAY_DISPLAY = '31. oktobrim';
export const GIRLS_TRIP_BOOKING_LAST_DAY_DISPLAY = '30. novembrim';
/** Short form for the slim sticky bar on phones. */
export const GIRLS_TRIP_EARLY_BIRD_LAST_DAY_SHORT_DISPLAY = '31.10.';

/**
 * Cheapest return flight Riga–Colombo for January, rounded. From the site's
 * own flight data (`features/serpapi/data/flight-data.json`, 2027-01: about
 * 375 € one way).
 */
export const GIRLS_TRIP_FLIGHTS_FROM_EUR = 750;

export type GirlsTripBookingPhase = 'early-bird' | 'regular' | 'closed';

const earlyBirdEndsAtMs = Date.parse(GIRLS_TRIP_EARLY_BIRD_ENDS_AT);
const bookingClosesAtMs = Date.parse(GIRLS_TRIP_BOOKING_CLOSES_AT);

export const getGirlsTripBookingPhase = (nowMs: number): GirlsTripBookingPhase => {
  if (nowMs < earlyBirdEndsAtMs) {
    return 'early-bird';
  }

  if (nowMs < bookingClosesAtMs) {
    return 'regular';
  }

  return 'closed';
};

/** Milliseconds until the phase next changes, or null once bookings are closed. */
export const getMsUntilNextGirlsTripPhase = (nowMs: number): number | null => {
  if (nowMs < earlyBirdEndsAtMs) {
    return earlyBirdEndsAtMs - nowMs;
  }

  if (nowMs < bookingClosesAtMs) {
    return bookingClosesAtMs - nowMs;
  }

  return null;
};

export const getGirlsTripPriceEur = (phase: GirlsTripBookingPhase): number =>
  phase === 'early-bird' ? GIRLS_TRIP_EARLY_BIRD_PRICE_EUR : GIRLS_TRIP_PRICE_EUR;

/** "1.575 €": dot thousands separator, as the rest of the site writes prices. */
export const formatEur = (amount: number): string =>
  `${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} €`;

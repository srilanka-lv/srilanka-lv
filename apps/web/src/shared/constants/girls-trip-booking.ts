/**
 * Price, early-bird and booking deadline for the girls trip, in one place.
 * Every amount and date the trip page shows is derived from these, and the
 * phase is worked out at request time (and again in the browser), so the
 * early-bird ends and bookings close at the cut-off without a redeploy.
 */

/** Per-person trip price in EUR, without the early-bird discount. */
export const GIRLS_TRIP_PRICE_EUR = 1700;

/** EUR off the trip price for bookings made before the early-bird cut-off. */
export const GIRLS_TRIP_EARLY_BIRD_DISCOUNT_EUR = 100;

export const GIRLS_TRIP_EARLY_BIRD_PRICE_EUR =
  GIRLS_TRIP_PRICE_EUR - GIRLS_TRIP_EARLY_BIRD_DISCOUNT_EUR;

/** Paid online through the partner store to reserve a place; part of the trip price. */
export const GIRLS_TRIP_RESERVATION_EUR = 400;

/**
 * Cancellation terms from Ceļo ar Mariku. A guest who cancels gets the
 * reservation back minus this administrative fee; from the no-refund day on
 * (45 days before departure) the reservation is not refunded at all. If the
 * organisers cancel the trip, the whole reservation is refunded.
 */
export const GIRLS_TRIP_CANCELLATION_FEE_EUR = 150;
export const GIRLS_TRIP_NO_REFUND_DAYS_BEFORE_DEPARTURE = 45;
export const GIRLS_TRIP_NO_REFUND_FROM_DAY = '2026-11-26';
/** The no-refund day as the page words it ("no 26. novembra"). */
export const GIRLS_TRIP_NO_REFUND_FROM_DISPLAY = '26. novembra';

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

/** The last day of each phase in Riga, as ISO dates for structured data. */
export const GIRLS_TRIP_EARLY_BIRD_LAST_DAY = '2026-10-31';
export const GIRLS_TRIP_BOOKING_LAST_DAY = '2026-11-30';

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

/** Trip length in days. */
export const GIRLS_TRIP_DAYS = 10;

/** Lunch and dinner per day, roughly; breakfast is in the price. From Grieta. */
export const GIRLS_TRIP_MEALS_PER_DAY_EUR = 30;

/** Travel insurance for the 10 days, roughly. From Grieta. */
export const GIRLS_TRIP_INSURANCE_EUR = 30;

/**
 * Approximate Sri Lankan rupees per euro for the balance paid on arrival,
 * from Grieta's own figure (1.200 € is about 445.000 LKR). The page always
 * says the rate may change.
 */
export const GIRLS_TRIP_LKR_PER_EUR = 445_000 / 1_200;

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

/** What is paid to Grieta on arrival: the trip price less the reservation. */
export const getGirlsTripBalanceEur = (phase: GirlsTripBookingPhase): number =>
  getGirlsTripPriceEur(phase) - GIRLS_TRIP_RESERVATION_EUR;

/** The balance in rupees at the approximate rate, rounded to the nearest thousand. */
export const getGirlsTripBalanceLkr = (phase: GirlsTripBookingPhase): number =>
  Math.round((getGirlsTripBalanceEur(phase) * GIRLS_TRIP_LKR_PER_EUR) / 1000) * 1000;

/**
 * The example total for the whole trip: the price, flights, lunch and dinner
 * for every day, and insurance, rounded to the nearest hundred.
 */
export const getGirlsTripTotalEur = (phase: GirlsTripBookingPhase): number =>
  Math.round(
    (getGirlsTripPriceEur(phase) +
      GIRLS_TRIP_FLIGHTS_FROM_EUR +
      GIRLS_TRIP_DAYS * GIRLS_TRIP_MEALS_PER_DAY_EUR +
      GIRLS_TRIP_INSURANCE_EUR) /
      100,
  ) * 100;

const withThousandsDots = (amount: number): string =>
  String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/**
 * "1.600 €": dot thousands separator, as the rest of the site writes prices,
 * and a non-breaking space so "€" never wraps onto a line of its own.
 */
export const formatEur = (amount: number): string => `${withThousandsDots(amount)}\u00a0€`;

/** "445.000": rupees, written the same way, without a currency sign. */
export const formatLkr = (amount: number): string => withThousandsDots(amount);

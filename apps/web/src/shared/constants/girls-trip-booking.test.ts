import { describe, expect, it } from 'bun:test';
import { Temporal } from '@js-temporal/polyfill';

import {
  GIRLS_TRIP_BOOKING_CLOSES_AT,
  GIRLS_TRIP_BOOKING_LAST_DAY,
  GIRLS_TRIP_EARLY_BIRD_ENDS_AT,
  GIRLS_TRIP_EARLY_BIRD_LAST_DAY,
  GIRLS_TRIP_EARLY_BIRD_PRICE_EUR,
  GIRLS_TRIP_NO_REFUND_DAYS_BEFORE_DEPARTURE,
  GIRLS_TRIP_NO_REFUND_FROM_DAY,
  GIRLS_TRIP_PRICE_EUR,
  GIRLS_TRIP_TIME_ZONE,
  formatEur,
  formatLkr,
  getGirlsTripBalanceEur,
  getGirlsTripBalanceLkr,
  getGirlsTripBookingPhase,
  getGirlsTripPriceEur,
  getGirlsTripTotalEur,
  getMsUntilNextGirlsTripPhase,
} from './girls-trip-booking';
import { GIRLS_TRIP_DEPARTURE_DATE } from './girls-trip-dates';

// A wall-clock time in Riga as epoch milliseconds.
const riga = (dateTime: string): number =>
  Temporal.PlainDateTime.from(dateTime).toZonedDateTime(GIRLS_TRIP_TIME_ZONE).epochMilliseconds;

describe('girls trip cut-offs', () => {
  it('end the early-bird at midnight after 31 October in Riga', () => {
    expect(Date.parse(GIRLS_TRIP_EARLY_BIRD_ENDS_AT)).toBe(riga('2026-11-01T00:00'));
  });

  it('close bookings at midnight after 30 November in Riga', () => {
    expect(Date.parse(GIRLS_TRIP_BOOKING_CLOSES_AT)).toBe(riga('2026-12-01T00:00'));
  });
});

describe('girls trip last days', () => {
  it('are the Riga days just before each cut-off', () => {
    const lastDay = (instant: string) =>
      Temporal.Instant.from(instant)
        .subtract({ seconds: 1 })
        .toZonedDateTimeISO(GIRLS_TRIP_TIME_ZONE)
        .toPlainDate()
        .toString();

    expect(lastDay(GIRLS_TRIP_EARLY_BIRD_ENDS_AT)).toBe(GIRLS_TRIP_EARLY_BIRD_LAST_DAY);
    expect(lastDay(GIRLS_TRIP_BOOKING_CLOSES_AT)).toBe(GIRLS_TRIP_BOOKING_LAST_DAY);
  });
});

describe('getGirlsTripBookingPhase', () => {
  it('is early-bird through October', () => {
    expect(getGirlsTripBookingPhase(riga('2026-10-02T12:00'))).toBe('early-bird');
    expect(getGirlsTripBookingPhase(riga('2026-10-31T23:59:59.999'))).toBe('early-bird');
  });

  it('switches to the regular price on 1 November in Riga', () => {
    expect(getGirlsTripBookingPhase(riga('2026-11-01T00:00'))).toBe('regular');
    expect(getGirlsTripBookingPhase(riga('2026-11-30T23:59:59.999'))).toBe('regular');
  });

  it('uses Riga time, not UTC: 23:30 UTC on 31 October is already November in Riga', () => {
    expect(getGirlsTripBookingPhase(Date.parse('2026-10-31T21:59:59Z'))).toBe('early-bird');
    expect(getGirlsTripBookingPhase(Date.parse('2026-10-31T23:30:00Z'))).toBe('regular');
  });

  it('closes bookings from 1 December in Riga', () => {
    expect(getGirlsTripBookingPhase(riga('2026-12-01T00:00'))).toBe('closed');
    expect(getGirlsTripBookingPhase(riga('2027-01-10T08:00'))).toBe('closed');
  });
});

describe('getMsUntilNextGirlsTripPhase', () => {
  it('counts down to the early-bird cut-off, then to the booking deadline', () => {
    expect(getMsUntilNextGirlsTripPhase(riga('2026-10-31T23:00'))).toBe(60 * 60 * 1000);
    expect(getMsUntilNextGirlsTripPhase(riga('2026-11-30T23:59'))).toBe(60 * 1000);
  });

  it('is null once bookings are closed', () => {
    expect(getMsUntilNextGirlsTripPhase(riga('2026-12-01T00:00'))).toBeNull();
  });
});

describe('getGirlsTripPriceEur', () => {
  it('takes 100 € off the 1.700 € price during the early-bird', () => {
    expect(GIRLS_TRIP_PRICE_EUR).toBe(1700);
    expect(GIRLS_TRIP_EARLY_BIRD_PRICE_EUR).toBe(1600);
    expect(getGirlsTripPriceEur('early-bird')).toBe(1600);
  });

  it('is the full price after the early-bird', () => {
    expect(getGirlsTripPriceEur('regular')).toBe(1700);
    expect(getGirlsTripPriceEur('closed')).toBe(1700);
  });
});

describe('formatEur', () => {
  it('writes amounts the way the site does', () => {
    expect(formatEur(400)).toBe('400\u00a0€');
    expect(formatEur(1600)).toBe('1.600\u00a0€');
    expect(formatEur(12500)).toBe('12.500\u00a0€');
  });
});

describe('girls trip cancellation terms', () => {
  it('stop refunding the reservation 45 days before departure', () => {
    expect(
      Temporal.PlainDate.from(GIRLS_TRIP_NO_REFUND_FROM_DAY)
        .until(GIRLS_TRIP_DEPARTURE_DATE)
        .total({ unit: 'days' }),
    ).toBe(GIRLS_TRIP_NO_REFUND_DAYS_BEFORE_DEPARTURE);
  });

  it('start the no-refund window before bookings close', () => {
    expect(GIRLS_TRIP_NO_REFUND_FROM_DAY < GIRLS_TRIP_BOOKING_LAST_DAY).toBe(true);
  });
});

describe('the balance and the example total', () => {
  it('leave the reservation out of the balance paid on arrival', () => {
    expect(getGirlsTripBalanceEur('early-bird')).toBe(1200);
    expect(getGirlsTripBalanceEur('regular')).toBe(1300);
  });

  it('convert the balance to rupees at Grieta’s rate, to the nearest thousand', () => {
    expect(getGirlsTripBalanceLkr('early-bird')).toBe(445_000);
    expect(getGirlsTripBalanceLkr('regular')).toBe(482_000);
    expect(formatLkr(445_000)).toBe('445.000');
  });

  it('add flights, meals and insurance to the price, rounded to the hundred', () => {
    expect(getGirlsTripTotalEur('early-bird')).toBe(2700);
    expect(getGirlsTripTotalEur('regular')).toBe(2800);
  });
});

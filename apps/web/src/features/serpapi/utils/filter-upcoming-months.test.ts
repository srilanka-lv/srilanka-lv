import { describe, expect, it } from 'bun:test';
import { Temporal } from '@js-temporal/polyfill';

import type { FlightDataModel, FlightDateModel } from '../models/flight-data-model';
import { filterUpcomingMonths, findCheapestUpcomingMonth } from './filter-upcoming-months';

const buildDate = (date: string, price: number): FlightDateModel => ({
  date,
  cheapestFlight: {
    price,
    totalDuration: 1340,
    stops: 2,
    flights: [],
    layovers: [],
  },
});

const buildData = (): FlightDataModel => ({
  queriedOn: '2026-05-23',
  months: [
    {
      month: '2026-07',
      label: 'July 2026',
      averagePrice: 640,
      lowestPrice: 594,
      dates: [buildDate('2026-07-06', 602), buildDate('2026-07-13', 594)],
    },
    {
      month: '2026-08',
      label: 'August 2026',
      averagePrice: 543,
      lowestPrice: 382,
      dates: [
        buildDate('2026-08-03', 543),
        buildDate('2026-08-24', 382),
        buildDate('2026-08-31', 601),
      ],
    },
    {
      month: '2026-09',
      label: 'September 2026',
      averagePrice: 382,
      lowestPrice: 382,
      dates: [buildDate('2026-09-07', 382)],
    },
  ],
});

describe('filterUpcomingMonths', () => {
  it('drops past dates and keeps today', () => {
    const months = filterUpcomingMonths(buildData(), Temporal.PlainDate.from('2026-08-24'));

    expect(months.map((month) => month.month)).toEqual(['2026-08', '2026-09']);
    expect(months[0]?.dates.map((entry) => entry.date)).toEqual(['2026-08-24', '2026-08-31']);
  });

  it('drops months whose dates are all past', () => {
    const months = filterUpcomingMonths(buildData(), Temporal.PlainDate.from('2026-07-26'));

    expect(months.map((month) => month.month)).toEqual(['2026-08', '2026-09']);
  });

  it('recomputes lowest and average price from surviving dates', () => {
    const months = filterUpcomingMonths(buildData(), Temporal.PlainDate.from('2026-08-24'));

    expect(months[0]?.lowestPrice).toBe(382);
    expect(months[0]?.averagePrice).toBe(492);
  });

  it('returns an empty array when everything is past', () => {
    expect(filterUpcomingMonths(buildData(), Temporal.PlainDate.from('2027-01-01'))).toEqual([]);
  });
});

describe('findCheapestUpcomingMonth', () => {
  it('returns the month with the lowest price, earliest on a tie', () => {
    const months = filterUpcomingMonths(buildData(), Temporal.PlainDate.from('2026-07-26'));

    // 2026-08 and 2026-09 both bottom out at 382; earliest wins
    expect(findCheapestUpcomingMonth(months)).toBe('2026-08');
  });

  it('returns undefined for an empty list', () => {
    expect(findCheapestUpcomingMonth([])).toBeUndefined();
  });
});

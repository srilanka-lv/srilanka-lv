import { Temporal } from '@js-temporal/polyfill';

import type { FlightDataModel, FlightMonthModel } from '../models/flight-data-model';

export const filterUpcomingMonths = (
  data: FlightDataModel,
  today: Temporal.PlainDate,
): FlightMonthModel[] => {
  const months: FlightMonthModel[] = [];

  for (const month of data.months) {
    const dates = month.dates.filter((entry) => {
      return Temporal.PlainDate.compare(Temporal.PlainDate.from(entry.date), today) >= 0;
    });

    if (dates.length === 0) {
      continue;
    }

    const prices = dates.map((entry) => entry.cheapestFlight.price);

    months.push({
      ...month,
      dates,
      lowestPrice: Math.min(...prices),
      averagePrice: Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length),
    });
  }

  return months;
};

export const findCheapestUpcomingMonth = (months: FlightMonthModel[]): string | undefined => {
  let cheapest: FlightMonthModel | undefined;

  for (const month of months) {
    if (!cheapest || month.lowestPrice < cheapest.lowestPrice) {
      cheapest = month;
    }
  }

  return cheapest?.month;
};

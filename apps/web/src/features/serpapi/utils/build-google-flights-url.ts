const GOOGLE_FLIGHTS_BASE_URL = 'https://www.google.com/travel/flights';

const buildUrl = (query: string): string => {
  const params = new URLSearchParams({ q: query, hl: 'lv', curr: 'EUR' });

  return `${GOOGLE_FLIGHTS_BASE_URL}?${params.toString()}`;
};

export const buildGoogleFlightsUrl = (departureDate: string): string => {
  return buildUrl(`Flights from RIX to CMB on ${departureDate} one way`);
};

export const buildGoogleFlightsRouteUrl = (): string => {
  return buildUrl('Flights from RIX to CMB');
};

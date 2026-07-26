import { describe, expect, it } from 'bun:test';

import { buildGoogleFlightsRouteUrl, buildGoogleFlightsUrl } from './build-google-flights-url';

describe('buildGoogleFlightsUrl', () => {
  it('builds a one-way RIX to CMB deep link for a date', () => {
    expect(buildGoogleFlightsUrl('2026-10-05')).toBe(
      'https://www.google.com/travel/flights?q=Flights+from+RIX+to+CMB+on+2026-10-05+one+way&hl=lv&curr=EUR',
    );
  });
});

describe('buildGoogleFlightsRouteUrl', () => {
  it('builds a route-level link without a date', () => {
    expect(buildGoogleFlightsRouteUrl()).toBe(
      'https://www.google.com/travel/flights?q=Flights+from+RIX+to+CMB&hl=lv&curr=EUR',
    );
  });
});

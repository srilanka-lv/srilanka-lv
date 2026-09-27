import { describe, expect, it } from 'bun:test';

import { buildKiwiFlightsRouteUrl, buildKiwiFlightsUrl } from './build-kiwi-flights-url';

describe('buildKiwiFlightsUrl', () => {
  it('builds a Travelpayouts-tracked Kiwi RIX to CMB deep link for a date', () => {
    expect(buildKiwiFlightsUrl('2026-10-05')).toBe(
      'https://c111.travelpayouts.com/click?shmarker=721453.flight-row&promo_id=3791&source_type=customlink&type=click&custom_url=https%3A%2F%2Fwww.kiwi.com%2Fdeep%3Ffrom%3DRIX%26to%3DCMB%26departure%3D2026-10-05%26currency%3DEUR',
    );
  });
});

describe('buildKiwiFlightsRouteUrl', () => {
  it('builds a route-level link without a date', () => {
    expect(buildKiwiFlightsRouteUrl()).toBe(
      'https://c111.travelpayouts.com/click?shmarker=721453.flight-stale&promo_id=3791&source_type=customlink&type=click&custom_url=https%3A%2F%2Fwww.kiwi.com%2Fdeep%3Ffrom%3DRIX%26to%3DCMB%26currency%3DEUR',
    );
  });
});

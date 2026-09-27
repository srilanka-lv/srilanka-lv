const KIWI_DEEP_LINK_BASE_URL = 'https://www.kiwi.com/deep';
const TRAVELPAYOUTS_CLICK_URL = 'https://c111.travelpayouts.com/click';
const TRAVELPAYOUTS_MARKER = '721453';
const KIWI_PROMO_ID = '3791';

// Sub IDs split Kiwi clicks by placement in Travelpayouts reports.
type KiwiLinkPlacement = 'flight-row' | 'flight-stale';

const buildAffiliateUrl = (
  kiwiParams: Record<string, string>,
  placement: KiwiLinkPlacement,
): string => {
  const kiwiUrl = `${KIWI_DEEP_LINK_BASE_URL}?${new URLSearchParams({
    from: 'RIX',
    to: 'CMB',
    ...kiwiParams,
    currency: 'EUR',
  }).toString()}`;
  const params = new URLSearchParams({
    shmarker: `${TRAVELPAYOUTS_MARKER}.${placement}`,
    promo_id: KIWI_PROMO_ID,
    source_type: 'customlink',
    type: 'click',
    custom_url: kiwiUrl,
  });

  return `${TRAVELPAYOUTS_CLICK_URL}?${params.toString()}`;
};

export const buildKiwiFlightsUrl = (departureDate: string): string => {
  return buildAffiliateUrl({ departure: departureDate }, 'flight-row');
};

export const buildKiwiFlightsRouteUrl = (): string => {
  return buildAffiliateUrl({}, 'flight-stale');
};

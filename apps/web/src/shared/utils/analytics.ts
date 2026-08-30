export type UmamiEventData = Record<string, string | number>;

export type AnalyticsEventName =
  | 'outbound-link'
  | 'product-cta'
  | 'contact'
  | 'flight-month-select';

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: UmamiEventData) => Promise<void>;
    };
    zaraz?: {
      track: (event: string, data?: UmamiEventData) => Promise<void>;
    };
  }
}

// Resolves when the beacons are sent so callers that navigate away can await it;
// resolves immediately when the trackers are absent (dev, staging, blocked).
// Zaraz forwards events to the server-side tools configured in the Cloudflare
// dashboard (e.g. Meta Conversions API); without a matching trigger there,
// the zaraz.track call is a no-op.
export const trackEvent = async (
  name: AnalyticsEventName,
  data?: UmamiEventData,
): Promise<void> => {
  if (typeof window === 'undefined') {
    return;
  }

  const beacons: Promise<void>[] = [];

  if (window.umami) {
    beacons.push(window.umami.track(name, data));
  }

  if (window.zaraz) {
    beacons.push(window.zaraz.track(name, data));
  }

  // Tracking must never break the interaction that triggered it.
  await Promise.allSettled(beacons);
};

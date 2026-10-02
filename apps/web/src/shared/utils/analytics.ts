export type UmamiEventData = Record<string, string | number>;

export type AnalyticsEventName =
  | 'outbound-link'
  | 'product-cta'
  | 'contact'
  | 'contact-handoff'
  | 'social-profile'
  | 'flight-month-select'
  | 'flight-date-expand'
  | 'flight-booking-click'
  | 'video-play'
  // Ask Grieta contact drawer funnel (src/features/ask-grieta/utils/track.ts).
  | 'ask-cta-view'
  | 'ask-open'
  | 'ask-expand'
  | 'ask-close'
  | 'ask-product-select'
  | 'ask-field-start'
  | 'ask-country-select'
  | 'ask-submit'
  | 'ask-direct-click'
  // Girls trip photo gallery (src/shared/components/trip-page-photo-gallery).
  | 'trip-gallery-open'
  | 'trip-gallery-view'
  | 'trip-gallery-close'
  // Girls trip page engagement (src/shared/utils/trip-engagement.ts).
  | 'trip-section-view'
  | 'trip-section-read'
  | 'trip-scroll-depth'
  | 'trip-faq-open';

export type TrackEventOptions = {
  /**
   * Also forward to Zaraz (default true). Funnel events no Zaraz tool needs
   * turn this off: every zaraz.track call re-runs the trigger that injects
   * Umami, so skipping it avoids loading another tracker copy.
   */
  zaraz?: boolean;
};

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
// the zaraz.track call is a no-op. Each call also re-evaluates the trigger that
// injects Umami; UmamiSingleInstanceScript keeps re-injected copies from
// counting twice.
export const trackEvent = async (
  name: AnalyticsEventName,
  data?: UmamiEventData,
  { zaraz = true }: TrackEventOptions = {},
): Promise<void> => {
  if (typeof window === 'undefined') {
    return;
  }

  const beacons: Promise<void>[] = [];

  if (window.umami) {
    beacons.push(window.umami.track(name, data));
  }

  if (zaraz && window.zaraz) {
    beacons.push(window.zaraz.track(name, data));
  }

  // Tracking must never break the interaction that triggered it.
  await Promise.allSettled(beacons);
};

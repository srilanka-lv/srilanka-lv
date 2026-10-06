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
  | 'ask-lead'
  | 'ask-direct-click'
  // Girls trip photo gallery (src/shared/components/trip-page-photo-gallery).
  | 'trip-gallery-open'
  | 'trip-gallery-view'
  | 'trip-gallery-close'
  // Girls trip page engagement (src/shared/utils/trip-engagement.ts).
  | 'trip-section-view'
  | 'trip-section-read'
  | 'trip-scroll-depth'
  | 'trip-faq-open'
  | 'trip-itinerary-open'
  | 'trip-booking-details-open'
  | 'trip-anchor-click';

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

/** How often to look for the Umami tracker while events are waiting for it. */
export const UMAMI_POLL_MS = 250;

/** Waiting events are dropped if the tracker has not appeared by then (blocked, dev). */
export const UMAMI_WAIT_LIMIT_MS = 15_000;

type PendingEvent = { name: AnalyticsEventName; data?: UmamiEventData };

let pending: PendingEvent[] = [];
let pollTimer: ReturnType<typeof setInterval> | null = null;
let waitStartedAt = 0;

const stopWaiting = () => {
  if (pollTimer !== null) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
};

// Sends the waiting events in the order they happened, once the tracker is
// there; drops them after the wait limit so nothing piles up forever.
const flushWhenReady = () => {
  const umami = window.umami;
  if (umami) {
    stopWaiting();
    const queued = pending;
    pending = [];
    for (const event of queued) {
      umami.track(event.name, event.data).catch(() => undefined);
    }
    return;
  }

  if (Date.now() - waitStartedAt >= UMAMI_WAIT_LIMIT_MS) {
    stopWaiting();
    pending = [];
  }
};

const waitForUmami = (event: PendingEvent) => {
  pending.push(event);
  if (pollTimer === null) {
    waitStartedAt = Date.now();
    pollTimer = setInterval(flushWhenReady, UMAMI_POLL_MS);
  }
};

/** Test-only: forget waiting events and stop looking for the tracker. */
export const resetPendingUmamiEvents = () => {
  stopWaiting();
  pending = [];
};

// Resolves when the beacons are sent so callers that navigate away can await it;
// resolves immediately when the trackers are absent (dev, staging, blocked).
// Events that happen before Umami has loaded (the tracker arrives after the
// page is interactive, so the first screen's views often do) wait for it and
// go out in order once it appears, instead of being lost.
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

  if (window.umami && pending.length === 0) {
    beacons.push(window.umami.track(name, data));
  } else {
    // Behind events already waiting, or before the tracker exists.
    waitForUmami({ name, data });
    flushWhenReady();
  }

  if (zaraz && window.zaraz) {
    beacons.push(window.zaraz.track(name, data));
  }

  // Tracking must never break the interaction that triggered it.
  await Promise.allSettled(beacons);
};

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
  }
}

// Resolves when the beacon is sent so callers that navigate away can await it;
// resolves immediately when the tracker is absent (dev, staging, blocked).
export const trackEvent = async (
  name: AnalyticsEventName,
  data?: UmamiEventData,
): Promise<void> => {
  if (typeof window === 'undefined' || !window.umami) {
    return;
  }

  try {
    await window.umami.track(name, data);
  } catch {
    // Tracking must never break the interaction that triggered it.
  }
};

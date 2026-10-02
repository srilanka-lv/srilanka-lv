import { type AnalyticsEventName, type UmamiEventData, trackEvent } from '@/shared/utils/analytics';

/** Which grid tile opened the gallery: a photo, or the last tile with "+N". */
export type TripGalleryOpenSource = 'photo' | 'more';

/** How the visitor reached a photo. `swipe` covers touch swipes and trackpad scrolls. */
export type TripGalleryNavigation = 'open' | 'arrow' | 'key' | 'thumbnail' | 'swipe';

type Track = (name: AnalyticsEventName, data?: UmamiEventData) => unknown;

// Umami only: these are engagement signals no Zaraz tool needs, and each
// zaraz.track call would re-run the trigger that injects Umami.
const trackUmamiOnly: Track = (name, data) => {
  // Tracking must never break the interaction that triggered it.
  trackEvent(name, data, { zaraz: false }).catch(() => undefined);
};

export type TripGallerySession = {
  view: (index: number, via: TripGalleryNavigation) => void;
  close: () => void;
};

/**
 * One open-to-close visit of the full-screen gallery. Opening sends
 * `trip-gallery-open` straight away; each photo sends `trip-gallery-view` the
 * first time it is shown in this visit; closing sends `trip-gallery-close` once
 * with how many photos were seen and how many swipes it took. Indexes are
 * 1-based to match the "3 / 32" counter. Nothing personal is sent.
 *
 * Start it from the click handler, not an effect, so React's development
 * double-render cannot send `trip-gallery-open` twice.
 */
export const startTripGallerySession = (
  slugs: string[],
  startIndex: number,
  source: TripGalleryOpenSource,
  track: Track = trackUmamiOnly,
): TripGallerySession => {
  const viewed = new Set<number>();
  let swipes = 0;
  let closed = false;

  track('trip-gallery-open', { index: startIndex + 1, source });

  const view = (index: number, via: TripGalleryNavigation) => {
    if (closed) {
      return;
    }

    if (via === 'swipe') {
      swipes += 1;
    }

    if (viewed.has(index)) {
      return;
    }

    viewed.add(index);
    track('trip-gallery-view', { index: index + 1, photo: slugs[index] ?? '', via });
  };

  view(startIndex, 'open');

  return {
    view,
    close: () => {
      if (closed) {
        return;
      }

      closed = true;
      track('trip-gallery-close', { viewed: viewed.size, swipes });
    },
  };
};

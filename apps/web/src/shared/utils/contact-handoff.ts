import { type UmamiEventData, trackEvent } from './analytics';

// Long enough for iOS and Android to open WhatsApp or Instagram, or for a new
// desktop tab to take focus; short enough that the visitor is still on the page.
export const HANDOFF_WINDOW_MS = 4000;

export type ContactHandoffResult = 'left' | 'stayed';

/**
 * After a contact click, reports whether the visitor actually left the page
 * (the app or a new tab opened) or was still looking at it a few seconds later,
 * which means the hand-off to WhatsApp or Instagram did not happen.
 *
 * `left` is best effort: a same-tab navigation to wa.me's web page also counts
 * as leaving, and a browser that freezes a hidden page may drop the beacon.
 * `stayed` is the reliable signal, and the one that points at a broken hand-off.
 */
export const watchContactHandoff = (data: UmamiEventData): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const startedAt = performance.now();
  let timer: ReturnType<typeof setTimeout> | undefined;

  const settle = (result: ContactHandoffResult): void => {
    clearTimeout(timer);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('pagehide', handlePageHide);

    void trackEvent('contact-handoff', {
      ...data,
      result,
      ms: Math.round(performance.now() - startedAt),
    });
  };

  const handleVisibilityChange = (): void => {
    if (document.visibilityState === 'hidden') {
      settle('left');
    }
  };

  const handlePageHide = (): void => {
    settle('left');
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('pagehide', handlePageHide);
  timer = setTimeout(() => {
    settle(document.visibilityState === 'hidden' ? 'left' : 'stayed');
  }, HANDOFF_WINDOW_MS);
};

'use client';

import { type FunctionComponent, useEffect, useRef } from 'react';

import { trackUmamiEvent } from '@/shared/utils/analytics';
import {
  TRIP_SCROLL_DEPTH_MILESTONES,
  type TripScrollDepth,
  createTripEngagement,
  isSectionReadable,
} from '@/shared/utils/trip-engagement';

import { sentinelStyle, sentinelsStyle } from './styles.css';

// Fine enough that a tall section's visible share is re-checked as it scrolls.
const THRESHOLDS = Array.from({ length: 21 }, (_, step) => step / 20);

/**
 * Reports where visitors look and stop on the girls trip page to Umami:
 * which sections they reach and read, how far they scroll and which
 * questions they open. Passive: IntersectionObserver and one toggle
 * listener, no scroll handlers, nothing rendered that takes up space.
 *
 * Sections opt in with `data-trip-section`, questions with `data-faq-id`.
 * Mount once inside the page wrapper, which must be `position: relative` so
 * the scroll-depth markers sit at 25/50/75/100% of the trip content.
 */
export const TripPageEngagement: FunctionComponent = () => {
  const sentinelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const engagement = createTripEngagement({
      track: trackUmamiEvent,
      clock: {
        now: () => performance.now(),
        setTimeout: (callback, ms) => window.setTimeout(callback, ms),
        clearTimeout: (handle) => window.clearTimeout(handle as number),
      },
    });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = (entry.target as HTMLElement).dataset.tripSection;
          if (!section) {
            continue;
          }
          if (entry.isIntersecting) {
            engagement.sectionSeen(section);
          }
          engagement.sectionReadable(
            section,
            entry.isIntersecting &&
              isSectionReadable({
                visibleHeight: entry.intersectionRect.height,
                sectionHeight: entry.boundingClientRect.height,
                viewportHeight: entry.rootBounds?.height ?? window.innerHeight,
              }),
          );
        }
      },
      { threshold: THRESHOLDS },
    );
    for (const element of document.querySelectorAll('[data-trip-section]')) {
      sectionObserver.observe(element);
    }

    // A marker counts once it is on screen or already above it, so jumping
    // past one with an in-page link still records the depth.
    const depthObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          const depth = Number((entry.target as HTMLElement).dataset.depth) as TripScrollDepth;
          engagement.scrollDepthReached(depth);
          depthObserver.unobserve(entry.target);
        }
      }
    });
    for (const sentinel of sentinelsRef.current?.children ?? []) {
      depthObserver.observe(sentinel);
    }

    // `toggle` does not bubble, so listen in the capture phase.
    const onToggle = (event: Event) => {
      const details = event.target;
      if (details instanceof HTMLDetailsElement && details.open && details.dataset.faqId) {
        engagement.faqOpened(details.dataset.faqId);
      }
    };
    document.addEventListener('toggle', onToggle, true);

    const onVisibilityChange = () => {
      engagement.pageVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      sectionObserver.disconnect();
      depthObserver.disconnect();
      document.removeEventListener('toggle', onToggle, true);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      engagement.dispose();
    };
  }, []);

  return (
    <div ref={sentinelsRef} className={sentinelsStyle} aria-hidden="true">
      {TRIP_SCROLL_DEPTH_MILESTONES.map((depth) => (
        <span
          key={depth}
          className={sentinelStyle}
          data-depth={depth}
          // The 100% marker sits on the last pixel so it can still intersect.
          style={{ top: depth === 100 ? 'calc(100% - 1px)' : `${depth}%` }}
        />
      ))}
    </div>
  );
};

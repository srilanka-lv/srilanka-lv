import type { AnalyticsEventName, UmamiEventData } from './analytics';

/** A section counts as read once it has been at least half visible this long. */
export const TRIP_SECTION_READ_MS = 5000;

/** Share of a section (or of the viewport, for sections taller than it) that must be visible. */
export const TRIP_SECTION_READ_SHARE = 0.5;

export const TRIP_SCROLL_DEPTH_MILESTONES = [25, 50, 75, 100] as const;

export type TripScrollDepth = (typeof TRIP_SCROLL_DEPTH_MILESTONES)[number];

type Track = (name: AnalyticsEventName, data: UmamiEventData) => void;

type Clock = {
  now: () => number;
  setTimeout: (callback: () => void, ms: number) => unknown;
  clearTimeout: (handle: unknown) => void;
};

type ReadingState = {
  /** The section is half visible right now (whether or not the page is). */
  readable: boolean;
  /** Visible time banked from earlier stretches. */
  accumulatedMs: number;
  /** When the current visible stretch began, or null while not counting. */
  since: number | null;
  timer: unknown;
};

export type TripEngagement = {
  /** The section entered the viewport. */
  sectionSeen: (section: string) => void;
  /** Whether the section is at least half visible right now. */
  sectionReadable: (section: string, readable: boolean) => void;
  /** The page became visible or hidden (tab switch, app switch, back/forward cache). */
  pageVisible: (visible: boolean) => void;
  scrollDepthReached: (depth: TripScrollDepth) => void;
  faqOpened: (questionId: string) => void;
  /** Stops pending read timers; nothing fires after this. */
  dispose: () => void;
};

/**
 * Engagement on the girls trip page, one instance per pageview. Every event
 * fires at most once per instance: scrolling back to a section, closing and
 * reopening a question, or returning to the page from the back/forward cache
 * (the same pageview, so the same instance) never sends it again.
 *
 * Properties are the page and the section, depth or question slug only, so
 * nothing about the visitor or where she came from is sent.
 */
export const createTripEngagement = ({
  track,
  clock,
  page = 'girls-trip',
}: {
  track: Track;
  clock: Clock;
  page?: string;
}): TripEngagement => {
  const seen = new Set<string>();
  const read = new Set<string>();
  const depths = new Set<TripScrollDepth>();
  const faqs = new Set<string>();
  const reading = new Map<string, ReadingState>();
  let pageIsVisible = true;
  let disposed = false;

  const send = (name: AnalyticsEventName, data: UmamiEventData) => {
    if (!disposed) {
      track(name, { page, ...data });
    }
  };

  const stateOf = (section: string): ReadingState => {
    let state = reading.get(section);
    if (!state) {
      state = { readable: false, accumulatedMs: 0, since: null, timer: undefined };
      reading.set(section, state);
    }
    return state;
  };

  const pause = (state: ReadingState) => {
    if (state.since !== null) {
      state.accumulatedMs += clock.now() - state.since;
      state.since = null;
    }
    clock.clearTimeout(state.timer);
    state.timer = undefined;
  };

  const resume = (section: string, state: ReadingState) => {
    if (disposed || read.has(section) || state.since !== null) {
      return;
    }
    state.since = clock.now();
    state.timer = clock.setTimeout(() => {
      pause(state);
      if (state.accumulatedMs >= TRIP_SECTION_READ_MS && !read.has(section)) {
        read.add(section);
        send('trip-section-read', { section });
      } else if (state.readable && pageIsVisible) {
        resume(section, state);
      }
    }, TRIP_SECTION_READ_MS - state.accumulatedMs);
  };

  return {
    sectionSeen: (section) => {
      if (seen.has(section)) {
        return;
      }
      seen.add(section);
      send('trip-section-view', { section });
    },

    sectionReadable: (section, readable) => {
      if (read.has(section)) {
        return;
      }
      const state = stateOf(section);
      state.readable = readable;
      if (readable && pageIsVisible) {
        resume(section, state);
      } else {
        pause(state);
      }
    },

    pageVisible: (visible) => {
      pageIsVisible = visible;
      for (const [section, state] of reading) {
        if (visible && state.readable) {
          resume(section, state);
        } else {
          pause(state);
        }
      }
    },

    scrollDepthReached: (depth) => {
      if (depths.has(depth)) {
        return;
      }
      depths.add(depth);
      send('trip-scroll-depth', { depth });
    },

    faqOpened: (questionId) => {
      if (faqs.has(questionId)) {
        return;
      }
      faqs.add(questionId);
      send('trip-faq-open', { question: questionId });
    },

    dispose: () => {
      for (const state of reading.values()) {
        pause(state);
      }
      disposed = true;
    },
  };
};

/**
 * Whether an observed section counts as half visible: half of the section,
 * or half of the viewport for a section taller than the viewport (which
 * could otherwise never qualify).
 */
export const isSectionReadable = ({
  visibleHeight,
  sectionHeight,
  viewportHeight,
}: {
  visibleHeight: number;
  sectionHeight: number;
  viewportHeight: number;
}): boolean =>
  visibleHeight > 0 &&
  visibleHeight >= TRIP_SECTION_READ_SHARE * Math.min(sectionHeight, viewportHeight);

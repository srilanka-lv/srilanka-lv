import { describe, expect, it, mock } from 'bun:test';

import { TRIP_SECTION_READ_MS, createTripEngagement, isSectionReadable } from './trip-engagement';

// A manual clock: time only moves when the test advances it, and due timers
// run in order.
const createClock = () => {
  let now = 0;
  let nextId = 1;
  const timers = new Map<number, { at: number; callback: () => void }>();

  return {
    now: () => now,
    setTimeout: (callback: () => void, ms: number) => {
      const id = nextId++;
      timers.set(id, { at: now + ms, callback });
      return id;
    },
    clearTimeout: (handle: unknown) => {
      timers.delete(handle as number);
    },
    advance: (ms: number) => {
      const target = now + ms;
      for (;;) {
        const due = [...timers.entries()]
          .filter(([, timer]) => timer.at <= target)
          .sort(([, a], [, b]) => a.at - b.at)[0];
        if (!due) {
          break;
        }
        timers.delete(due[0]);
        now = due[1].at;
        due[1].callback();
      }
      now = target;
    },
  };
};

const setup = () => {
  const clock = createClock();
  const track = mock((_name: string, _data: Record<string, string | number>) => undefined);
  const engagement = createTripEngagement({ track, clock });
  const calls = () => track.mock.calls.map(([name, data]) => [name, data]);
  return { clock, track, engagement, calls };
};

describe('trip-section-view', () => {
  it('fires once per section, however often it is scrolled back into view', () => {
    const { engagement, calls } = setup();

    engagement.sectionSeen('faq');
    engagement.sectionSeen('cost');
    engagement.sectionSeen('faq');
    engagement.sectionSeen('faq');

    expect(calls()).toEqual([
      ['trip-section-view', { page: 'girls-trip', section: 'faq' }],
      ['trip-section-view', { page: 'girls-trip', section: 'cost' }],
    ]);
  });
});

describe('trip-section-read', () => {
  it('fires after 5 seconds of continuous half visibility', () => {
    const { clock, engagement, calls } = setup();

    engagement.sectionReadable('payment', true);
    clock.advance(TRIP_SECTION_READ_MS - 1);
    expect(calls()).toEqual([]);

    clock.advance(1);
    expect(calls()).toEqual([['trip-section-read', { page: 'girls-trip', section: 'payment' }]]);
  });

  it('adds up separate visits, then fires once and never again', () => {
    const { clock, engagement, calls } = setup();

    engagement.sectionReadable('cost', true);
    clock.advance(3000);
    engagement.sectionReadable('cost', false);
    clock.advance(60_000);
    expect(calls()).toEqual([]);

    engagement.sectionReadable('cost', true);
    clock.advance(2000);
    expect(calls()).toEqual([['trip-section-read', { page: 'girls-trip', section: 'cost' }]]);

    engagement.sectionReadable('cost', false);
    engagement.sectionReadable('cost', true);
    clock.advance(TRIP_SECTION_READ_MS * 3);
    expect(calls()).toHaveLength(1);
  });

  it('does not count time while the page is hidden', () => {
    const { clock, engagement, calls } = setup();

    engagement.sectionReadable('faq', true);
    clock.advance(4000);
    engagement.pageVisible(false);
    clock.advance(600_000);
    expect(calls()).toEqual([]);

    engagement.pageVisible(true);
    clock.advance(999);
    expect(calls()).toEqual([]);
    clock.advance(1);
    expect(calls()).toEqual([['trip-section-read', { page: 'girls-trip', section: 'faq' }]]);
  });

  it('does not count time for a page that starts hidden until it becomes visible', () => {
    const { clock, engagement, calls } = setup();

    engagement.pageVisible(false);
    engagement.sectionReadable('facts', true);
    clock.advance(600_000);
    expect(calls()).toEqual([]);

    engagement.pageVisible(true);
    clock.advance(TRIP_SECTION_READ_MS - 1);
    expect(calls()).toEqual([]);
    clock.advance(1);
    expect(calls()).toEqual([['trip-section-read', { page: 'girls-trip', section: 'facts' }]]);
  });

  it('stops counting a section that left the viewport while the page was hidden', () => {
    const { clock, engagement, calls } = setup();

    engagement.sectionReadable('video', true);
    clock.advance(1000);
    engagement.pageVisible(false);
    engagement.sectionReadable('video', false);
    engagement.pageVisible(true);
    clock.advance(TRIP_SECTION_READ_MS * 2);

    expect(calls()).toEqual([]);
  });

  it('sends nothing after dispose', () => {
    const { clock, engagement, calls } = setup();

    engagement.sectionReadable('closing', true);
    engagement.dispose();
    clock.advance(TRIP_SECTION_READ_MS * 2);
    engagement.sectionSeen('closing');

    expect(calls()).toEqual([]);
  });
});

describe('trip-scroll-depth', () => {
  it('fires each milestone once, also when scrolling back up and down again', () => {
    const { engagement, calls } = setup();

    engagement.scrollDepthReached(25);
    engagement.scrollDepthReached(50);
    engagement.scrollDepthReached(25);
    engagement.scrollDepthReached(50);
    engagement.scrollDepthReached(100);
    engagement.scrollDepthReached(75);

    expect(calls()).toEqual([
      ['trip-scroll-depth', { page: 'girls-trip', depth: 25 }],
      ['trip-scroll-depth', { page: 'girls-trip', depth: 50 }],
      ['trip-scroll-depth', { page: 'girls-trip', depth: 100 }],
      ['trip-scroll-depth', { page: 'girls-trip', depth: 75 }],
    ]);
  });
});

describe('trip-faq-open', () => {
  it('fires once per question slug', () => {
    const { engagement, calls } = setup();

    engagement.faqOpened('cancelling');
    engagement.faqOpened('cancelling');
    engagement.faqOpened('come-alone');

    expect(calls()).toEqual([
      ['trip-faq-open', { page: 'girls-trip', question: 'cancelling' }],
      ['trip-faq-open', { page: 'girls-trip', question: 'come-alone' }],
    ]);
  });
});

describe('back/forward navigation', () => {
  it('sends nothing again when the page comes back from the back/forward cache', () => {
    const { clock, engagement, calls } = setup();

    engagement.sectionSeen('facts');
    engagement.sectionReadable('facts', true);
    clock.advance(TRIP_SECTION_READ_MS);
    engagement.scrollDepthReached(25);
    engagement.faqOpened('safety');
    const before = calls();

    // Leaving hides the page; the cache restores the same pageview (and this
    // same instance), after which the observers report everything afresh.
    engagement.pageVisible(false);
    engagement.pageVisible(true);
    engagement.sectionSeen('facts');
    engagement.sectionReadable('facts', true);
    clock.advance(TRIP_SECTION_READ_MS * 2);
    engagement.scrollDepthReached(25);
    engagement.faqOpened('safety');

    expect(calls()).toEqual(before);
  });

  it('counts a fresh pageview (a new instance) again, once', () => {
    const first = setup();
    first.engagement.sectionSeen('faq');
    first.engagement.dispose();

    const second = setup();
    second.engagement.sectionSeen('faq');
    second.engagement.sectionSeen('faq');

    expect(first.calls()).toHaveLength(1);
    expect(second.calls()).toEqual([['trip-section-view', { page: 'girls-trip', section: 'faq' }]]);
  });
});

describe('isSectionReadable', () => {
  it('needs half of a short section on screen', () => {
    expect(isSectionReadable({ visibleHeight: 199, sectionHeight: 400, viewportHeight: 800 })).toBe(
      false,
    );
    expect(isSectionReadable({ visibleHeight: 200, sectionHeight: 400, viewportHeight: 800 })).toBe(
      true,
    );
  });

  it('needs half of the viewport filled by a section taller than it', () => {
    expect(
      isSectionReadable({ visibleHeight: 399, sectionHeight: 3000, viewportHeight: 800 }),
    ).toBe(false);
    expect(
      isSectionReadable({ visibleHeight: 400, sectionHeight: 3000, viewportHeight: 800 }),
    ).toBe(true);
  });

  it('is never true for a section that is not on screen', () => {
    expect(isSectionReadable({ visibleHeight: 0, sectionHeight: 0, viewportHeight: 800 })).toBe(
      false,
    );
  });
});

import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';

import { trackEvent } from './analytics';
import { UMAMI_SCRIPT_URL, umamiSingleInstance } from './umami-single-instance';

type FakeScript = { src: string };

// Stands in for Document: currentScript is an accessor on the prototype, as in browsers.
class FakeDocument {
  executing: FakeScript | null = null;

  get currentScript(): FakeScript | null {
    return this.executing;
  }
}

type Page = {
  pageviews: number;
  clickListeners: number;
  track: ReturnType<typeof mock>;
};

describe('umamiSingleInstance', () => {
  let fakeDocument: FakeDocument;
  let page: Page;

  // Mirrors the start of cloud.umami.is/script.js: bail out without
  // currentScript, otherwise claim window.umami if free, send a pageview and
  // hook clicks and history.
  const executeTracker = (script: FakeScript = { src: UMAMI_SCRIPT_URL }) => {
    fakeDocument.executing = script;
    const currentScript = document.currentScript;
    fakeDocument.executing = null;

    if (!currentScript) {
      return;
    }

    const win = window as unknown as { umami?: { track: Page['track'] } };
    win.umami ??= { track: page.track };
    page.pageviews += 1;
    page.clickListeners += 1;
  };

  // The Zaraz Custom HTML tool on a hostname-only trigger: every zaraz.track
  // call injects and runs the tracker again.
  const zarazTrack = mock(() => {
    executeTracker();
    return Promise.resolve();
  });

  beforeEach(() => {
    fakeDocument = new FakeDocument();
    page = { pageviews: 0, clickListeners: 0, track: mock(() => Promise.resolve()) };
    zarazTrack.mockClear();
    (globalThis as { document?: unknown }).document = fakeDocument;
    (globalThis as { window?: unknown }).window = { zaraz: { track: zarazTrack } };
  });

  afterEach(() => {
    (globalThis as { document?: unknown }).document = undefined;
    (globalThis as { window?: unknown }).window = undefined;
  });

  it('reproduces the double count without the guard', async () => {
    executeTracker();

    await trackEvent('flight-month-select', { month: '2026-11' });
    await trackEvent('product-cta', { product: 'girls-trip' });

    expect(page.pageviews).toBe(3);
    expect(page.clickListeners).toBe(3);
  });

  it('keeps one tracker running while trackEvent re-triggers Zaraz', async () => {
    umamiSingleInstance({ scriptUrl: UMAMI_SCRIPT_URL });
    executeTracker();

    await trackEvent('flight-month-select', { month: '2026-11' });
    await trackEvent('product-cta', { product: 'girls-trip' });

    expect(zarazTrack).toHaveBeenCalledTimes(2);
    expect(page.track).toHaveBeenCalledTimes(2);
    expect(page.track.mock.calls[0]).toEqual(['flight-month-select', { month: '2026-11' }]);
    expect(page.pageviews).toBe(1);
    expect(page.clickListeners).toBe(1);
  });

  it('keeps the claim of a tracker that started before the guard', () => {
    executeTracker();
    umamiSingleInstance({ scriptUrl: UMAMI_SCRIPT_URL });
    executeTracker();

    expect(page.pageviews).toBe(1);
  });

  it('matches the tracker URL with a query string', () => {
    umamiSingleInstance({ scriptUrl: UMAMI_SCRIPT_URL });
    executeTracker();
    executeTracker({ src: `${UMAMI_SCRIPT_URL}?v=2` });

    expect(page.pageviews).toBe(1);
  });

  it('leaves the first tracker and other scripts visible', () => {
    umamiSingleInstance({ scriptUrl: UMAMI_SCRIPT_URL });
    const first = { src: UMAMI_SCRIPT_URL };
    const other = { src: 'https://srilanka.lv/_next/static/chunks/main.js' };

    fakeDocument.executing = first;
    expect(document.currentScript as unknown).toBe(first);
    expect(document.currentScript as unknown).toBe(first);

    fakeDocument.executing = other;
    expect(document.currentScript as unknown).toBe(other);
  });

  it('works when inlined via toString, as the <head> script does', () => {
    new Function(
      `(${umamiSingleInstance.toString()})(${JSON.stringify({ scriptUrl: UMAMI_SCRIPT_URL })});`,
    )();

    executeTracker();
    executeTracker();

    expect(page.pageviews).toBe(1);
  });
});

import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';

import { HANDOFF_WINDOW_MS, watchContactHandoff } from './contact-handoff';

type FakeDocument = EventTarget & { visibilityState: DocumentVisibilityState };

const DATA = { channel: 'whatsapp', placement: 'footer-about-me', context: 'mobile' };

describe('watchContactHandoff', () => {
  let fakeDocument: FakeDocument;
  let track: ReturnType<typeof mock>;

  beforeEach(() => {
    fakeDocument = Object.assign(new EventTarget(), {
      visibilityState: 'visible' as DocumentVisibilityState,
    });
    track = mock(() => Promise.resolve());
    (globalThis as { document?: unknown }).document = fakeDocument;
    (globalThis as { window?: unknown }).window = Object.assign(new EventTarget(), {
      umami: { track },
    });
  });

  afterEach(() => {
    (globalThis as { document?: unknown }).document = undefined;
    (globalThis as { window?: unknown }).window = undefined;
  });

  it('reports left when the page is hidden, and only once', () => {
    watchContactHandoff(DATA);

    fakeDocument.visibilityState = 'hidden';
    fakeDocument.dispatchEvent(new Event('visibilitychange'));
    (globalThis.window as unknown as EventTarget).dispatchEvent(new Event('pagehide'));

    expect(track).toHaveBeenCalledTimes(1);
    expect(track.mock.calls[0]?.[0]).toBe('contact-handoff');
    expect(track.mock.calls[0]?.[1]).toMatchObject({ ...DATA, result: 'left' });
  });

  it(
    'reports stayed when the page is still visible after the window',
    async () => {
      watchContactHandoff(DATA);

      await Bun.sleep(HANDOFF_WINDOW_MS + 50);

      expect(track).toHaveBeenCalledTimes(1);
      expect(track.mock.calls[0]?.[1]).toMatchObject({ ...DATA, result: 'stayed' });
    },
    HANDOFF_WINDOW_MS + 1000,
  );
});

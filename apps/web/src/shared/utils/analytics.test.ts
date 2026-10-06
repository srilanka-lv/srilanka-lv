import { afterEach, beforeEach, describe, expect, it, mock, setSystemTime } from 'bun:test';

import {
  UMAMI_POLL_MS,
  UMAMI_WAIT_LIMIT_MS,
  resetPendingUmamiEvents,
  trackEvent,
} from './analytics';

type WindowWithUmami = Window & typeof globalThis;

describe('trackEvent', () => {
  beforeEach(() => {
    // typeof window === 'undefined' is true for a global set to undefined,
    // so assignment isolates tests without needing delete.
    (globalThis as { window?: unknown }).window = undefined;
    resetPendingUmamiEvents();
  });

  afterEach(() => {
    resetPendingUmamiEvents();
    setSystemTime();
  });

  it('resolves silently when window is undefined', async () => {
    await expect(trackEvent('contact')).resolves.toBeUndefined();
  });

  it('resolves silently when umami is absent', async () => {
    (globalThis as { window?: unknown }).window = {};

    await expect(trackEvent('contact')).resolves.toBeUndefined();
  });

  it('forwards name and data to umami.track', async () => {
    const track = mock(() => Promise.resolve());
    (globalThis as { window?: unknown }).window = {
      umami: { track },
    } as unknown as WindowWithUmami;

    await trackEvent('product-cta', { product: 'girls-trip' });

    expect(track).toHaveBeenCalledWith('product-cta', { product: 'girls-trip' });
  });

  it('forwards to zaraz by default and skips it when zaraz is off', async () => {
    const track = mock(() => Promise.resolve());
    const zarazTrack = mock(() => Promise.resolve());
    (globalThis as { window?: unknown }).window = {
      umami: { track },
      zaraz: { track: zarazTrack },
    } as unknown as WindowWithUmami;

    await trackEvent('contact', { channel: 'whatsapp' });
    expect(zarazTrack).toHaveBeenCalledTimes(1);

    await trackEvent('ask-open', { entry: 'floating' }, { zaraz: false });
    expect(zarazTrack).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledTimes(2);
    expect(track).toHaveBeenLastCalledWith('ask-open', { entry: 'floating' });
  });

  it('swallows umami.track rejections', async () => {
    const track = mock(() => Promise.reject(new Error('blocked')));
    (globalThis as { window?: unknown }).window = {
      umami: { track },
    } as unknown as WindowWithUmami;

    await expect(trackEvent('contact')).resolves.toBeUndefined();
  });

  it('holds events until umami loads, then sends each once, in order', async () => {
    const win = {} as { umami?: { track: ReturnType<typeof mock> } };
    (globalThis as { window?: unknown }).window = win;

    await trackEvent('trip-section-view', { section: 'facts' }, { zaraz: false });
    await trackEvent('ask-cta-view', { placement: 'trip-page-hero' }, { zaraz: false });

    const track = mock(() => Promise.resolve());
    win.umami = { track };
    await Bun.sleep(UMAMI_POLL_MS + 50);

    expect(track.mock.calls).toEqual([
      ['trip-section-view', { section: 'facts' }],
      ['ask-cta-view', { placement: 'trip-page-hero' }],
    ]);

    // Nothing left waiting: a later event goes straight out, once.
    await trackEvent('trip-faq-open', { question: 'safety' }, { zaraz: false });
    await Bun.sleep(UMAMI_POLL_MS + 50);
    expect(track).toHaveBeenCalledTimes(3);
  });

  it('drops waiting events if umami never loads', async () => {
    const win = {} as { umami?: { track: ReturnType<typeof mock> } };
    (globalThis as { window?: unknown }).window = win;

    setSystemTime(new Date('2026-10-06T10:00:00Z'));
    await trackEvent('trip-section-view', { section: 'facts' }, { zaraz: false });
    setSystemTime(new Date(Date.parse('2026-10-06T10:00:00Z') + UMAMI_WAIT_LIMIT_MS));
    await Bun.sleep(UMAMI_POLL_MS + 50);

    const track = mock(() => Promise.resolve());
    win.umami = { track };
    await Bun.sleep(UMAMI_POLL_MS + 50);

    expect(track).not.toHaveBeenCalled();
  });
});

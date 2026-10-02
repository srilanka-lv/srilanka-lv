import { beforeEach, describe, expect, it, mock } from 'bun:test';

import { trackEvent, trackUmamiEvent } from './analytics';

type WindowWithUmami = Window & typeof globalThis;

describe('trackEvent', () => {
  beforeEach(() => {
    // typeof window === 'undefined' is true for a global set to undefined,
    // so assignment isolates tests without needing delete.
    (globalThis as { window?: unknown }).window = undefined;
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
});

describe('trackUmamiEvent', () => {
  beforeEach(() => {
    (globalThis as { window?: unknown }).window = undefined;
  });

  it('sends to umami and never to zaraz', () => {
    const umami = mock(() => Promise.resolve());
    const zaraz = mock(() => Promise.resolve());
    (globalThis as { window?: unknown }).window = {
      umami: { track: umami },
      zaraz: { track: zaraz },
    } as unknown as WindowWithUmami;

    trackUmamiEvent('trip-section-view', { page: 'girls-trip', section: 'faq' });

    expect(umami).toHaveBeenCalledWith('trip-section-view', { page: 'girls-trip', section: 'faq' });
    expect(zaraz).not.toHaveBeenCalled();
  });

  it('does nothing without umami or a window', () => {
    expect(() => trackUmamiEvent('trip-faq-open')).not.toThrow();
    (globalThis as { window?: unknown }).window = {};
    expect(() => trackUmamiEvent('trip-faq-open')).not.toThrow();
  });

  it('survives a tracker that throws or rejects', () => {
    (globalThis as { window?: unknown }).window = {
      umami: {
        track: () => {
          throw new Error('blocked');
        },
      },
    } as unknown as WindowWithUmami;
    expect(() => trackUmamiEvent('trip-scroll-depth', { depth: 50 })).not.toThrow();

    (globalThis as { window?: unknown }).window = {
      umami: { track: () => Promise.reject(new Error('offline')) },
    } as unknown as WindowWithUmami;
    expect(() => trackUmamiEvent('trip-scroll-depth', { depth: 75 })).not.toThrow();
  });
});

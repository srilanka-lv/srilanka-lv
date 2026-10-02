import { describe, expect, it, mock } from 'bun:test';

import { startTripGallerySession } from './gallery-session';

const slugs = ['udenskritums', 'rita-joga', 'zilonis', 'joga-saulrieta'];

const setup = (startIndex = 1) => {
  const track = mock((..._args: unknown[]) => undefined);
  const session = startTripGallerySession(slugs, startIndex, 'photo', track);
  const calls = (name: string) => track.mock.calls.filter(([event]) => event === name);

  return { track, session, calls };
};

describe('startTripGallerySession', () => {
  it('sends one open and a view for the photo it opened on', () => {
    const { track } = setup(1);

    expect(track.mock.calls).toEqual([
      ['trip-gallery-open', { index: 2, source: 'photo' }],
      ['trip-gallery-view', { index: 2, photo: 'rita-joga', via: 'open' }],
    ]);
  });

  it('sends a view once per photo however often it is shown', () => {
    const { session, calls } = setup(0);

    session.view(1, 'arrow');
    session.view(0, 'arrow');
    session.view(1, 'swipe');
    session.view(2, 'thumbnail');
    session.view(2, 'key');

    expect(calls('trip-gallery-view')).toEqual([
      ['trip-gallery-view', { index: 1, photo: 'udenskritums', via: 'open' }],
      ['trip-gallery-view', { index: 2, photo: 'rita-joga', via: 'arrow' }],
      ['trip-gallery-view', { index: 3, photo: 'zilonis', via: 'thumbnail' }],
    ]);
  });

  it('sends close once with the photos seen and every swipe', () => {
    const { session, calls } = setup(0);

    session.view(1, 'swipe');
    session.view(0, 'swipe');
    session.view(1, 'swipe');
    session.view(3, 'key');
    session.close();
    session.close();

    expect(calls('trip-gallery-close')).toEqual([['trip-gallery-close', { viewed: 3, swipes: 3 }]]);
  });

  it('ignores views after close', () => {
    const { session, calls } = setup(0);

    session.close();
    session.view(3, 'swipe');

    expect(calls('trip-gallery-view')).toHaveLength(1);
    expect(calls('trip-gallery-close')).toEqual([['trip-gallery-close', { viewed: 1, swipes: 0 }]]);
  });

  it('counts views afresh in the next visit', () => {
    const track = mock((..._args: unknown[]) => undefined);

    startTripGallerySession(slugs, 2, 'photo', track).close();
    startTripGallerySession(slugs, 2, 'more', track).close();

    expect(track.mock.calls.map(([event]) => event)).toEqual([
      'trip-gallery-open',
      'trip-gallery-view',
      'trip-gallery-close',
      'trip-gallery-open',
      'trip-gallery-view',
      'trip-gallery-close',
    ]);
  });

  it('sends to Umami and never to Zaraz by default', () => {
    const umami = mock(() => Promise.resolve());
    const zaraz = mock(() => Promise.resolve());
    (globalThis as { window?: unknown }).window = {
      umami: { track: umami },
      zaraz: { track: zaraz },
    };

    startTripGallerySession(slugs, 0, 'photo').close();

    expect(umami.mock.calls.map(([event]) => event)).toEqual([
      'trip-gallery-open',
      'trip-gallery-view',
      'trip-gallery-close',
    ]);
    expect(zaraz).not.toHaveBeenCalled();
    (globalThis as { window?: unknown }).window = undefined;
  });
});

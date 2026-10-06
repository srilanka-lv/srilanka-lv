import { beforeEach, describe, expect, it, mock } from 'bun:test';

import { createFieldStartTracker, trackAskGrieta, trackLeadSent } from './track';

const install = () => {
  const umami = mock(() => Promise.resolve());
  const zaraz = mock(() => Promise.resolve());
  (globalThis as { window?: unknown }).window = {
    location: { pathname: '/produkti' },
    umami: { track: umami },
    zaraz: { track: zaraz },
  };

  return { umami, zaraz };
};

describe('trackAskGrieta', () => {
  beforeEach(() => {
    (globalThis as { window?: unknown }).window = undefined;
  });

  it('sends exactly one Umami event per call, with the page, and nothing to Zaraz', async () => {
    const { umami, zaraz } = install();

    trackAskGrieta('ask-open', { entry: 'floating', placement: 'floating-button' });
    await Promise.resolve();

    expect(umami).toHaveBeenCalledTimes(1);
    expect(umami).toHaveBeenCalledWith('ask-open', {
      page: '/produkti',
      entry: 'floating',
      placement: 'floating-button',
    });
    expect(zaraz).not.toHaveBeenCalled();
  });

  it('never throws when Umami fails', async () => {
    (globalThis as { window?: unknown }).window = {
      location: { pathname: '/' },
      umami: {
        track: () => {
          throw new Error('blocked');
        },
      },
    };

    expect(() => trackAskGrieta('ask-close', { method: 'escape' })).not.toThrow();
  });

  it('does nothing on the server', () => {
    expect(() => trackAskGrieta('ask-open', {})).not.toThrow();
  });
});

describe('createFieldStartTracker', () => {
  it('reports each field once, in the order they were started', () => {
    const report = mock((_field: string, _order: number) => undefined);
    const fieldStarted = createFieldStartTracker(report);

    for (const field of ['phone', 'phone', 'name', 'phone', 'name', 'message']) {
      fieldStarted(field);
    }

    expect(report.mock.calls).toEqual([
      ['phone', 1],
      ['name', 2],
      ['message', 3],
    ]);
  });
});

describe('trackLeadSent', () => {
  const lead = {
    product: 'girls-trip',
    entry: 'replaced-whatsapp',
    placement: 'trip-page-closing',
  };

  it('sends one ask-submit result=sent and one ask-lead per accepted lead', () => {
    const track = mock(() => undefined);

    trackLeadSent(lead, 'girls_trip_sales_post', track);

    expect(track.mock.calls).toEqual([
      ['ask-submit', { result: 'sent', ...lead }],
      ['ask-lead', { ...lead, campaign: 'girls_trip_sales_post' }],
    ]);
  });

  it('leaves the campaign out of ask-lead when the visit had none', () => {
    const track = mock(() => undefined);

    trackLeadSent(lead, undefined, track);

    expect(track).toHaveBeenLastCalledWith('ask-lead', lead);
  });
});

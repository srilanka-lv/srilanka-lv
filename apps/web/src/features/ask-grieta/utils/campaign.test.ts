import { describe, expect, it } from 'bun:test';

import { leadMetaSchema } from '../constants/lead-meta-schema';
import {
  CAMPAIGN_STORAGE_KEY,
  formatCampaign,
  loadCampaign,
  readCampaign,
  rememberCampaign,
} from './campaign';

const memoryStorage = () => {
  const items = new Map<string, string>();
  return {
    getItem: (key: string) => items.get(key) ?? null,
    setItem: (key: string, value: string) => {
      items.set(key, value);
    },
    items,
  };
};

const IG_LINK =
  '?utm_source=instagram&utm_medium=social&utm_campaign=girls_trip_sales_post&utm_source=ig';

describe('readCampaign', () => {
  it('reads the first value of each utm tag, lower-cased', () => {
    expect(readCampaign(IG_LINK)).toEqual({
      source: 'instagram',
      medium: 'social',
      campaign: 'girls_trip_sales_post',
    });
    expect(readCampaign('?utm_source=Instagram')).toEqual({ source: 'instagram' });
  });

  it('leaves out values that are not plain codes, and returns null without any', () => {
    expect(readCampaign('?utm_source=a%20b&utm_campaign=girls_trip')).toEqual({
      campaign: 'girls_trip',
    });
    expect(readCampaign('?ask=trip')).toBeNull();
    expect(readCampaign('')).toBeNull();
  });
});

describe('rememberCampaign', () => {
  it('keeps the first campaign of the visit', () => {
    const storage = memoryStorage();

    rememberCampaign(storage, IG_LINK);
    rememberCampaign(storage, '?utm_source=newsletter');

    expect(loadCampaign(storage)).toEqual({
      source: 'instagram',
      medium: 'social',
      campaign: 'girls_trip_sales_post',
    });
  });

  it('never throws when storage is blocked or holds junk', () => {
    const blocked = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    };
    expect(() => rememberCampaign(blocked, IG_LINK)).not.toThrow();
    expect(loadCampaign(blocked)).toBeNull();
    expect(loadCampaign(undefined)).toBeNull();

    const junk = memoryStorage();
    junk.items.set(CAMPAIGN_STORAGE_KEY, '{not json');
    expect(loadCampaign(junk)).toBeNull();
  });
});

describe('formatCampaign', () => {
  it('writes source/medium/campaign with a dash for a missing tag', () => {
    expect(formatCampaign({ source: 'instagram', campaign: 'girls_trip' })).toBe(
      'instagram/-/girls_trip',
    );
  });
});

describe('the lead meta campaign', () => {
  const meta = {
    page: '/produkti/meitenu-celojums-uz-srilanku',
    entry: 'replaced-whatsapp',
    placement: 'trip-page-closing',
    context: 'instagram-app',
  };

  it('travels with the lead when it is valid', () => {
    const parsed = leadMetaSchema.safeParse({ ...meta, campaign: { source: 'instagram' } });
    expect(parsed.success && parsed.data.campaign).toEqual({ source: 'instagram' });
  });

  it('is dropped on its own when it is not, and the rest of the meta is kept', () => {
    const parsed = leadMetaSchema.safeParse({ ...meta, campaign: { source: 'Robert <script>' } });
    expect(parsed.success).toBe(true);
    expect(parsed.success && parsed.data.campaign).toBeUndefined();
    expect(parsed.success && parsed.data.placement).toBe('trip-page-closing');
  });
});

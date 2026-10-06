import { z } from 'zod';

/**
 * The campaign a visit came from, from the landing URL's utm_source,
 * utm_medium and utm_campaign. Campaign codes only (Grieta's own link tags),
 * never anything about the visitor, so it can travel with a lead.
 */
const campaignValue = z
  .string()
  .regex(/^[a-z0-9_.-]{1,80}$/)
  .optional();

export const campaignSchema = z.object({
  source: campaignValue,
  medium: campaignValue,
  campaign: campaignValue,
});

export type Campaign = z.infer<typeof campaignSchema>;

/** The tab's first campaign, kept for the rest of the visit. */
export const CAMPAIGN_STORAGE_KEY = 'srilanka-lv:campaign';

const UTM_FIELDS = {
  source: 'utm_source',
  medium: 'utm_medium',
  campaign: 'utm_campaign',
} as const;

/**
 * The campaign in a query string, or null when it has none. The first value
 * of each tag wins (Instagram may append its own `utm_source`), values are
 * lower-cased, and a value that isn't a plain code is left out.
 */
export const readCampaign = (search: string): Campaign | null => {
  const params = new URLSearchParams(search);
  const campaign: Campaign = {};

  for (const [field, param] of Object.entries(UTM_FIELDS) as [keyof Campaign, string][]) {
    const value = params.get(param)?.trim().toLowerCase();
    if (value && campaignValue.safeParse(value).success) {
      campaign[field] = value;
    }
  }

  return Object.keys(campaign).length > 0 ? campaign : null;
};

type CampaignStorage = Pick<Storage, 'getItem' | 'setItem'>;

/** The tab's sessionStorage, or undefined where the browser blocks it. */
export const getSessionStorage = (): CampaignStorage | undefined => {
  try {
    return typeof window === 'undefined' ? undefined : window.sessionStorage;
  } catch {
    return undefined;
  }
};

/** The campaign remembered for this tab, or null. Never throws. */
export const loadCampaign = (storage: CampaignStorage | undefined): Campaign | null => {
  try {
    const stored = storage?.getItem(CAMPAIGN_STORAGE_KEY);
    if (!stored) {
      return null;
    }
    const parsed = campaignSchema.safeParse(JSON.parse(stored));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
};

/**
 * Remembers the landing campaign for the tab (first touch: a later tagged
 * link in the same visit doesn't overwrite it). Never throws, so blocked
 * storage only means no campaign on the lead.
 */
export const rememberCampaign = (storage: CampaignStorage | undefined, search: string): void => {
  try {
    if (!storage || loadCampaign(storage)) {
      return;
    }
    const campaign = readCampaign(search);
    if (campaign) {
      storage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(campaign));
    }
  } catch {
    // Storage blocked or full: the lead simply goes without a campaign.
  }
};

/** "instagram/social/girls_trip_sales_post", with "-" for a missing tag. */
export const formatCampaign = (campaign: Campaign): string =>
  [campaign.source, campaign.medium, campaign.campaign].map((value) => value ?? '-').join('/');

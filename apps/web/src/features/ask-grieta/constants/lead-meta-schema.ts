import { z } from 'zod';

/**
 * Where a lead came from, sent along with the form. Codes only, the same
 * ones analytics uses, so Grieta's email and Umami tell the same story.
 */
export const leadMetaSchema = z.object({
  page: z.string().startsWith('/').max(300),
  entry: z.enum(['floating', 'inline', 'replaced-whatsapp', 'deep-link', 'unknown']),
  placement: z.string().regex(/^[a-z0-9-]{1,80}$/),
  context: z.enum(['instagram-app', 'facebook-app', 'mobile', 'desktop', 'unknown']),
});

export type LeadMeta = z.infer<typeof leadMetaSchema>;

/** Used when the metadata doesn't parse: a lead is never refused over it. */
export const UNKNOWN_LEAD_META: LeadMeta = {
  page: '/',
  entry: 'unknown',
  placement: 'unknown',
  context: 'unknown',
};

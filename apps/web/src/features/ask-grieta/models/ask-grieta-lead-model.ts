import type { AskGrietaProductId } from '../constants/ask-grieta-products';
import type { LeadMeta } from '../constants/lead-meta-schema';

/** A validated lead, normalised for Grieta's inbox and Resend. */
export type AskGrietaLeadModel = LeadMeta & {
  product: AskGrietaProductId | null;
  name: string;
  /** E.164, e.g. +37126123456. */
  whatsapp: string;
  /** ISO 3166 code of the number's country. */
  country: string;
  email: string | null;
  message: string | null;
};

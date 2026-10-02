import { type FormSchema, formSchema } from '../components/ask-grieta-form/form-schema';
import { type LeadMeta, UNKNOWN_LEAD_META, leadMetaSchema } from '../constants/lead-meta-schema';
import type { AskGrietaLeadModel } from '../models/ask-grieta-lead-model';
import type { DeliverLeadResult } from './deliver-lead';
import { toE164 } from './phone';

export type SubmitAskGrietaInput = {
  lead: FormSchema;
  meta: LeadMeta;
  /** Honeypot: hidden from people, so only bots fill it in. */
  website?: string;
};

export type SubmitAskGrietaErrors = Partial<Record<keyof FormSchema, string>>;

export type SubmitAskGrietaResult =
  | { status: 'sent' }
  | { status: 'invalid'; errors: SubmitAskGrietaErrors }
  | { status: 'failed'; reason: 'email' | 'rate-limited' | 'server' };

type HandleLeadSubmissionDeps = {
  /** False when this visitor (or the whole form) is over its rate limit. */
  allow: () => boolean;
  deliver: (lead: AskGrietaLeadModel) => Promise<DeliverLeadResult>;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/**
 * Everything the server does with a submission, minus the request plumbing:
 * honeypot, the same validation as the drawer, the rate limit, then delivery.
 */
export async function handleLeadSubmission(
  input: unknown,
  { allow, deliver }: HandleLeadSubmissionDeps,
): Promise<SubmitAskGrietaResult> {
  const body = isRecord(input) ? input : {};

  // A bot that filled the honeypot gets the success it expects, and nothing is sent.
  if (typeof body.website === 'string' && body.website.trim()) {
    console.info('[ask-grieta] honeypot filled, submission dropped');
    return { status: 'sent' };
  }

  const parsed = formSchema.safeParse(body.lead);

  if (!parsed.success) {
    const errors: SubmitAskGrietaErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof FormSchema | undefined;
      if (field && !errors[field]) {
        errors[field] = issue.message;
      }
    }

    return { status: 'invalid', errors };
  }

  if (!allow()) {
    console.warn('[ask-grieta] submission rate limited');
    return { status: 'failed', reason: 'rate-limited' };
  }

  // Where the lead came from is nice to know, never a reason to refuse it.
  const meta = leadMetaSchema.safeParse(body.meta);
  const { product, name, country, phone, email, message } = parsed.data;

  const result = await deliver({
    ...(meta.success ? meta.data : UNKNOWN_LEAD_META),
    product: product as AskGrietaLeadModel['product'],
    name: name.trim(),
    whatsapp: toE164(country, phone),
    country,
    email: email.trim() || null,
    message: message.trim() || null,
  });

  return result.status === 'sent' ? { status: 'sent' } : result;
}

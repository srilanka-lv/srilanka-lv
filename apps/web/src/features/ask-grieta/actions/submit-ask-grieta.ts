'use server';

import { headers } from 'next/headers';

import { buildNewsletterRepository } from '@/features/newsletter/utils/build-newsletter-repository';

import { deliverLead } from '../utils/deliver-lead';
import { type SubmitAskGrietaResult, handleLeadSubmission } from '../utils/handle-lead-submission';
import { createRateLimiter } from '../utils/rate-limit';
import { errorMessageOf } from '../utils/redact-pii';

/** Grieta's inbox; LEAD_NOTIFICATION_EMAIL overrides it. */
const DEFAULT_LEAD_RECIPIENT = 'sveiki@srilanka.lv';

// A person sends one or two; a script hammering the form is cut off per
// address, and the global cap bounds the damage from many addresses.
const perVisitor = createRateLimiter({ limit: 5, windowMs: 15 * 60 * 1000 });
const overall = createRateLimiter({ limit: 60, windowMs: 60 * 60 * 1000, maxKeys: 1 });

const clientAddress = async (): Promise<string> => {
  const requestHeaders = await headers();

  return (
    requestHeaders.get('cf-connecting-ip') ??
    requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
};

/**
 * Ask Grieta drawer submit. Success means Grieta's lead email was accepted;
 * see deliverLead for the Resend contact and the retry.
 */
export async function submitAskGrieta(input: unknown): Promise<SubmitAskGrietaResult> {
  try {
    const address = await clientAddress();
    const leadId = crypto.randomUUID();

    return await handleLeadSubmission(input, {
      allow: () => perVisitor.take(address) && overall.take('all'),
      deliver: (lead) =>
        deliverLead(lead, {
          repository: buildNewsletterRepository(),
          recipient: process.env.LEAD_NOTIFICATION_EMAIL?.trim() || DEFAULT_LEAD_RECIPIENT,
          segmentId: process.env.RESEND_LEADS_SEGMENT_ID?.trim() || undefined,
          leadId,
          siteUrl: process.env.NEXT_PUBLIC_SELF_URL || undefined,
        }),
    });
  } catch (error) {
    console.error(`[ask-grieta] submission failed: ${errorMessageOf(error)}`);
    return { status: 'failed', reason: 'server' };
  }
}

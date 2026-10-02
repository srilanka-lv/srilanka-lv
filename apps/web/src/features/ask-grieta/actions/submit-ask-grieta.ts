'use server';

import { headers } from 'next/headers';

import { buildNewsletterRepository } from '@/features/newsletter/utils/build-newsletter-repository';

import { deliverLead } from '../utils/deliver-lead';
import { type SubmitAskGrietaResult, handleLeadSubmission } from '../utils/handle-lead-submission';
import { allowVisitor, createRateLimiter } from '../utils/rate-limit';
import { errorMessageOf } from '../utils/redact-pii';

/** Grieta's inbox; LEAD_NOTIFICATION_EMAIL overrides it. */
const DEFAULT_LEAD_RECIPIENT = 'sveiki@srilanka.lv';

// A person sends one or two; a script hammering the form is cut off per address.
const perVisitor = createRateLimiter({ limit: 5, windowMs: 15 * 60 * 1000 });

/**
 * Ask Grieta drawer submit. Success means Grieta's lead email was accepted;
 * see deliverLead for the Resend contact and the retry.
 */
export async function submitAskGrieta(input: unknown): Promise<SubmitAskGrietaResult> {
  try {
    const requestHeaders = await headers();
    const leadId = crypto.randomUUID();

    return await handleLeadSubmission(input, {
      allow: () => allowVisitor(perVisitor, requestHeaders),
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

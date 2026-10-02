import type { NewsletterRepositoryInterface } from '@/features/newsletter/interfaces/newsletter-repository-interface';

import type { AskGrietaLeadModel } from '../models/ask-grieta-lead-model';
import { buildLeadEmail } from './build-lead-email';
import { errorMessageOf } from './redact-pii';

export type LeadContactOutcome =
  | 'saved'
  | 'skipped-no-email'
  | 'skipped-no-segment'
  | 'skipped-existing'
  | 'failed';

export type DeliverLeadResult =
  | { status: 'sent'; contact: LeadContactOutcome }
  | { status: 'failed'; reason: 'email' };

type DeliverLeadOptions = {
  repository: Pick<NewsletterRepositoryInterface, 'sendEmail' | 'saveContact'>;
  /** Grieta's inbox. */
  recipient: string;
  /** The Resend leads segment; without it the contact step is skipped. */
  segmentId?: string;
  /** Unique per submission: the email's idempotency key, so a retry sends once. */
  leadId: string;
  now?: Date;
  retryDelayMs?: number;
  siteUrl?: string;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Sends the lead to Grieta, then saves the visitor as a Resend contact.
 *
 * The email is what makes a lead real: it is retried once, and only when it is
 * accepted does the visitor see success. The contact is a bonus: it needs an
 * email address (Resend keys contacts by email) and its failure never fails
 * the submission. Logs carry no personal data.
 */
export async function deliverLead(
  lead: AskGrietaLeadModel,
  {
    repository,
    recipient,
    segmentId,
    leadId,
    now = new Date(),
    retryDelayMs = 500,
    siteUrl,
  }: DeliverLeadOptions,
): Promise<DeliverLeadResult> {
  const email = {
    ...buildLeadEmail(lead, { to: recipient, now, siteUrl }),
    idempotencyKey: `ask-grieta-lead/${leadId}`,
  };

  let sent = false;

  for (let attempt = 1; attempt <= 2 && !sent; attempt += 1) {
    try {
      await repository.sendEmail(email);
      sent = true;
    } catch (error) {
      console.error(
        `[ask-grieta] lead ${leadId}: email attempt ${attempt} failed: ${errorMessageOf(error)}`,
      );
      if (attempt === 1) {
        await wait(retryDelayMs);
      }
    }
  }

  if (!sent) {
    return { status: 'failed', reason: 'email' };
  }

  if (!lead.email) {
    return { status: 'sent', contact: 'skipped-no-email' };
  }

  if (!segmentId) {
    console.warn(
      `[ask-grieta] lead ${leadId}: RESEND_LEADS_SEGMENT_ID is not set, contact skipped`,
    );
    return { status: 'sent', contact: 'skipped-no-segment' };
  }

  const [firstName, ...rest] = lead.name.trim().split(/\s+/);

  try {
    const saved = await repository.saveContact({
      email: lead.email,
      firstName,
      lastName: rest.length ? rest.join(' ') : undefined,
      segmentId,
      properties: {
        whatsapp: lead.whatsapp,
        ...(lead.product ? { product: lead.product } : {}),
      },
    });

    return { status: 'sent', contact: saved.existing ? 'skipped-existing' : 'saved' };
  } catch (error) {
    console.warn(`[ask-grieta] lead ${leadId}: contact not saved: ${errorMessageOf(error)}`);
    return { status: 'sent', contact: 'failed' };
  }
}

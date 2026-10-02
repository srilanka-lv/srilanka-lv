import { DefaultHttpClientProvider } from '@/features/http-client/providers/default-http-client-provider';
import { DefaultHttpClientRepository } from '@/features/http-client/repositories/default-http-client-repository';

import { NEWSLETTER_REPLY_TO, NEWSLETTER_SENDER } from '../constants/sender';
import type { NewsletterProviderInterface } from '../interfaces/newsletter-provider-interface';
import type { NewsletterAddContactResultModel } from '../models/newsletter-add-contact-result-model';
import type { NewsletterSaveContactInputModel } from '../models/newsletter-save-contact-input-model';
import type { NewsletterSendEmailInputModel } from '../models/newsletter-send-email-input-model';
import type { NewsletterSendEmailResultModel } from '../models/newsletter-send-email-result-model';

export const DEFAULT_MAILPIT_URL = 'http://localhost:8025';

type MailpitAddress = { Email: string; Name?: string };

/**
 * Splits `Name <email>` into the address shape Mailpit's send API takes.
 */
export function toMailpitAddress(address: string): MailpitAddress {
  const match = /^(.*?)\s*<([^>]+)>$/.exec(address.trim());

  if (!match) {
    return { Email: address.trim() };
  }

  return { Name: match[1], Email: match[2] };
}

/**
 * Local development provider: hands every email to Mailpit's HTTP send API,
 * so it lands in the local inbox at http://localhost:8025 and never leaves
 * the machine. Audiences and segments are a Resend-only concept, so
 * `addContact` and `saveContact` only log that they were skipped.
 */
export class MailpitProvider implements NewsletterProviderInterface {
  private readonly client: DefaultHttpClientRepository;

  constructor() {
    this.client = new DefaultHttpClientRepository(
      new DefaultHttpClientProvider({ baseUrl: DEFAULT_MAILPIT_URL }),
    );
  }

  public async addContact(email: string): Promise<NewsletterAddContactResultModel> {
    console.info(`[mailpit] addContact skipped for ${email}: audiences only exist on Resend`);

    return { id: 'mailpit-noop' };
  }

  public async saveContact({
    segmentId,
  }: NewsletterSaveContactInputModel): Promise<NewsletterAddContactResultModel> {
    // No address in the log: this one is a website visitor's.
    console.info(
      `[mailpit] saveContact skipped for segment ${segmentId}: segments only exist on Resend`,
    );

    return { id: 'mailpit-noop' };
  }

  public async sendEmail(
    input: NewsletterSendEmailInputModel,
  ): Promise<NewsletterSendEmailResultModel> {
    const { ID } = await this.client.post<{ ID: string }>('/api/v1/send', {
      From: toMailpitAddress(NEWSLETTER_SENDER),
      ReplyTo: [toMailpitAddress(input.replyTo ?? NEWSLETTER_REPLY_TO)],
      To: [toMailpitAddress(input.to)],
      Subject: input.subject,
      HTML: input.html,
      Text: input.text,
    });

    return { id: ID };
  }
}

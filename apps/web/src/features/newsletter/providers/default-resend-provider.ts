import { Resend } from 'resend';

import { NEWSLETTER_REPLY_TO, NEWSLETTER_SENDER } from '../constants/sender';
import type { NewsletterProviderInterface } from '../interfaces/newsletter-provider-interface';
import type { NewsletterAddContactResultModel } from '../models/newsletter-add-contact-result-model';
import type { NewsletterSaveContactInputModel } from '../models/newsletter-save-contact-input-model';
import type { NewsletterSendEmailInputModel } from '../models/newsletter-send-email-input-model';
import type { NewsletterSendEmailResultModel } from '../models/newsletter-send-email-result-model';

/** The parts of the Resend SDK this provider uses, so tests can pass a fake. */
export type ResendClient = Pick<Resend, 'contacts' | 'emails'>;

export class DefaultResendProvider implements NewsletterProviderInterface {
  private readonly client: ResendClient;
  private readonly audienceId: string;

  constructor(client?: ResendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!client && !apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    if (!audienceId) {
      throw new Error('RESEND_AUDIENCE_ID environment variable is not set');
    }

    this.client = client ?? new Resend(apiKey);
    this.audienceId = audienceId;
  }

  public async addContact(email: string): Promise<NewsletterAddContactResultModel> {
    const { data, error } = await this.client.contacts.create({
      email,
      audienceId: this.audienceId,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Failed to add contact to audience');
    }

    return { id: data.id };
  }

  /**
   * Creates a new contact in one segment. Contacts are global per email
   * address in Resend and anyone can type any address, so an existing contact
   * is never touched: the create fails and this throws.
   *
   * Custom properties only exist once they are created in Resend, and Resend
   * rejects the whole call for an unknown key, so a call with properties
   * that fails is repeated once without them: the contact matters more.
   */
  public async saveContact({
    email,
    firstName,
    lastName,
    segmentId,
    properties,
  }: NewsletterSaveContactInputModel): Promise<NewsletterAddContactResultModel> {
    const contact = { email, firstName, lastName };
    const segments = [{ id: segmentId }];

    let created = await this.client.contacts.create({ ...contact, properties, segments });

    if (created.error && properties) {
      created = await this.client.contacts.create({ ...contact, segments });
    }

    if (created.error || !created.data) {
      throw new Error(created.error?.message ?? 'Failed to save contact');
    }

    return { id: created.data.id };
  }

  public async sendEmail(
    input: NewsletterSendEmailInputModel,
  ): Promise<NewsletterSendEmailResultModel> {
    const { data, error } = await this.client.emails.send(
      {
        from: NEWSLETTER_SENDER,
        replyTo: input.replyTo ?? NEWSLETTER_REPLY_TO,
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
      },
      input.idempotencyKey ? { idempotencyKey: input.idempotencyKey } : undefined,
    );

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Failed to send email');
    }

    return { id: data.id };
  }
}

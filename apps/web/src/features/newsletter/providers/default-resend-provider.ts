import { Resend } from 'resend';

import type { NewsletterProviderInterface } from '../interfaces/newsletter-provider-interface';
import type { NewsletterAddContactResultModel } from '../models/newsletter-add-contact-result-model';

export class DefaultResendProvider implements NewsletterProviderInterface {
  private readonly client: Resend;
  private readonly audienceId: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    if (!audienceId) {
      throw new Error('RESEND_AUDIENCE_ID environment variable is not set');
    }

    this.client = new Resend(apiKey);
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

    return { id: data!.id };
  }
}

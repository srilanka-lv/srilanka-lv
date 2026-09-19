import type { NewsletterProviderInterface } from '../interfaces/newsletter-provider-interface';
import type { NewsletterRepositoryInterface } from '../interfaces/newsletter-repository-interface';
import type { NewsletterSendEmailInputModel } from '../models/newsletter-send-email-input-model';

export class DefaultNewsletterRepository implements NewsletterRepositoryInterface {
  readonly provider: NewsletterProviderInterface;

  constructor(provider: NewsletterProviderInterface) {
    this.provider = provider;
  }

  public async addContact(email: string) {
    return this.provider.addContact(email);
  }

  public async sendEmail(input: NewsletterSendEmailInputModel) {
    return this.provider.sendEmail(input);
  }
}

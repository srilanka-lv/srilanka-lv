import type { NewsletterProviderInterface } from '../interfaces/newsletter-provider-interface';
import type { NewsletterRepositoryInterface } from '../interfaces/newsletter-repository-interface';

export class DefaultNewsletterRepository implements NewsletterRepositoryInterface {
  readonly provider: NewsletterProviderInterface;

  constructor(provider: NewsletterProviderInterface) {
    this.provider = provider;
  }

  public async addContact(email: string) {
    return this.provider.addContact(email);
  }
}

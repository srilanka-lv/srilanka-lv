import type { NewsletterAddContactResultModel } from '../models/newsletter-add-contact-result-model';

export interface NewsletterProviderInterface {
  addContact(email: string): Promise<NewsletterAddContactResultModel>;
}

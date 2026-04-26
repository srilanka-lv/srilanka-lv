import type { NewsletterAddContactResultModel } from '../models/newsletter-add-contact-result-model';

export interface NewsletterRepositoryInterface {
  addContact(email: string): Promise<NewsletterAddContactResultModel>;
}

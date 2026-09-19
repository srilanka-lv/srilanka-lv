import type { NewsletterAddContactResultModel } from '../models/newsletter-add-contact-result-model';
import type { NewsletterSendEmailInputModel } from '../models/newsletter-send-email-input-model';
import type { NewsletterSendEmailResultModel } from '../models/newsletter-send-email-result-model';

export interface NewsletterProviderInterface {
  addContact(email: string): Promise<NewsletterAddContactResultModel>;
  sendEmail(input: NewsletterSendEmailInputModel): Promise<NewsletterSendEmailResultModel>;
}

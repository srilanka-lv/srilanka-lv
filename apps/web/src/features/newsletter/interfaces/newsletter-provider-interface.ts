import type { NewsletterAddContactResultModel } from '../models/newsletter-add-contact-result-model';
import type { NewsletterSaveContactInputModel } from '../models/newsletter-save-contact-input-model';
import type { NewsletterSaveContactResultModel } from '../models/newsletter-save-contact-result-model';
import type { NewsletterSendEmailInputModel } from '../models/newsletter-send-email-input-model';
import type { NewsletterSendEmailResultModel } from '../models/newsletter-send-email-result-model';

export interface NewsletterProviderInterface {
  addContact(email: string): Promise<NewsletterAddContactResultModel>;
  saveContact(input: NewsletterSaveContactInputModel): Promise<NewsletterSaveContactResultModel>;
  sendEmail(input: NewsletterSendEmailInputModel): Promise<NewsletterSendEmailResultModel>;
}

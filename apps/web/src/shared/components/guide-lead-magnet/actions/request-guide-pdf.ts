'use server';

import { DefaultResendProvider } from '@/features/newsletter/providers/default-resend-provider';
import { DefaultNewsletterRepository } from '@/features/newsletter/repositories/default-newsletter-repository';

import { formSchema } from '../constants/form-schema';
import { buildGuidePdfEmail } from '../constants/guide-pdf-email';

type RequestGuidePdfResult = { success: true } | { success: false; error: string };

/**
 * Subscribes the reader and mails them the link to the south coast PDF.
 *
 * The contact is added first so a lead is never lost to a delivery hiccup;
 * a send failure still surfaces as an error, so the reader is never told the
 * guide is on its way when it is not.
 */
export async function requestGuidePdf(data: { email: string }): Promise<RequestGuidePdfResult> {
  const parsed = formSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: 'Nederīga e-pasta adrese' };
  }

  try {
    const provider = new DefaultResendProvider();
    const repository = new DefaultNewsletterRepository(provider);

    await repository.addContact(parsed.data.email);
    await repository.sendEmail(buildGuidePdfEmail(parsed.data.email));

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Kaut kas nogāja greizi. Lūdzu, mēģini vēlreiz.',
    };
  }
}

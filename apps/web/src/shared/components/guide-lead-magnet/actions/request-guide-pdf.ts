'use server';

import { DefaultResendProvider } from '@/features/newsletter/providers/default-resend-provider';
import { DefaultNewsletterRepository } from '@/features/newsletter/repositories/default-newsletter-repository';

import { formSchema } from '../constants/form-schema';

type RequestGuidePdfResult = { success: true } | { success: false; error: string };

/**
 * Subscribes the reader and (once the file exists) mails them the south coast
 * PDF.
 *
 * TODO(pdf): the delivery step is NOT built. Adding the contact works, so the
 * address is captured, but nothing is sent yet. Before this ships:
 *   1. Put the PDF somewhere the server can read it, or upload it to Resend.
 *   2. Add a `sendGuidePdf` method to `NewsletterProviderInterface` and
 *      implement it in `DefaultResendProvider` with `client.emails.send`.
 *   3. Call it below and let a delivery failure surface as an error, so the
 *      reader is never told the file is on its way when it is not.
 *   4. Remove the placeholder note from the block's copy.
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

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Kaut kas nogāja greizi. Lūdzu, mēģini vēlreiz.',
    };
  }
}

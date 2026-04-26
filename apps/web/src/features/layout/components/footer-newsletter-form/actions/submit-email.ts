'use server';

import { DefaultResendProvider } from '@/features/newsletter/providers/default-resend-provider';
import { DefaultNewsletterRepository } from '@/features/newsletter/repositories/default-newsletter-repository';

import { formSchema } from '../constants/form-schema';

type SubmitEmailResult = { success: true } | { success: false; error: string };

export async function submitEmail(data: { email: string }): Promise<SubmitEmailResult> {
  const parsed = formSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: 'Invalid email address' };
  }

  try {
    const provider = new DefaultResendProvider();
    const repository = new DefaultNewsletterRepository(provider);

    await repository.addContact(parsed.data.email);

    return { success: true };
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}

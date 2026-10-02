import type { NewsletterProviderInterface } from '../interfaces/newsletter-provider-interface';
import { DefaultResendProvider } from '../providers/default-resend-provider';
import { MailpitProvider } from '../providers/mailpit-provider';
import { DefaultNewsletterRepository } from '../repositories/default-newsletter-repository';

type EmailTransportEnv = {
  EMAIL_TRANSPORT?: string;
  NODE_ENV?: string;
};

/**
 * Picks where email goes from `EMAIL_TRANSPORT`. Unset (or `resend`) means
 * Resend, so production keeps working with no extra config. `mailpit` sends
 * to the local Mailpit inbox and is refused in production, and any other
 * value throws rather than guessing, so a typo never quietly sends real email.
 */
export function buildNewsletterProvider(
  env: EmailTransportEnv = process.env,
): NewsletterProviderInterface {
  const transport = env.EMAIL_TRANSPORT?.trim() || 'resend';

  if (transport === 'resend') {
    return new DefaultResendProvider();
  }

  if (transport === 'mailpit') {
    if (env.NODE_ENV === 'production') {
      throw new Error('EMAIL_TRANSPORT=mailpit is not allowed in production');
    }

    return new MailpitProvider();
  }

  throw new Error(`Unknown EMAIL_TRANSPORT "${transport}": use "resend" or "mailpit"`);
}

export const buildNewsletterRepository = () =>
  new DefaultNewsletterRepository(buildNewsletterProvider());

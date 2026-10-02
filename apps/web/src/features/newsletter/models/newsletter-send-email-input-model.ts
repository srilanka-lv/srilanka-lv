export type NewsletterSendEmailInputModel = {
  to: string;
  subject: string;
  html: string;
  text: string;
  /** Defaults to the site's own inbox. */
  replyTo?: string;
  /** Lets a retry of the same email be sent at most once. */
  idempotencyKey?: string;
};

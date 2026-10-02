export type NewsletterSaveContactInputModel = {
  email: string;
  firstName?: string;
  lastName?: string;
  /** The Resend segment (formerly audience) the contact belongs in. */
  segmentId: string;
  /**
   * Resend custom contact properties. Each key must first be created under
   * Audience → Properties in Resend, or Resend rejects it.
   */
  properties?: Record<string, string>;
};

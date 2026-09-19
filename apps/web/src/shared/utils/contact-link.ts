import { INSTAGRAM_DM_URL } from '@/shared/constants/instagram';
import { buildWhatsAppUrl } from '@/shared/constants/whatsapp';

export type ContactChannel = 'whatsapp' | 'instagram';

export type ContactLinkTarget = {
  href: string;
  channel: ContactChannel;
  title: string;
  /** `_blank` for desktop browsers; same-tab on mobile so the OS hands off to the app. */
  target: '_blank' | undefined;
};

// Instagram and Facebook in-app browsers (iOS and Android) identify themselves in the UA.
const IN_APP_BROWSER_PATTERN = /\bInstagram\b|\bFBAN\b|\bFBAV\b|\bFB_IAB\b|\bFBIOS\b/i;

const MOBILE_PATTERN = /Android|iPhone|iPad|iPod|Mobile/i;

export const isInAppBrowser = (userAgent: string): boolean =>
  IN_APP_BROWSER_PATTERN.test(userAgent);

export const isMobileUserAgent = (userAgent: string): boolean => MOBILE_PATTERN.test(userAgent);

// Server-rendered default, also what a visitor without JavaScript gets.
export const DEFAULT_CONTACT_LINK: ContactLinkTarget = {
  href: buildWhatsAppUrl(),
  channel: 'whatsapp',
  title: 'Chat on WhatsApp',
  target: '_blank',
};

export const resolveContactLink = (userAgent: string): ContactLinkTarget => {
  if (isInAppBrowser(userAgent)) {
    return {
      href: INSTAGRAM_DM_URL,
      channel: 'instagram',
      title: 'Message on Instagram',
      target: undefined,
    };
  }

  if (isMobileUserAgent(userAgent)) {
    return { ...DEFAULT_CONTACT_LINK, target: undefined };
  }

  return DEFAULT_CONTACT_LINK;
};

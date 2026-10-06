import { INSTAGRAM_DM_URL } from '@/shared/constants/instagram';
import { buildWhatsAppUrl } from '@/shared/constants/whatsapp';

export type ContactChannel = 'whatsapp' | 'instagram';

// Where the visitor clicked from, reported to Umami next to the channel.
export type ContactContext = 'instagram-app' | 'facebook-app' | 'mobile' | 'desktop';

export type ContactLinkTarget = {
  href: string;
  channel: ContactChannel;
  title: string;
  /** `_blank` for desktop browsers; same-tab on mobile so the OS hands off to the app. */
  target: '_blank' | undefined;
  context: ContactContext;
};

// Instagram and Facebook in-app browsers (iOS and Android) identify themselves in the UA.
export const IN_APP_BROWSER_PATTERN = /\bInstagram\b|\bFBAN\b|\bFBAV\b|\bFB_IAB\b|\bFBIOS\b/i;

export const INSTAGRAM_APP_PATTERN = /\bInstagram\b/i;

export const MOBILE_PATTERN = /Android|iPhone|iPad|iPod|Mobile/i;

// Hosts of a "chat with this number" link, however it was written.
export const WHATSAPP_CHAT_HOST_PATTERN = /^(wa\.me|api\.whatsapp\.com)$/i;

export const isInAppBrowser = (userAgent: string): boolean =>
  IN_APP_BROWSER_PATTERN.test(userAgent);

export const isMobileUserAgent = (userAgent: string): boolean => MOBILE_PATTERN.test(userAgent);

// Server-rendered default, also what a visitor without JavaScript gets. Before
// hydration the <head> contact link guard corrects it at click time.
export const DEFAULT_CONTACT_LINK: ContactLinkTarget = {
  href: buildWhatsAppUrl(),
  channel: 'whatsapp',
  title: 'Raksti man WhatsApp',
  target: '_blank',
  context: 'desktop',
};

export const resolveContactLink = (userAgent: string): ContactLinkTarget => {
  if (isInAppBrowser(userAgent)) {
    return {
      href: INSTAGRAM_DM_URL,
      channel: 'instagram',
      title: 'Raksti man Instagram',
      target: undefined,
      context: INSTAGRAM_APP_PATTERN.test(userAgent) ? 'instagram-app' : 'facebook-app',
    };
  }

  if (isMobileUserAgent(userAgent)) {
    return { ...DEFAULT_CONTACT_LINK, target: undefined, context: 'mobile' };
  }

  return DEFAULT_CONTACT_LINK;
};

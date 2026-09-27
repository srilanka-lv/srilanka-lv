import { INSTAGRAM_DM_URL } from '@/shared/constants/instagram';
import {
  INSTAGRAM_APP_PATTERN,
  IN_APP_BROWSER_PATTERN,
  MOBILE_PATTERN,
  WHATSAPP_CHAT_HOST_PATTERN,
} from '@/shared/utils/contact-link';
import { type ContactLinkGuardConfig, contactLinkGuard } from '@/shared/utils/contact-link-guard';

const config: ContactLinkGuardConfig = {
  instagramDmUrl: INSTAGRAM_DM_URL,
  inAppBrowserPattern: IN_APP_BROWSER_PATTERN.source,
  instagramAppPattern: INSTAGRAM_APP_PATTERN.source,
  mobilePattern: MOBILE_PATTERN.source,
  whatsAppChatHostPattern: WHATSAPP_CHAT_HOST_PATTERN.source,
};

const script = `(${contactLinkGuard.toString()})(${JSON.stringify(config)});`;

// In <head>, so it listens before React hydrates and before Umami loads.
export function ContactLinkGuardScript() {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: Inline so every WhatsApp click is handled before hydration; the content is our own code and constants.
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

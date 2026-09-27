export type ContactLinkGuardConfig = {
  instagramDmUrl: string;
  inAppBrowserPattern: string;
  instagramAppPattern: string;
  mobilePattern: string;
  whatsAppChatHostPattern: string;
};

/**
 * Makes every WhatsApp link on the site behave like ContactLink, including
 * links typed into Sanity content and clicks that land before React hydrates.
 * At click time, in capture phase and before Umami reads the link:
 * - inside the Instagram/Facebook in-app browsers the link becomes an
 *   Instagram DM, because wa.me strands the visitor on a WhatsApp web page
 * - on mobile it opens in the same tab, so the OS hands off to the app
 * - it is tagged as a `contact` event with channel, context and placement
 *
 * Runs as an inline <head> script via `.toString()`, so it must stay
 * self-contained: no imports and nothing from module scope.
 */
export function contactLinkGuard(config: ContactLinkGuardConfig): void {
  const inAppBrowser = new RegExp(config.inAppBrowserPattern, 'i');
  const instagramApp = new RegExp(config.instagramAppPattern, 'i');
  const mobile = new RegExp(config.mobilePattern, 'i');
  const whatsAppChatHost = new RegExp(config.whatsAppChatHostPattern, 'i');

  document.addEventListener(
    'click',
    (event) => {
      const target = event.target;
      const anchor = target instanceof Element ? target.closest('a[href]') : null;

      if (!(anchor instanceof HTMLAnchorElement) || !whatsAppChatHost.test(anchor.hostname)) {
        return;
      }

      const userAgent = navigator.userAgent;
      let channel = 'whatsapp';
      let context = 'desktop';

      if (inAppBrowser.test(userAgent)) {
        anchor.href = config.instagramDmUrl;
        anchor.removeAttribute('target');
        channel = 'instagram';
        context = instagramApp.test(userAgent) ? 'instagram-app' : 'facebook-app';
      } else if (mobile.test(userAgent)) {
        anchor.removeAttribute('target');
        context = 'mobile';
      }

      anchor.setAttribute('data-umami-event', 'contact');
      anchor.setAttribute('data-umami-event-channel', channel);
      anchor.setAttribute('data-umami-event-context', context);
      anchor.removeAttribute('data-umami-event-url');

      // Links from Sanity content carry no placement of their own.
      if (!anchor.hasAttribute('data-umami-event-placement')) {
        anchor.setAttribute('data-umami-event-placement', 'content');
      }
    },
    true,
  );
}

'use client';

import { type ComponentPropsWithoutRef, type FunctionComponent, useEffect, useState } from 'react';

import { DEFAULT_CONTACT_LINK, resolveContactLink } from '@/shared/utils/contact-link';

type ContactLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'target' | 'rel'> & {
  // Where on the site the link sits, unique per button, so Umami can tell
  // contact clicks apart. Kebab-case, e.g. `footer-about-me`.
  placement: string;
};

/**
 * "Write to Grieta" link. Renders as WhatsApp on the server; after mount it
 * switches to an Instagram DM inside the Instagram/Facebook in-app browsers,
 * where wa.me hand-off is unreliable, and drops `target="_blank"` on mobile so
 * the OS opens the messaging app instead of a dead browser tab.
 *
 * Umami reads the data attributes at click time, so the `contact` event carries
 * the channel the visitor actually got, the placement, and the browser context.
 * ContactHandoffTracker follows up with whether the app actually opened, and
 * ContactLinkGuardScript covers clicks that land before hydration.
 */
export const ContactLink: FunctionComponent<ContactLinkProps> = ({
  children,
  title,
  placement,
  ...anchorProps
}) => {
  const [link, setLink] = useState(DEFAULT_CONTACT_LINK);

  useEffect(() => {
    setLink(resolveContactLink(navigator.userAgent));
  }, []);

  return (
    <a
      {...anchorProps}
      href={link.href}
      target={link.target}
      rel={link.target ? 'noopener noreferrer' : undefined}
      title={title ?? link.title}
      data-umami-event="contact"
      data-umami-event-channel={link.channel}
      data-umami-event-placement={placement}
      data-umami-event-context={link.context}
    >
      {children}
    </a>
  );
};

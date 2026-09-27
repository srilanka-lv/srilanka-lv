'use client';

import { type ComponentPropsWithoutRef, type FunctionComponent, useEffect, useState } from 'react';

import { DEFAULT_CONTACT_LINK, resolveContactLink } from '@/shared/utils/contact-link';

type ContactLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'target' | 'rel'> & {
  // Where on the site the link sits, so Umami can tell contact clicks apart
  placement?: string;
};

/**
 * "Write to Grieta" link. Renders as WhatsApp on the server; after mount it
 * switches to an Instagram DM inside the Instagram/Facebook in-app browsers,
 * where wa.me hand-off is unreliable, and drops `target="_blank"` on mobile so
 * the OS opens the messaging app instead of a dead browser tab.
 *
 * Umami reads the data attributes at click time, so the reported channel is
 * the one the visitor actually used, plus the placement when one is given.
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
    >
      {children}
    </a>
  );
};

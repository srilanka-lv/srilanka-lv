'use client';

import { type ComponentPropsWithoutRef, type FunctionComponent, useEffect, useState } from 'react';

import { DEFAULT_CONTACT_LINK, resolveContactLink } from '@/shared/utils/contact-link';

type ContactLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'target' | 'rel'>;

/**
 * "Write to Grieta" link. Renders as WhatsApp on the server; after mount it
 * switches to an Instagram DM inside the Instagram/Facebook in-app browsers,
 * where wa.me hand-off is unreliable, and drops `target="_blank"` on mobile so
 * the OS opens the messaging app instead of a dead browser tab.
 *
 * Umami reads the data attributes at click time, so the reported channel is
 * the one the visitor actually used.
 */
export const ContactLink: FunctionComponent<ContactLinkProps> = ({
  children,
  title,
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
    >
      {children}
    </a>
  );
};

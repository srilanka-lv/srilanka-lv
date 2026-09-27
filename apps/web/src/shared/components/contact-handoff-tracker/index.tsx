'use client';

import { type FunctionComponent, useEffect } from 'react';

import { watchContactHandoff } from '@/shared/utils/contact-handoff';

const HANDOFF_CHANNELS = new Set(['whatsapp', 'instagram']);

/**
 * Watches every WhatsApp or Instagram DM click on the site, whatever rendered
 * the link, and reports whether the app actually opened. Registered after the
 * <head> contact link guard, so it reads the attributes the guard settled.
 */
export const ContactHandoffTracker: FunctionComponent = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const target = event.target;
      const anchor =
        target instanceof Element ? target.closest('a[data-umami-event="contact"]') : null;
      const channel = anchor?.getAttribute('data-umami-event-channel');

      if (!anchor || !channel || !HANDOFF_CHANNELS.has(channel)) {
        return;
      }

      watchContactHandoff({
        channel,
        placement: anchor.getAttribute('data-umami-event-placement') ?? 'content',
        context: anchor.getAttribute('data-umami-event-context') ?? 'unknown',
      });
    };

    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
};

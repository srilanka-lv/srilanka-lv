'use client';

import type { FunctionComponent, MouseEvent, ReactNode } from 'react';

import { emitTripEngagement } from '@/shared/utils/trip-engagement';

type TripPageAnchorLinkProps = {
  /** The id of the section to scroll to, without '#'. */
  sectionId: string;
  /** Short name reported with the click, e.g. 'included'. */
  target: string;
  /** Where on the page the link sits, reported with the click. */
  placement: string;
  className?: string;
  children: ReactNode;
};

/**
 * A link to a section of the trip page. A plain '#' link pushes a history
 * entry that Next's router does not own, so Back after leaving the page
 * showed the trip page's URL over the previous page. This scrolls instead
 * (instantly for reduced motion), keeps the href for no-JS and new tabs, and
 * reports the click.
 */
export const TripPageAnchorLink: FunctionComponent<TripPageAnchorLinkProps> = ({
  sectionId,
  target,
  placement,
  className,
  children,
}) => {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    emitTripEngagement(event.currentTarget, { type: 'anchor-click', target, placement });

    const section = document.getElementById(sectionId);
    // Modified clicks (new tab, new window) keep the browser's behaviour.
    if (!section || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <a className={className} href={`#${sectionId}`} onClick={onClick}>
      {children}
    </a>
  );
};

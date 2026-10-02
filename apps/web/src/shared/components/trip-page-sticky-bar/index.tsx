'use client';

import { type FunctionComponent, useEffect, useState } from 'react';

import { ContactLink } from '@/shared/components/contact-link';
import { useTripPageBookingPhase } from '@/shared/components/trip-page-booking-provider';

import { ASK_LABEL, TripPageReserveButton } from '../trip-page-booking-cta';
import { TripPagePrice } from '../trip-page-price';
import { stickyBarActionStyle, stickyBarStyles } from './styles.css';

type TripPageStickyBarProps = {
  /**
   * Ids of the blocks that already show the buttons. The bar hides while any
   * of them, or the footer, is on screen.
   */
  hideWhileVisibleIds: string[];
};

/**
 * A slim bar pinned to the bottom of the screen on phones and tablets, with
 * the price and the reserve button, so the next step is never more than a
 * thumb away. It steps aside while the facts card or the closing section,
 * which carry the same buttons, are on screen, and over the footer, which it
 * would otherwise cover.
 */
export const TripPageStickyBar: FunctionComponent<TripPageStickyBarProps> = ({
  hideWhileVisibleIds,
}) => {
  const phase = useTripPageBookingPhase();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const targets = [
      ...hideWhileVisibleIds.map((id) => document.getElementById(id)),
      document.querySelector('footer'),
    ].filter((element): element is HTMLElement => element !== null);

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          onScreen.add(entry.target);
        } else {
          onScreen.delete(entry.target);
        }
      }
      setIsVisible(onScreen.size === 0);
    });

    for (const target of targets) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [hideWhileVisibleIds]);

  return (
    <div className={stickyBarStyles[isVisible ? 'visible' : 'hidden']} aria-hidden={!isVisible}>
      <TripPagePrice variant="compact" />
      {phase === 'closed' ? (
        <ContactLink
          className={stickyBarActionStyle}
          placement="trip-page-ask-sticky-bar"
          tabIndex={isVisible ? undefined : -1}
        >
          {ASK_LABEL}
        </ContactLink>
      ) : (
        <TripPageReserveButton
          className={stickyBarActionStyle}
          placement="sticky-bar"
          tabIndex={isVisible ? undefined : -1}
        />
      )}
    </div>
  );
};

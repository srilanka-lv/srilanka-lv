'use client';

import { type FunctionComponent, useEffect, useRef, useState } from 'react';

import { useTripPageBookingPhase } from '@/shared/components/trip-page-booking-provider';

import { TripPageAskButton, TripPageReserveButton } from '../trip-page-booking-cta';
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
  const barRef = useRef<HTMLDivElement>(null);

  // Lift the floating Ask Grieta button above the bar while the bar shows
  // (only below lg, where the bar exists at all).
  useEffect(() => {
    const root = document.documentElement;
    const bar = barRef.current;
    if (!bar) {
      return;
    }

    const update = () => {
      const height = bar.offsetHeight;
      root.style.setProperty(
        '--bottom-bar-offset',
        isVisible && height > 0 ? `${height}px` : '0px',
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(bar);

    return () => {
      observer.disconnect();
      root.style.removeProperty('--bottom-bar-offset');
    };
  }, [isVisible]);

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
    // `inert` keeps the off-screen bar's buttons out of the tab order and away
    // from screen readers while it is hidden.
    <div
      ref={barRef}
      className={stickyBarStyles[isVisible ? 'visible' : 'hidden']}
      inert={!isVisible}
    >
      <TripPagePrice variant="compact" />
      {phase === 'closed' ? (
        <TripPageAskButton className={stickyBarActionStyle} placement="sticky-bar" />
      ) : (
        <TripPageReserveButton className={stickyBarActionStyle} placement="sticky-bar" />
      )}
    </div>
  );
};

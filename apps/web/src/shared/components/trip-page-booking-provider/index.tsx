'use client';

import {
  type FunctionComponent,
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  type GirlsTripBookingPhase,
  getGirlsTripBookingPhase,
  getMsUntilNextGirlsTripPhase,
} from '@/shared/constants/girls-trip-booking';

const TripPageBookingContext = createContext<GirlsTripBookingPhase>('early-bird');

// setTimeout overflows past ~24.8 days; a page open that long just reloads.
const MAX_TIMEOUT_MS = 2 ** 31 - 1;

type TripPageBookingProviderProps = PropsWithChildren<{
  /** The phase at render time on the server, so the HTML is right without JavaScript. */
  initialPhase: GirlsTripBookingPhase;
}>;

/**
 * Holds the booking phase (early-bird, regular, closed) for the trip page.
 * The page is statically rendered and revalidated hourly, so the server's
 * phase can be up to an hour old: the browser re-checks it on load and flips
 * it at the exact cut-off if the page is still open.
 */
export const TripPageBookingProvider: FunctionComponent<TripPageBookingProviderProps> = ({
  initialPhase,
  children,
}) => {
  const [phase, setPhase] = useState(initialPhase);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      const now = Date.now();
      setPhase(getGirlsTripBookingPhase(now));

      const msUntilNext = getMsUntilNextGirlsTripPhase(now);
      if (msUntilNext !== null && msUntilNext < MAX_TIMEOUT_MS) {
        timeout = setTimeout(update, msUntilNext);
      }
    };

    update();

    return () => clearTimeout(timeout);
  }, []);

  return <TripPageBookingContext value={phase}>{children}</TripPageBookingContext>;
};

export const useTripPageBookingPhase = (): GirlsTripBookingPhase =>
  useContext(TripPageBookingContext);

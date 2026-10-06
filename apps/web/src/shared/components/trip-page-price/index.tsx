'use client';

import clsx from 'clsx';
import { CalendarDays } from 'lucide-react';
import type { FunctionComponent } from 'react';

import { useTripPageBookingPhase } from '@/shared/components/trip-page-booking-provider';
import {
  GIRLS_TRIP_BOOKING_LAST_DAY_DISPLAY,
  GIRLS_TRIP_EARLY_BIRD_DISCOUNT_EUR,
  GIRLS_TRIP_EARLY_BIRD_LAST_DAY_DISPLAY,
  GIRLS_TRIP_EARLY_BIRD_LAST_DAY_SHORT_DISPLAY,
  GIRLS_TRIP_PRICE_EUR,
  formatEur,
  getGirlsTripPriceEur,
} from '@/shared/constants/girls-trip-booking';

import {
  amountStyle,
  deadlineStyle,
  offerAfterStyle,
  offerDeadlineIconStyle,
  offerDeadlineStyle,
  offerEarlyBirdStyle,
  offerStyle,
  perPersonStyle,
  priceRowStyle,
  priceStyles,
  regularAmountStyle,
  visuallyHiddenStyle,
} from './styles.css';

type TripPagePriceProps = {
  /** `full` for the facts card and closing section, `compact` for the sticky bar. */
  variant?: 'full' | 'compact';
  className?: string;
};

/**
 * The trip price as it stands right now: the early-bird price with the full
 * price struck through until 31 October, then the full price, plus the
 * booking deadline. Switches by itself at each cut-off.
 */
export const TripPagePrice: FunctionComponent<TripPagePriceProps> = ({
  variant = 'full',
  className,
}) => {
  const phase = useTripPageBookingPhase();
  const isEarlyBird = phase === 'early-bird';
  const price = formatEur(getGirlsTripPriceEur(phase));

  if (variant === 'compact') {
    return (
      <span className={clsx(priceStyles.compact, className)}>
        <span className={amountStyle}>{price}</span>
        {isEarlyBird ? (
          <span className={deadlineStyle}>
            agrā cena līdz {GIRLS_TRIP_EARLY_BIRD_LAST_DAY_SHORT_DISPLAY}
          </span>
        ) : (
          <span className={deadlineStyle}>no personas</span>
        )}
      </span>
    );
  }

  return (
    <div className={clsx(priceStyles.full, className)}>
      <div className={priceRowStyle}>
        <span className={amountStyle}>{price}</span>
        {isEarlyBird && (
          <s className={regularAmountStyle}>
            <span className={visuallyHiddenStyle}>Parastā cena </span>
            {formatEur(GIRLS_TRIP_PRICE_EUR)}
          </s>
        )}
        <span className={perPersonStyle}>no personas</span>
      </div>
      {/* The saving and the deadline as one strip: what changes on 31 October,
          and when booking stops. */}
      <div className={offerStyle}>
        {isEarlyBird && (
          <p className={offerEarlyBirdStyle}>
            <strong>
              −{formatEur(GIRLS_TRIP_EARLY_BIRD_DISCOUNT_EUR)}, piesakoties līdz{' '}
              {GIRLS_TRIP_EARLY_BIRD_LAST_DAY_DISPLAY}.
            </strong>{' '}
            <span className={offerAfterStyle}>
              Pēc tam cena būs {formatEur(GIRLS_TRIP_PRICE_EUR)}.
            </span>
          </p>
        )}
        <p className={offerDeadlineStyle}>
          <CalendarDays className={offerDeadlineIconStyle} aria-hidden="true" strokeWidth={1.75} />
          {phase === 'closed'
            ? 'Pieteikšanās ir slēgta.'
            : `Pieteikšanās līdz ${GIRLS_TRIP_BOOKING_LAST_DAY_DISPLAY}.`}
        </p>
      </div>
    </div>
  );
};

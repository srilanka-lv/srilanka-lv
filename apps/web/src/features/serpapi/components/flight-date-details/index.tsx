'use client';

import type { FunctionComponent, ReactNode } from 'react';

import { trackEvent } from '@/shared/utils/analytics';

type FlightDateDetailsProps = {
  className: string;
  date: string;
  price: number;
  children: ReactNode;
};

// Client boundary for the date row's <details>, so opening a date can be
// tracked while the row itself stays a server component. Only opening counts;
// collapsing a row again is not an action worth measuring.
export const FlightDateDetails: FunctionComponent<FlightDateDetailsProps> = ({
  className,
  date,
  price,
  children,
}) => (
  <details
    className={className}
    onToggle={(event) => {
      if (event.currentTarget.open) {
        void trackEvent('flight-date-expand', { date, price });
      }
    }}
  >
    {children}
  </details>
);

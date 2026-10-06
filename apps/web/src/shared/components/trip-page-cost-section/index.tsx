'use client';

import { PAGES } from '@packages/sanity/constants/pages-slugs';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { useTripPageBookingPhase } from '@/shared/components/trip-page-booking-provider';
import {
  GIRLS_TRIP_DAYS,
  GIRLS_TRIP_EARLY_BIRD_LAST_DAY_DISPLAY,
  GIRLS_TRIP_FLIGHTS_FROM_EUR,
  GIRLS_TRIP_INSURANCE_EUR,
  GIRLS_TRIP_MEALS_PER_DAY_EUR,
  formatEur,
  getGirlsTripPriceEur,
  getGirlsTripTotalEur,
} from '@/shared/constants/girls-trip-booking';
import { quietLinkStyle } from '@/shared/styles/quiet-link.css';

import { TripPageSection } from '../trip-page-section';
import {
  costAmountStyle,
  costLabelStyle,
  costNoteStyle,
  costRowStyle,
  costTableStyle,
  costTotalRowStyle,
} from './styles.css';

export const TRIP_PAGE_COST_SECTION_ID = 'cik-izmaksas-kopa';

type Row = { label: ReactNode; note?: ReactNode; amount: ReactNode };

/**
 * An honest example of the whole cost: the trip price as it stands today,
 * flights from the site's own January price data, and Grieta's estimates for
 * the extras the price leaves out, added up from the booking config.
 */
export const TripPageCostSection = () => {
  const phase = useTripPageBookingPhase();
  const price = getGirlsTripPriceEur(phase);

  const rows: Row[] = [
    {
      label: 'Ceļojums',
      note:
        phase === 'early-bird'
          ? `agrā cena, piesakoties līdz ${GIRLS_TRIP_EARLY_BIRD_LAST_DAY_DISPLAY}`
          : undefined,
      amount: formatEur(price),
    },
    {
      label: (
        <Link className={quietLinkStyle} href={`/${PAGES.LV.FLIGHT_TICKETS}`}>
          Lidojums Rīga–Kolombo un atpakaļ
        </Link>
      ),
      note: `janvārī lētākās biļetes ir ap ${formatEur(GIRLS_TRIP_FLIGHTS_FROM_EUR / 2)} vienā virzienā`,
      amount: `no ~${formatEur(GIRLS_TRIP_FLIGHTS_FROM_EUR)}`,
    },
    {
      label: 'Pusdienas un vakariņas',
      note: `ap ${formatEur(GIRLS_TRIP_MEALS_PER_DAY_EUR)} dienā, brokastis jau ir iekļautas cenā`,
      amount: `~${formatEur(GIRLS_TRIP_DAYS * GIRLS_TRIP_MEALS_PER_DAY_EUR)}`,
    },
    {
      label: 'Ceļojuma apdrošināšana',
      note: `${GIRLS_TRIP_DAYS} dienām`,
      amount: `~${formatEur(GIRLS_TRIP_INSURANCE_EUR)}`,
    },
  ];

  return (
    <TripPageSection
      id={TRIP_PAGE_COST_SECTION_ID}
      title="Cik tas izmaksās kopā?"
      trackingId="cost"
    >
      <p>
        Lai nebūtu pārsteigumu, te ir piemērs, cik ceļojums izmaksās kopā ar visu, kas nav iekļauts
        cenā.
      </p>
      <table className={costTableStyle}>
        <tbody>
          {rows.map(({ label, note, amount }, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static rows, labels can be JSX.
            <tr key={index} className={costRowStyle}>
              <th scope="row" className={costLabelStyle}>
                {label}
                {note && <span className={costNoteStyle}>{note}</span>}
              </th>
              <td className={costAmountStyle}>{amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className={costTotalRowStyle}>
            <th scope="row" className={costLabelStyle}>
              Kopā aptuveni
            </th>
            <td className={costAmountStyle}>~{formatEur(getGirlsTripTotalEur(phase))}</td>
          </tr>
        </tfoot>
      </table>
    </TripPageSection>
  );
};

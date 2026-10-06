'use client';

import Image from 'next/image';

import { useTripPageBookingPhase } from '@/shared/components/trip-page-booking-provider';
import {
  GIRLS_TRIP_RESERVATION_EUR,
  formatEur,
  formatLkr,
  getGirlsTripBalanceEur,
  getGirlsTripBalanceLkr,
} from '@/shared/constants/girls-trip-booking';
import {
  GIRLS_TRIP_PARTNER_PRODUCT_CAMPAIGN_URL,
  GIRLS_TRIP_PARTNER_PRODUCT_URL,
} from '@/shared/constants/girls-trip-partner-url';
import {
  GIRLS_TRIP_GO_NO_GO_TEXT,
  GIRLS_TRIP_GUEST_CANCELS_TEXT,
} from '@/shared/constants/girls-trip-terms';
import { quietLinkStyle } from '@/shared/styles/quiet-link.css';

import { TripPageSection } from '../trip-page-section';
import {
  operatorLinkStyle,
  operatorLogoStyle,
  operatorStyle,
  stepAmountStyle,
  stepBodyStyle,
  stepStyle,
  stepTitleStyle,
  stepsStyle,
  termsStyle,
  termsTitleStyle,
} from './styles.css';

export const TRIP_PAGE_PAYMENT_SECTION_ID = 'maksajums';

/**
 * How the money moves: the reservation online through the partner store, the
 * rest to Grieta in cash on arrival (euro or rupees), the full-group go/no-go
 * and Ceļo ar Mariku's cancellation terms.
 */
export const TripPagePaymentSection = () => {
  const phase = useTripPageBookingPhase();
  const balance = getGirlsTripBalanceEur(phase);
  const balanceLkr = getGirlsTripBalanceLkr(phase);

  return (
    <TripPageSection
      id={TRIP_PAGE_PAYMENT_SECTION_ID}
      title="Kā notiek maksājums"
      trackingId="payment"
    >
      <ol className={stepsStyle}>
        <li className={stepStyle}>
          <span className={stepAmountStyle}>{formatEur(GIRLS_TRIP_RESERVATION_EUR)}</span>
          <div className={stepBodyStyle}>
            <h3 className={stepTitleStyle}>Rezervē savu vietu</h3>
            <p>
              Rezervācijas maksu samaksā tiešsaistē, caur Ceļo ar Mariku. Ar to Tava vieta grupā ir
              apstiprināta, un es varu laikus nodrošināt Tavu vietu transportā, aktivitātēs un
              naktsmājās.
            </p>
          </div>
        </li>
        <li className={stepStyle}>
          <span className={stepAmountStyle}>{formatEur(balance)}</span>
          <div className={stepBodyStyle}>
            <h3 className={stepTitleStyle}>Atlikumu samaksā uz vietas</h3>
            <p>
              Atlikušo summu samaksā man skaidrā naudā, kad ieradīsies Šrilankā: eiro (
              {formatEur(balance)}) vai Šrilankas rūpijās (aptuveni {formatLkr(balanceLkr)} LKR,
              kurss var mainīties).
            </p>
            <p>
              No tās es apmaksāju visu, kas iekļauts cenā: naktsmājas, brokastis, transfērus un
              transportu, vīzu, aktivitātes (arī zipline, sērfošanu un jogu pēc izvēles), ieejas
              maksas, ekskursijas un tūres, mani kā Tavu latviešu gidi visas 10 dienas un atbalstu
              24/7.
            </p>
          </div>
        </li>
      </ol>

      <div className={operatorStyle}>
        <a
          className={operatorLinkStyle}
          href={GIRLS_TRIP_PARTNER_PRODUCT_CAMPAIGN_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="outbound-link"
          data-umami-event-url={GIRLS_TRIP_PARTNER_PRODUCT_URL}
          data-umami-event-placement="payment-logo"
        >
          <Image
            className={operatorLogoStyle}
            src="/images/srilanka-lv_logo_celoarmariku.png"
            alt="Ceļo ar Mariku"
            width={74}
            height={50}
          />
        </a>
        <p>
          Ceļojums notiek kopā ar licencētu tūrisma operatoru SIA &ldquo;MG Travel&rdquo; (
          <a
            className={quietLinkStyle}
            href={GIRLS_TRIP_PARTNER_PRODUCT_CAMPAIGN_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="outbound-link"
            data-umami-event-url={GIRLS_TRIP_PARTNER_PRODUCT_URL}
            data-umami-event-placement="payment-text"
          >
            Ceļo ar Mariku
          </a>
          ).
        </p>
      </div>

      <div className={termsStyle}>
        <h3 className={termsTitleStyle}>Ja Tev jāatceļ vai grupa nenokomplektējas</h3>
        <p>{GIRLS_TRIP_GO_NO_GO_TEXT}</p>
        <p>{GIRLS_TRIP_GUEST_CANCELS_TEXT}</p>
      </div>
    </TripPageSection>
  );
};

'use client';

import Image from 'next/image';

import { TodoGrietaMark } from '@/shared/components/todo-grieta-mark';
import { useTripPageBookingPhase } from '@/shared/components/trip-page-booking-provider';
import {
  GIRLS_TRIP_RESERVATION_EUR,
  formatEur,
  getGirlsTripPriceEur,
} from '@/shared/constants/girls-trip-booking';
import {
  GIRLS_TRIP_PARTNER_PRODUCT_CAMPAIGN_URL,
  GIRLS_TRIP_PARTNER_PRODUCT_URL,
} from '@/shared/constants/girls-trip-partner-url';
import { todoGrieta } from '@/shared/constants/todo-grieta';
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
 * rest to Grieta on arrival. Cancellation, the minimum group and what the
 * operator's cover reaches are not agreed yet and stay as placeholders.
 */
export const TripPagePaymentSection = () => {
  const phase = useTripPageBookingPhase();
  const balance = getGirlsTripPriceEur(phase) - GIRLS_TRIP_RESERVATION_EUR;

  return (
    <TripPageSection id={TRIP_PAGE_PAYMENT_SECTION_ID} title="Kā notiek maksājums">
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
              Atlikušo summu samaksā man, kad ieradīsies Šrilankā, skaidrā naudā. No tās es
              apmaksāju visu, kas iekļauts cenā: naktsmājas, brokastis, transfērus un transportu,
              vīzu, aktivitātes, ieejas maksas un ekskursijas.
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
          >
            Ceļo ar Mariku
          </a>
          ).{' '}
          <TodoGrietaMark>
            {todoGrieta(
              'Vai SIA "MG Travel" nodrošinājums operatora maksātnespējas gadījumā attiecas arī uz atlikumu, ko maksā uz vietas Šrilankā? Kā to droši formulēt?',
            )}
          </TodoGrietaMark>
        </p>
      </div>

      <div className={termsStyle}>
        <h3 className={termsTitleStyle}>Ja Tev jāatceļ vai grupa nenokomplektējas</h3>
        <p>
          <TodoGrietaMark>
            {todoGrieta(
              'Atteikšanās noteikumi (jāsaskaņo ar Mariku): kas notiek ar 400 € un ar pārējo summu, ja dalībniece atceļ braucienu, un līdz kuram datumam?',
            )}
          </TodoGrietaMark>
        </p>
        <p>
          <TodoGrietaMark>
            {todoGrieta(
              'Minimālais dalībnieču skaits un datums, kad apstiprinām, ka ceļojums notiek. Ja nenotiek: vai 400 € atmaksā pilnībā, vai pārceļ uz citu datumu?',
            )}
          </TodoGrietaMark>
        </p>
      </div>
    </TripPageSection>
  );
};

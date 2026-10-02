import Image from 'next/image';

import { GIRLS_TRIP_GUESTS } from '@/shared/constants/girls-trip-booking';
import { GIRLS_TRIP_DATES_DISPLAY } from '@/shared/constants/girls-trip-dates';

import { Heading } from '../heading';
import { TripPageBookingCta } from '../trip-page-booking-cta';
import { TripPagePrice } from '../trip-page-price';
import {
  closingActionsStyle,
  closingBodyStyle,
  closingPortraitStyle,
  closingSectionStyle,
  closingTextStyle,
  closingTitleStyle,
} from './styles.css';

export const TRIP_PAGE_CLOSING_SECTION_ID = 'pieteikties';

/** The end of the page: one last, personal invitation with both next steps. */
export const TripPageClosingSection = () => (
  <section
    id={TRIP_PAGE_CLOSING_SECTION_ID}
    className={closingSectionStyle}
    data-trip-section="closing"
  >
    <Image
      className={closingPortraitStyle}
      src="/images/srilanka-lv_meitenu-celojums_grieta.webp"
      alt="Grieta, Tava latviešu gide Šrilankā"
      width={240}
      height={240}
      sizes="(min-width: 768px) 240px, 160px"
    />
    <div className={closingBodyStyle}>
      <Heading as="h2" variant="h2" className={closingTitleStyle}>
        Brauc kopā ar mani
      </Heading>
      <p className={closingTextStyle}>
        {GIRLS_TRIP_DATES_DISPLAY}, {GIRLS_TRIP_GUESTS} meitenes un es. Ja vēl šaubies vai gribi
        kaut ko pajautāt, raksti man. Atbildēšu pati.
      </p>
      <TripPagePrice />
      <TripPageBookingCta className={closingActionsStyle} placement="closing" withDetails={false} />
    </div>
  </section>
);

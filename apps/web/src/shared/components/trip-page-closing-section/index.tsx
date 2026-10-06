import { CalendarDays, Users } from 'lucide-react';
import Image from 'next/image';

import { GIRLS_TRIP_GUESTS } from '@/shared/constants/girls-trip-booking';
import { GIRLS_TRIP_DATES_DISPLAY } from '@/shared/constants/girls-trip-dates';

import { Heading } from '../heading';
import { TripPageBookingCta } from '../trip-page-booking-cta';
import { TripPagePrice } from '../trip-page-price';
import {
  closingBookingStyle,
  closingFactIconStyle,
  closingFactStyle,
  closingFactsStyle,
  closingHostPortraitStyle,
  closingHostStyle,
  closingHostTextStyle,
  closingInviteStyle,
  closingMediaStyle,
  closingPhotoStyle,
  closingSectionStyle,
  closingTitleStyle,
} from './styles.css';

export const TRIP_PAGE_CLOSING_SECTION_ID = 'pieteikties';

/**
 * The end of the page: one last, personal invitation as a single object. A
 * real photo from the trip carries the heading, the dates and the group on
 * its scrim; beside it (below it on phones) Grieta's own line with her
 * portrait, the price with the early-bird and the deadline, and both next
 * steps, on one surface rather than a card inside a panel.
 */
export const TripPageClosingSection = () => (
  <section
    id={TRIP_PAGE_CLOSING_SECTION_ID}
    className={closingSectionStyle}
    data-trip-section="closing"
  >
    <div className={closingMediaStyle}>
      <Image
        className={closingPhotoStyle}
        src="/images/meitenu-celojums-galerija/srilanka-lv_meitenu-celojums_smaids-pludmale_lg.webp"
        alt="Smaidoša meitene pludmalē saulainā dienā"
        fill
        sizes="(min-width: 768px) 520px, 100vw"
      />
      <div className={closingInviteStyle}>
        <Heading as="h2" variant="h2" className={closingTitleStyle}>
          Brauc kopā ar mani
        </Heading>
        <ul className={closingFactsStyle}>
          <li className={closingFactStyle}>
            <CalendarDays className={closingFactIconStyle} aria-hidden="true" strokeWidth={1.75} />
            {GIRLS_TRIP_DATES_DISPLAY}
          </li>
          <li className={closingFactStyle}>
            <Users className={closingFactIconStyle} aria-hidden="true" strokeWidth={1.75} />
            {GIRLS_TRIP_GUESTS} meitenes un es
          </li>
        </ul>
      </div>
    </div>
    <div className={closingBookingStyle}>
      <div className={closingHostStyle}>
        <Image
          className={closingHostPortraitStyle}
          src="/images/srilanka-lv_meitenu-celojums_grieta.webp"
          alt="Grieta, Tava latviešu gide Šrilankā"
          width={56}
          height={56}
          sizes="56px"
        />
        <p className={closingHostTextStyle}>
          Ja vēl šaubies vai gribi kaut ko pajautāt, raksti man. Atbildēšu pati.
        </p>
      </div>
      <TripPagePrice />
      <TripPageBookingCta placement="closing" withDetails={false} />
    </div>
  </section>
);

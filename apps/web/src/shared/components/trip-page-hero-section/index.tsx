import Image from 'next/image';

import { GIRLS_TRIP_GUESTS } from '@/shared/constants/girls-trip-booking';
import { GIRLS_TRIP_DATES_DISPLAY } from '@/shared/constants/girls-trip-dates';
import {
  GIRLS_TRIP_VIDEO_ANCHOR_LABEL,
  GIRLS_TRIP_VIDEO_SECTION_ID,
} from '@/shared/constants/girls-trip-video';
import { quietLinkStyle } from '@/shared/styles/quiet-link.css';

import { TripPageBookingCta } from '../trip-page-booking-cta';
import { TRIP_PAGE_INCLUDED_SECTION_ID } from '../trip-page-included-section';
import { TripPagePhotoGallery } from '../trip-page-photo-gallery';
import { TripPagePrice } from '../trip-page-price';
import {
  tripPageHeroHostPortraitStyle,
  tripPageHeroHostStyle,
  tripPageHeroHostTextStyle,
  tripPageHeroLinksStyle,
  tripPageHeroSectionDescriptionParagraphStyle,
  tripPageHeroSectionDescriptionStyle,
  tripPageHeroSectionStyle,
  tripPageImageGalleryStyle,
  tripPageSummaryFactStyle,
  tripPageSummaryFactsStyle,
  tripPageSummaryItemTitleStyle,
  tripPageSummaryItemValueStyle,
  tripPageSummaryStyle,
} from './styles.css';

/** Wraps the facts card so the sticky mobile bar can tell when it is on screen. */
export const TRIP_PAGE_SUMMARY_ID = 'rezervacija';

const facts = [
  { title: 'Datumi', value: GIRLS_TRIP_DATES_DISPLAY },
  { title: 'Ilgums', value: '10 dienas' },
  { title: 'Grupa', value: `${GIRLS_TRIP_GUESTS} meitenes + Grieta` },
  { title: 'Sākums un beigas', value: 'Negombo' },
];

export const TripPageHeroSection = () => (
  <section className={tripPageHeroSectionStyle}>
    {/* First in the markup so phones see the facts and the buttons on the
        first screen; on wide screens it sits beside the photos. */}
    <div id={TRIP_PAGE_SUMMARY_ID} className={tripPageSummaryStyle} data-trip-section="facts">
      <TripPagePrice />
      <dl className={tripPageSummaryFactsStyle}>
        {facts.map(({ title, value }) => (
          <div key={title} className={tripPageSummaryFactStyle}>
            <dt className={tripPageSummaryItemTitleStyle}>{title}</dt>
            <dd className={tripPageSummaryItemValueStyle}>{value}</dd>
          </div>
        ))}
      </dl>
      <TripPageBookingCta placement="hero" />
      <div className={tripPageHeroHostStyle}>
        <Image
          className={tripPageHeroHostPortraitStyle}
          src="/images/srilanka-lv_meitenu-celojums_grieta.webp"
          alt="Grieta, Tava latviešu gide Šrilankā"
          width={56}
          height={56}
          sizes="56px"
        />
        <p className={tripPageHeroHostTextStyle}>
          <strong>Kopā ar Grietu.</strong> Šrilankā dzīvoju jau vairāk nekā četrus gadus, un visas
          10 dienas būšu kopā ar Tevi kā Tava latviešu gide.
        </p>
      </div>
      <p className={tripPageHeroLinksStyle}>
        <a className={quietLinkStyle} href={`#${TRIP_PAGE_INCLUDED_SECTION_ID}`}>
          Kas iekļauts cenā?
        </a>
        <a className={quietLinkStyle} href={`#${GIRLS_TRIP_VIDEO_SECTION_ID}`}>
          {GIRLS_TRIP_VIDEO_ANCHOR_LABEL}
        </a>
      </p>
    </div>
    <div className={tripPageImageGalleryStyle}>
      <TripPagePhotoGallery />
      <div className={tripPageHeroSectionDescriptionStyle}>
        <p className={tripPageHeroSectionDescriptionParagraphStyle}>
          10 dienu ceļojums pa Šrilanku kopā ar mani, mazā grupā: {GIRLS_TRIP_GUESTS} meitenes un es
          kā Tava latviešu gide. Aktīvs, iedvesmojošs un pilnībā noorganizēts ceļojums, kuru Tu vari
          vienkārši baudīt.
          {` `}
          <strong>Šis nav tikai ceļojums. Tā ir pieredze.</strong>
        </p>
        <p className={tripPageHeroSectionDescriptionParagraphStyle}>
          Pirms 5 gadiem es pati devos ceļā un mājās tā arī neatgriezos. Es iemīlēju šo brīvības
          sajūtu, citādo kultūru un dzīves ritmu, un atradu savas mājas Šrilankā. Tagad es vēlos Tev
          parādīt šo valsti tā, kā to redzu es, ne tikai kā tūristam, bet no iekšpuses.
        </p>
        <p className={tripPageHeroSectionDescriptionParagraphStyle}>
          Mēs kopā izbaudīsim gan Šrilankas slavenākās vietas, gan tās, kuras parasti tūristi
          neatrod. Redzēsim okeānu, kalnus, tējas plantācijas, piedzīvosim safari, meistarklases un
          īsto vietējo dzīvi.
        </p>
        <p className={tripPageHeroSectionDescriptionParagraphStyle}>
          Bet pats svarīgākais, šis ceļojums nav tikai par Šrilanku.{' '}
          <strong>Tas ir par piedzīvojumiem, smiekliem, emocijām un jauniem draugiem.</strong> Šis
          ir Tavs brīdis piedzīvot, izkāpt no savas komforta zonas un varbūt pat atklāt ko jaunu par
          sevi.
        </p>
      </div>
    </div>
  </section>
);

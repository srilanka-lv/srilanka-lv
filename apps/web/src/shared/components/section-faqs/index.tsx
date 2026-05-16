import clsx from 'clsx';
import Link from 'next/link';
import type { ComponentProps, FunctionComponent } from 'react';

import { Heading } from '../heading';
import { IconCalendarDate } from '../icons/icon-calendar-date';
import { IconCalendarGrid } from '../icons/icon-calendar-grid';
import { IconContentWrite } from '../icons/icon-content-write';
import { IconHomeChimney } from '../icons/icon-home-chimney';
import { IconMoneyWallet } from '../icons/icon-money-wallet';
import { IconMovingWalkwayLuggage } from '../icons/icon-moving-walkway-luggage';
import { IconTakingPicturesMan } from '../icons/icon-taking-pictures-man';
import { IconWalkingSymbol } from '../icons/icon-walking-symbol';
import {
  sectionFaqsContentStyle,
  sectionFaqsItemLinkStyle,
  sectionFaqsItemStyle,
  sectionFaqsItemTitleStyle,
  sectionFaqsStyle,
  sectionFaqsTitleStyle,
} from './styles.css';

type SectionFaqsProps = {
  className?: string;
} & ComponentProps<'section'>;

export const SectionFaqs: FunctionComponent<SectionFaqsProps> = ({ className, ...props }) => (
  <section className={clsx(sectionFaqsStyle, className)} {...props}>
    <Heading as="h3" variant="h2" className={sectionFaqsTitleStyle}>
      Viss par ceļošanu Šrilankā
    </Heading>
    <div className={sectionFaqsContentStyle}>
      <span className={sectionFaqsItemStyle}>
        <IconCalendarDate size="medium" />
        <span className={sectionFaqsItemTitleStyle}>Kad doties atvaļinājumā?</span>
        <span>Answer</span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
      <span className={sectionFaqsItemStyle}>
        <IconCalendarGrid size="medium" />
        <span className={sectionFaqsItemTitleStyle}>Cik ilgi man jāpaliek?</span>
        <span>Answer</span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
      <span className={sectionFaqsItemStyle}>
        <IconMoneyWallet size="medium" />
        <span className={sectionFaqsItemTitleStyle}>Dienas budžets</span>
        <span>Answer</span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
      <span className={sectionFaqsItemStyle}>
        <IconMovingWalkwayLuggage size="medium" />
        <span className={sectionFaqsItemTitleStyle}>Nokļūšana tur</span>
        <span>Answer</span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
      <span className={sectionFaqsItemStyle}>
        <IconContentWrite size="medium" />
        <span className={sectionFaqsItemTitleStyle}>Vīzas iegūšana</span>
        <span>Answer</span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
      <span className={sectionFaqsItemStyle}>
        <IconWalkingSymbol size="medium" />
        <span className={sectionFaqsItemTitleStyle}>Pārvietošanās</span>
        <span>Answer</span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
      <span className={sectionFaqsItemStyle}>
        <IconHomeChimney size="medium" />
        <span className={sectionFaqsItemTitleStyle}>Kur apmesties</span>
        <span>Answer</span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
      <span className={sectionFaqsItemStyle}>
        <IconTakingPicturesMan size="medium" />
        <span className={sectionFaqsItemTitleStyle}>Ko darīt</span>
        <span>Answer</span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
    </div>
  </section>
);

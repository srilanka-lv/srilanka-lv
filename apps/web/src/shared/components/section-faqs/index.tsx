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
  sectionFaqsItemAnswerStyle,
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
        <IconCalendarDate size="large" />
        <span className={sectionFaqsItemTitleStyle}>Kad doties atvaļinājumā?</span>
        <span className={sectionFaqsItemAnswerStyle}>
          Labākais laiks, lai apmeklētu Šrilanku, ir no novembra līdz aprīlim (Šrilankas dienvidos)
          vai no maija līdz augustam (Šrilankas rietumos).
        </span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
      <span className={sectionFaqsItemStyle}>
        <IconCalendarGrid size="large" />
        <span className={sectionFaqsItemTitleStyle}>Cik ilgi man jāpaliek?</span>
        <span className={sectionFaqsItemAnswerStyle}>
          Šrilankas spilgtākos apskates objektus var apskatīt 14 līdz 21 dienā.
        </span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
      <span className={sectionFaqsItemStyle}>
        <IconMoneyWallet size="large" />
        <span className={sectionFaqsItemTitleStyle}>Dienas budžets</span>
        <span className={sectionFaqsItemAnswerStyle}>
          Augstākas klases braucienam dienā būs nepieciešami aptuveni 30 eiro. Ja ceļojat ar
          ierobežotu budžetu, Šrilanku var apskatīt par aptuveni 10 līdz 20 eiro dienā.
        </span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
      <span className={sectionFaqsItemStyle}>
        <IconMovingWalkwayLuggage size="large" />
        <span className={sectionFaqsItemTitleStyle}>Nokļūšana tur</span>
        <span className={sectionFaqsItemAnswerStyle}>
          Esmu izveidojis rīku, kas pārbauda lētākos lidojumus no Rīgas uz Kolombo!
        </span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
      <span className={sectionFaqsItemStyle}>
        <IconContentWrite size="large" />
        <span className={sectionFaqsItemTitleStyle}>Vīzas iegūšana</span>
        <span className={sectionFaqsItemAnswerStyle}>
          Šrilankas vīzu iegūt ir ļoti vienkārši. Tūrisma vīza dod tiesības uzturēties valstī 30
          dienas, un to var pagarināt līdz 9 mēnešiem!
        </span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
      <span className={sectionFaqsItemStyle}>
        <IconWalkingSymbol size="large" />
        <span className={sectionFaqsItemTitleStyle}>Pārvietošanās</span>
        <span className={sectionFaqsItemAnswerStyle}>
          Šrilankā ir ļoti viegli pārvietoties. Tuk-tuki, motorolleru noma, taksometri ar PickMe
          lietotni un, protams, sabiedriskais transports (un skaisti vilcienu braucieni). Ceļošana
          pa Šrilanku ir piedzīvojums!
        </span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
      <span className={sectionFaqsItemStyle}>
        <IconHomeChimney size="large" />
        <span className={sectionFaqsItemTitleStyle}>Kur apmesties</span>
        <span className={sectionFaqsItemAnswerStyle}>
          Esmu apmeklējis dažas no skaistākajām (un nezināmākajām) vietām Šrilankas dienvidos. Un es
          labprāt ar tām padalītos ar jums.
        </span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
      <span className={sectionFaqsItemStyle}>
        <IconTakingPicturesMan size="large" />
        <span className={sectionFaqsItemTitleStyle}>Ko darīt</span>
        <span className={sectionFaqsItemAnswerStyle}>
          Sērfošana, pārgājieni, sauļošanās, ielu ēdienu baudīšana. Šrilankā ir tik daudz jautru
          lietu, ko darīt. Sekojiet man, un kopā pavadīsim jautru ceļojumu.
        </span>
        <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
          Vairāk informācijas →
        </Link>
      </span>
    </div>
  </section>
);

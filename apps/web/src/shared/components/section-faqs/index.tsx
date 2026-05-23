import clsx from 'clsx';
import Link from 'next/link';
import type { ComponentProps, FunctionComponent } from 'react';

import { FaqListItem } from '../faq-list-item';
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
      <FaqListItem
        iconSlot={<IconCalendarDate size="large" />}
        questionSlot="Kad doties atvaļinājumā?"
        answerSlot="Labākais laiks, lai apmeklētu Šrilanku, ir no novembra līdz aprīlim (Šrilankas dienvidos) vai no maija līdz augustam (Šrilankas rietumos)."
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
      <FaqListItem
        iconSlot={<IconCalendarGrid size="large" />}
        questionSlot="Cik ilgi man jāpaliek?"
        answerSlot="Šrilankas spilgtākos apskates objektus var apskatīt 14 līdz 21 dienā."
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
      <FaqListItem
        iconSlot={<IconMoneyWallet size="large" />}
        questionSlot="Dienas budžets"
        answerSlot="Augstākas klases braucienam dienā būs nepieciešami aptuveni 30 eiro. Ja ceļojat ar
          ierobežotu budžetu, Šrilanku var apskatīt par aptuveni 10 līdz 20 eiro dienā."
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
      <FaqListItem
        iconSlot={<IconMovingWalkwayLuggage size="large" />}
        questionSlot="Nokļūšana tur"
        answerSlot="Esmu izveidojis rīku, kas pārbauda lētākos lidojumus no Rīgas uz Kolombo!"
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
      <FaqListItem
        iconSlot={<IconContentWrite size="large" />}
        questionSlot="Vīzas iegūšana"
        answerSlot="Šrilankas vīzu iegūt ir ļoti vienkārši. Tūrisma vīza dod tiesības uzturēties valstī 30
          dienas, un to var pagarināt līdz 9 mēnešiem!"
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
      <FaqListItem
        iconSlot={<IconWalkingSymbol size="large" />}
        questionSlot="Pārvietošanās"
        answerSlot="Šrilankā ir ļoti viegli pārvietoties. Tuk-tuki, motorolleru noma, taksometri ar PickMe lietotni un, protams, sabiedriskais transports (un skaisti vilcienu braucieni). Ceļošana pa Šrilanku ir piedzīvojums!"
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
      <FaqListItem
        iconSlot={<IconHomeChimney size="large" />}
        questionSlot="Kur apmesties"
        answerSlot="Esmu apmeklējis dažas no skaistākajām (un nezināmākajām) vietām Šrilankas dienvidos. Un es labprāt ar tām padalītos ar jums."
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
      <FaqListItem
        iconSlot={<IconTakingPicturesMan size="large" />}
        questionSlot="Ko darīt"
        answerSlot="Sērfošana, pārgājieni, sauļošanās, ielu ēdienu baudīšana. Šrilankā ir tik daudz jautru lietu, ko darīt. Sekojiet man, un kopā pavadīsim jautru ceļojumu."
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
    </div>
  </section>
);

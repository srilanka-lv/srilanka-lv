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
        iconSlot={<IconTakingPicturesMan size="large" />}
        questionSlot="Ko darīt (un ko nedarīt) Šrilankas brīvdienās"
        answerSlot="Sērfošana, sauļošanās, ielu ēdienu baudīšana. Šrilankā ir tik daudz jautru lietu, ko darīt. Sekojiet man, un kopā pavadīsim jautru ceļojumu."
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
      <FaqListItem
        iconSlot={<IconHomeChimney size="large" />}
        questionSlot="Kurās Šrilankas vietās vislabāk palikt"
        answerSlot="Esmu apmeklējis dažas no skaistākajām un nezināmākajām vietām Šrilankas dienvidos. Un es labprāt ar tām padalītos ar jums."
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
      <FaqListItem
        iconSlot={<IconMoneyWallet size="large" />}
        questionSlot="Dienas budžets ceļojumam uz Šrilanku"
        answerSlot="Komforta ceļotājam dienā būs nepieciešami aptuveni 100 eiro. Ja ceļojat ar ierobežotu budžetu, Šrilanku var apskatīt arī par 20 eiro dienā."
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
      <FaqListItem
        iconSlot={<IconMovingWalkwayLuggage size="large" />}
        questionSlot="Lētākais veids, kā nokļūt no Latvijas uz Šrilanku"
        answerSlot="Visdārgākā šī ceļojuma daļa noteikti ir aviobiļetes. Tāpēc esmu izveidojusi šo rīku, lai tev būtu vieglāk atrast vislētākās biļetes uz Šrilanku."
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
      <FaqListItem
        iconSlot={<IconCalendarDate size="large" />}
        questionSlot="Labākais laiks, lai ceļotu uz Šrilanku"
        answerSlot="Šrilankā ir divi gadalaiki, tāpēc ir svarīgi plānot pareizo ceļojuma laiku atkarībā no jūsu atvaļinājuma mērķa."
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
      <FaqListItem
        iconSlot={<IconCalendarGrid size="large" />}
        questionSlot="Cik ilgu laiku ir jāieplāno ceļojumam uz Šrilanku"
        answerSlot="Vai vēlaties apskatīt tūristu apskates objektus? Vai brauciet ar konkrētu mērķi, piemēram apskatīt safari, pasērfot vai sauļoties?"
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />

      <FaqListItem
        iconSlot={<IconContentWrite size="large" />}
        questionSlot="Kā iegūt Šrilankas tūristu vīzu Latvijas pilsoņiem"
        answerSlot="Šrilankas vīzu iegūt ir ļoti vienkārši. Tūristu vīza dod tiesības uzturēties valstī 30 dienas, un to var pagarināt līdz pat 9 mēnešiem!"
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
      <FaqListItem
        iconSlot={<IconWalkingSymbol size="large" />}
        questionSlot="Dažādās transportu veidu iespējas Šrilankā"
        answerSlot="No Tuk Tuk līdz sabiedriskajiem vilcieniem un motorolleru nomai. Lūk, kā pārvietoties Šrilankā."
        linkSlot={
          <Link className={sectionFaqsItemLinkStyle} href="/faq/kad-doties-atvalinjanumam">
            Vairāk informācijas →
          </Link>
        }
      />
    </div>
  </section>
);

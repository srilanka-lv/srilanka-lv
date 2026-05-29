import type { ReactNode } from 'react';

import { IconCalendarDate } from '../icons/icon-calendar-date';
import { IconCalendarGrid } from '../icons/icon-calendar-grid';
import { IconContentWrite } from '../icons/icon-content-write';
import { IconHomeChimney } from '../icons/icon-home-chimney';
import { IconMoneyWallet } from '../icons/icon-money-wallet';
import { IconMovingWalkwayLuggage } from '../icons/icon-moving-walkway-luggage';
import { IconTakingPicturesMan } from '../icons/icon-taking-pictures-man';
import { IconWalkingSymbol } from '../icons/icon-walking-symbol';

type FaqItem = {
  icon: ReactNode;
  question: string;
  answer: string;
  href: string;
};

export const faqItems: FaqItem[] = [
  {
    icon: <IconTakingPicturesMan size="large" />,
    question: 'Ko darīt (un ko nedarīt) Šrilankas brīvdienās',
    answer:
      'Sērfošana, sauļošanās, ielu ēdienu baudīšana. Šrilankā ir tik daudz jautru lietu, ko darīt. Sekojiet man, un kopā pavadīsim jautru ceļojumu.',
    href: '/faq/kad-doties-atvalinjanumam',
  },
  {
    icon: <IconHomeChimney size="large" />,
    question: 'Kurās Šrilankas vietās vislabāk palikt',
    answer:
      'Esmu apmeklējis dažas no skaistākajām un nezināmākajām vietām Šrilankas dienvidos. Un es labprāt ar tām padalītos ar jums.',
    href: '/faq/kad-doties-atvalinjanumam',
  },
  {
    icon: <IconMoneyWallet size="large" />,
    question: 'Dienas budžets ceļojumam uz Šrilanku',
    answer:
      'Komforta ceļotājam dienā būs nepieciešami aptuveni 100 eiro. Ja ceļojat ar ierobežotu budžetu, Šrilanku var apskatīt arī par 20 eiro dienā.',
    href: '/faq/kad-doties-atvalinjanumam',
  },
  {
    icon: <IconMovingWalkwayLuggage size="large" />,
    question: 'Lētākais veids, kā nokļūt no Latvijas uz Šrilanku',
    answer:
      'Visdārgākā šī ceļojuma daļa noteikti ir aviobiļetes. Tāpēc esmu izveidojusi šo rīku, lai tev būtu vieglāk atrast vislētākās biļetes uz Šrilanku.',
    href: '/faq/kad-doties-atvalinjanumam',
  },
  {
    icon: <IconCalendarDate size="large" />,
    question: 'Labākais laiks, lai ceļotu uz Šrilanku',
    answer:
      'Šrilankā ir divi gadalaiki, tāpēc ir svarīgi plānot pareizo ceļojuma laiku atkarībā no jūsu atvaļinājuma mērķa.',
    href: '/faq/kad-doties-atvalinjanumam',
  },
  {
    icon: <IconCalendarGrid size="large" />,
    question: 'Cik ilgu laiku ir jāieplāno ceļojumam uz Šrilanku',
    answer:
      'Vai vēlaties apskatīt tūristu apskates objektus? Vai brauciet ar konkrētu mērķi, piemēram apskatīt safari, pasērfot vai sauļoties?',
    href: '/faq/kad-doties-atvalinjanumam',
  },
  {
    icon: <IconContentWrite size="large" />,
    question: 'Kā iegūt Šrilankas tūristu vīzu Latvijas pilsoņiem',
    answer:
      'Šrilankas vīzu iegūt ir ļoti vienkārši. Tūristu vīza dod tiesības uzturēties valstī 30 dienas, un to var pagarināt līdz pat 9 mēnešiem!',
    href: '/faq/kad-doties-atvalinjanumam',
  },
  {
    icon: <IconWalkingSymbol size="large" />,
    question: 'Dažādās transportu veidu iespējas Šrilankā',
    answer:
      'No Tuk Tuk līdz sabiedriskajiem vilcieniem un motorolleru nomai. Lūk, kā pārvietoties Šrilankā.',
    href: '/faq/kad-doties-atvalinjanumam',
  },
];

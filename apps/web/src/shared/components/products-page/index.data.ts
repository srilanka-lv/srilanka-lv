import { PAGES } from '@packages/sanity/constants/pages-slugs';

export type Product = {
  subTitle: string;
  title: string;
  description: string;
  slug: string;
  href: string;
  thumbnailSrc: string;
};

export const products: Product[] = [
  {
    subTitle: 'Ekskluzīvs – tikai meitenēm',
    title: '10 dienu piedzīvojums Šrilankā',
    description:
      'Ceļojums pa Šrilanku kopā ar mani, mazā, līdz 6 cilvēku sieviešu grupā. Aktīvs, iedvesmojošs un pilnībā noorganizēts ceļojums, kuru Tu vari vienkārši baudīt. Bet pats svarīgākais, šis ceļojums nebūs tikai par Šrilanku. Tas būs par piedzīvojumiem, smiekliem, emocijām un jaunām draudzenēm. Šis ir Tavs brīdis piedzīvot, izkāpt no savas komforta zonas un varbūt pat atklāt ko jaunu par sevi.',
    slug: PAGES.LV.PRODUCTS_GIRLS_TRIP,
    href: `/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_GIRLS_TRIP}`,
    thumbnailSrc: '/images/srilanka-lv_product_thumb-1.webp',
  },
  {
    subTitle: 'Personalizēts',
    title: 'Zvans 1:1 Konsultācija un atbildes par Taviem jautājumiem par un ap Šrilanku',
    description:
      'Esmu Šrilankā jau gandrīz četrus gadus. Meklējat labākos brīvdienu galamērķus Šrilankā, jaukākās kafejnīcas, praktiskus ieteikumus un labākās naktsmītnes? Esmu gatavs visu izstāstīt individuālā sarunā.',
    slug: PAGES.LV.PRODUCTS_CONSULTATION,
    href: `/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_CONSULTATION}`,
    thumbnailSrc: '/images/srilanka-lv_product_thumb-2.webp',
  },
  {
    subTitle: 'Gatavs 48 stundu laikā',
    title: 'Personalizēts ceļojuma plāns uz Šrilanku',
    description:
      'Saņemiet pielāgotu ceļojuma plānu, kas balstīts uz Tavām vēlmēm un situāciju. Ceļo viens un vēlaties sportot? Vai vēlies baudīt tieši Šrilankas kultūru? Es sarūpēšu labākās aktivitātes un lokācijas. Vai drīzāk ģimenes ceļojums? Es atradīšu labākās vietas, kas piemērotas bērniem. ',
    slug: PAGES.LV.PRODUCTS_HOLIDAY_PLAN,
    href: `/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_HOLIDAY_PLAN}`,
    thumbnailSrc: '/images/srilanka-lv_product_thumb-3.webp',
  },
];

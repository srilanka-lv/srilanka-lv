import { PAGES, RETIRED_PAGES } from '@packages/sanity/constants/pages-slugs';

import type { OgImage } from '@/features/sanity/utils/build-page-metadata';
import {
  GIRLS_TRIP_DEPARTURE_DATE,
  GIRLS_TRIP_RETURN_DATE,
} from '@/shared/constants/girls-trip-dates';
import { GIRLS_TRIP_PRICE_EUR } from '@/shared/constants/girls-trip-price';
import { WHATSAPP_URL } from '@/shared/constants/whatsapp';

export type Product = {
  subTitle: string;
  title: string;
  description: string;
  slug: string;
  href: string;
  /** Product has no page of its own; its CTA opens a WhatsApp chat instead. */
  whatsAppOnly?: boolean;
  thumbnailSrc: string;
  /** 1200×630 social preview image; a Sanity Open Graph image takes precedence when set. */
  ogImage?: OgImage;
  /** Per-person price in EUR, exposed as the structured-data offer. */
  priceEur?: string;
  /** ISO departure date, exposed as the structured-data trip departureTime. */
  departureDate?: string;
  /** ISO return date, exposed as the structured-data trip arrivalTime. */
  returnDate?: string;
};

export const products: Product[] = [
  {
    subTitle: 'Ekskluzīvs – tikai meitenēm',
    title: '10 dienu piedzīvojums Šrilankā',
    description:
      'Ceļojums pa Šrilanku kopā ar mani, mazā, līdz 7 cilvēku sieviešu grupā. Aktīvs, iedvesmojošs un pilnībā noorganizēts ceļojums, kuru Tu vari vienkārši baudīt. Bet pats svarīgākais, šis ceļojums nebūs tikai par Šrilanku. Tas būs par piedzīvojumiem, smiekliem, emocijām un jaunām draudzenēm. Šis ir Tavs brīdis piedzīvot, izkāpt no savas komforta zonas un varbūt pat atklāt ko jaunu par sevi.',
    slug: PAGES.LV.PRODUCTS_GIRLS_TRIP,
    href: `/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_GIRLS_TRIP}`,
    thumbnailSrc: '/images/srilanka-lv_product_thumb-1.webp',
    ogImage: {
      url: '/images/srilanka-lv_og-image_meitenu-celojums_v2.jpg',
      width: 1200,
      height: 630,
      alt: 'Ceļojums Šrilankā tikai meitenēm',
    },
    priceEur: GIRLS_TRIP_PRICE_EUR,
    departureDate: GIRLS_TRIP_DEPARTURE_DATE,
    returnDate: GIRLS_TRIP_RETURN_DATE,
  },
  {
    subTitle: 'Personalizēts',
    title: 'Zvans 1:1 Konsultācija un atbildes par Taviem jautājumiem par un ap Šrilanku',
    description:
      'Esmu Šrilankā jau gandrīz četrus gadus. Meklējat labākos brīvdienu galamērķus Šrilankā, jaukākās kafejnīcas, praktiskus ieteikumus un labākās naktsmītnes? Esmu gatavs visu izstāstīt individuālā sarunā.',
    slug: RETIRED_PAGES.LV.PRODUCTS_CONSULTATION,
    href: WHATSAPP_URL,
    whatsAppOnly: true,
    thumbnailSrc: '/images/srilanka-lv_product_thumb-2.webp',
  },
  {
    subTitle: 'Gatavs 48 stundu laikā',
    title: 'Personalizēts ceļojuma plāns uz Šrilanku',
    description:
      'Saņemiet pielāgotu ceļojuma plānu, kas balstīts uz Tavām vēlmēm un situāciju. Ceļo viens un vēlaties sportot? Vai vēlies baudīt tieši Šrilankas kultūru? Es sarūpēšu labākās aktivitātes un lokācijas. Vai drīzāk ģimenes ceļojums? Es atradīšu labākās vietas, kas piemērotas bērniem. ',
    slug: RETIRED_PAGES.LV.PRODUCTS_HOLIDAY_PLAN,
    href: WHATSAPP_URL,
    whatsAppOnly: true,
    thumbnailSrc: '/images/srilanka-lv_product_thumb-3.webp',
  },
];

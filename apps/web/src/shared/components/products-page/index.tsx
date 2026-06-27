import { PAGES } from '@packages/sanity/constants/pages-slugs';
import Image from 'next/image';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems } from '@/shared/components/breadcrumbs/build-items';

import {
  productDescriptionStyle,
  productImageWrapperStyle,
  productLinkStyle,
  productStyle,
  productSubTitleStyle,
  productTitleStyle,
} from './styles.css';

const products = [
  {
    subTitle: 'Ekskluzīvs – tikai meitenēm',
    title: '10 dienu piedzīvojums Šrilankā',
    description:
      'Ceļojums pa Šrilanku kopā ar mani, mazā, līdz 6 cilvēku sieviešu grupā. Aktīvs, iedvesmojošs un pilnībā noorganizēts ceļojums, kuru Tu vari vienkārši baudīt. Bet pats svarīgākais, šis ceļojums nebūs tikai par Šrilanku. Tas būs par piedzīvojumiem, smiekliem, emocijām un jaunām draudzenēm. Šis ir Tavs brīdis piedzīvot, izkāpt no savas komforta zonas un varbūt pat atklāt ko jaunu par sevi.',
    slug: `/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_GIRLS_TRIP}`,
  },
  {
    subTitle: 'Personalizēts',
    title: 'Zvans 1:1 Konsultācija un atbildes par Taviem jautājumiem par un ap Šrilanku',
    description:
      'Esmu Šrilankā jau gandrīz četrus gadus. Meklējat labākos brīvdienu galamērķus Šrilankā, jaukākās kafejnīcas, praktiskus ieteikumus un labākās naktsmītnes? Esmu gatavs visu izstāstīt individuālā sarunā.',
    slug: `/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_CONSULTATION}`,
  },
  {
    subTitle: 'Gatavs 48 stundu laikā',
    title: 'Personalizēts ceļojuma plāns uz Šrilanku',
    description:
      'Saņemiet pielāgotu ceļojuma plānu, kas balstīts uz Tavām vēlmēm un situāciju. Ceļo viens un vēlaties sportot? Vai vēlies baudīt tieši Šrilankas kultūru? Es sarūpēšu labākās aktivitātes un lokācijas. Vai drīzāk ģimenes ceļojums? Es atradīšu labākās vietas, kas piemērotas bērniem. ',
    slug: `/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_HOLIDAY_PLAN}`,
  },
];

export const ProductsPage: FunctionComponent = () => {
  const href = `/${PAGES.LV.PRODUCTS}`;

  return (
    <>
      <Breadcrumbs items={buildSectionItems(href)} />
      {products.map(({ subTitle, title, description, slug }, index) => {
        const Component = index === 0 ? 'h1' : index === 1 ? 'h2' : 'h3';

        return (
          <article key={title} className={productStyle}>
            <span className={productSubTitleStyle}>{subTitle}</span>
            <Component className={productTitleStyle}>{title}</Component>
            <p className={productDescriptionStyle}>{description}</p>
            <Link className={productLinkStyle} href={href}>
              Vairāk informācijas →
            </Link>
            <div className={productImageWrapperStyle}>
              <Image
                src={`/images/srilanka-lv_product_thumb-${index + 1}.png`}
                alt={title}
                fill
                sizes="auto"
                priority
                quality={100}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
          </article>
        );
      })}
    </>
  );
};

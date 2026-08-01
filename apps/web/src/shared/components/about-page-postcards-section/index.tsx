import { PAGES } from '@packages/sanity/constants/pages-slugs';
import Image from 'next/image';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { findNavLabel } from '@/shared/components/breadcrumbs/build-items';
import { products } from '@/shared/components/products-page/index.data';

import {
  postcardBodyStyle,
  postcardImageImgStyle,
  postcardImageStyle,
  postcardLinkStyle,
  postcardMetaStyle,
  postcardTitleStyle,
  postcardsSectionStyle,
} from './styles.css';

export const AboutPagePostcardsSection: FunctionComponent = () => {
  const trip = products.find((product) => product.slug === PAGES.LV.PRODUCTS_GIRLS_TRIP);
  const blogsHref = `/${PAGES.LV.BLOGS}`;

  return (
    <section className={postcardsSectionStyle}>
      {trip && (
        <Link href={trip.href} className={postcardLinkStyle}>
          <span className={postcardImageStyle}>
            <Image
              className={postcardImageImgStyle}
              src="/images/srilanka-lv_meitenu-celojums_serfosanas-meitenes.webp"
              alt={trip.title}
              fill
              sizes="(min-width: 48rem) 24rem, 100vw"
              quality={75}
            />
          </span>
          <span className={postcardBodyStyle}>
            <span className={postcardTitleStyle}>{trip.title}</span>
            <span className={postcardMetaStyle}>{trip.subTitle}</span>
          </span>
        </Link>
      )}
      <Link href={blogsHref} className={postcardLinkStyle}>
        <span className={postcardImageStyle}>
          <Image
            className={postcardImageImgStyle}
            src="/images/srilanka-lv_meitenu-celojums_peldesana-baseina.webp"
            alt="Peldēšanās baseinā Šrilankā"
            fill
            sizes="(min-width: 48rem) 24rem, 100vw"
            quality={75}
          />
        </span>
        <span className={postcardBodyStyle}>
          <span className={postcardTitleStyle}>{findNavLabel(blogsHref)}</span>
          <span className={postcardMetaStyle}>Viss par ceļošanu Šrilankā</span>
        </span>
      </Link>
    </section>
  );
};

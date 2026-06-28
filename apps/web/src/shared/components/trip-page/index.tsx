import { PAGES } from '@packages/sanity/constants/pages-slugs';
import Image from 'next/image';
import type { FunctionComponent } from 'react';

import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildItems } from '@/shared/components/breadcrumbs/build-items';

import { Heading } from '../heading';
import {
  tripPageHeroSectionStyle,
  tripPageImageGalleryMainImageStyle,
  tripPageImageGalleryStyle,
  tripPageImageGalleryThumbnailImageStyle,
  tripPageImageGalleryThumbnailsContainerStyle,
  tripPageTitleStyle,
} from './styles.css';

export const ProductPageTrip: FunctionComponent = () => {
  const productsHref = `/${PAGES.LV.PRODUCTS}`;

  return (
    <>
      <Breadcrumbs
        items={buildItems(productsHref, {
          name: '10 dienu piedzīvojums Šrilankā',
          href: `${productsHref}/${PAGES.LV.PRODUCTS_GIRLS_TRIP}`,
        })}
      />
      <Heading as="h1" variant="h2" className={tripPageTitleStyle}>
        10 dienu piedzīvojums Šrilankā
      </Heading>
      <section className={tripPageHeroSectionStyle}>
        <div className={tripPageImageGalleryStyle}>
          <span className={tripPageImageGalleryMainImageStyle}>
            <Image
              src="/images/srilanka-lv_meitenu-celojums_peldesana-baseina.webp"
              alt="Thumb Image"
              fill
              sizes="auto"
              priority
              quality={75}
            />
          </span>
          <span className={tripPageImageGalleryThumbnailsContainerStyle}>
            <span className={tripPageImageGalleryThumbnailImageStyle}>
              <Image
                src="/images/srilanka-lv_meitenu-celojums_motorolleru-piedzinas.webp"
                alt="Thumb Image"
                fill
                sizes="auto"
                priority
                quality={75}
              />
            </span>
            <span className={tripPageImageGalleryThumbnailImageStyle}>
              <Image
                src="/images/srilanka-lv_meitenu-celojums_pastaiga-pludmale-ar-suniem.webp"
                alt="Thumb Image"
                fill
                sizes="auto"
                priority
                quality={75}
              />
            </span>
            <span className={tripPageImageGalleryThumbnailImageStyle}>
              <Image
                src="/images/srilanka-lv_meitenu-celojums_saulrieta-serfosana.webp"
                alt="Thumb Image"
                fill
                sizes="auto"
                priority
                quality={75}
              />
            </span>
            <span className={tripPageImageGalleryThumbnailImageStyle}>
              <Image
                src="/images/srilanka-lv_meitenu-celojums_serfosanas-meitenes.webp"
                alt="Thumb Image"
                fill
                sizes="auto"
                priority
                quality={75}
              />
            </span>
            <span className={tripPageImageGalleryThumbnailImageStyle}>
              <Image
                src="/images/srilanka-lv_meitenu-celojums_srilankas-kalni.webp"
                alt="Thumb Image"
                fill
                sizes="auto"
                priority
                quality={75}
              />
            </span>
            <span className={tripPageImageGalleryThumbnailImageStyle}>
              <Image
                src="/images/srilanka-lv_meitenu-celojums_srilankas-okeans.webp"
                alt="Thumb Image"
                fill
                sizes="auto"
                priority
                quality={75}
              />
            </span>
          </span>
        </div>
        <div>Summary</div>
      </section>
    </>
  );
};

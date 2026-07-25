import { PAGES } from '@packages/sanity/constants/pages-slugs';
import Image from 'next/image';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems } from '@/shared/components/breadcrumbs/build-items';

import { products } from './index.data';
import {
  productDescriptionStyle,
  productImageWrapperStyle,
  productLinkStyle,
  productStyle,
  productSubTitleStyle,
  productTitleStyle,
} from './styles.css';

export const ProductsPage: FunctionComponent = () => {
  const href = `/${PAGES.LV.PRODUCTS}`;

  return (
    <>
      <Breadcrumbs items={buildSectionItems(href)} />
      {products.map(({ subTitle, title, description, href: productHref }, index) => {
        const Component = index === 0 ? 'h1' : index === 1 ? 'h2' : 'h3';

        return (
          <article key={title} className={productStyle}>
            <span className={productSubTitleStyle}>{subTitle}</span>
            <Component className={productTitleStyle}>{title}</Component>
            <p className={productDescriptionStyle}>{description}</p>
            <Link className={productLinkStyle} href={productHref}>
              Vairāk informācijas →
            </Link>
            <div className={productImageWrapperStyle}>
              <Image
                src={`/images/srilanka-lv_product_thumb-${index + 1}.webp`}
                alt={title}
                fill
                sizes="auto"
                priority
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

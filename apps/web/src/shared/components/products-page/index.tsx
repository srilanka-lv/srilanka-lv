import { PAGES } from '@packages/sanity/constants/pages-slugs';
import Image from 'next/image';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems } from '@/shared/components/breadcrumbs/build-items';
import { WhatsAppButton } from '@/shared/components/whatsapp-button';

import { products } from './index.data';
import {
  productDescriptionStyle,
  productImageWrapperStyle,
  productLinkStyle,
  productStyle,
  productSubTitleStyle,
  productTitleStyle,
  productWhatsAppCtaStyle,
} from './styles.css';

export const ProductsPage: FunctionComponent = () => {
  const href = `/${PAGES.LV.PRODUCTS}`;

  return (
    <>
      <Breadcrumbs items={buildSectionItems(href)} />
      {products.map((product, index) => {
        const { subTitle, title, description, href: productHref, thumbnailSrc } = product;
        const Component = index === 0 ? 'h1' : index === 1 ? 'h2' : 'h3';

        return (
          <article key={title} className={productStyle}>
            <span className={productSubTitleStyle}>{subTitle}</span>
            <Component className={productTitleStyle}>{title}</Component>
            <p className={productDescriptionStyle}>{description}</p>
            {product.whatsAppOnly ? (
              <WhatsAppButton className={productWhatsAppCtaStyle} />
            ) : (
              <Link className={productLinkStyle} href={productHref}>
                Vairāk par šo ceļojumu! →
              </Link>
            )}
            <div className={productImageWrapperStyle}>
              <Image
                src={thumbnailSrc}
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

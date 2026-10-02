import { PAGES } from '@packages/sanity/constants/pages-slugs';
import Image from 'next/image';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { AskGrietaCta } from '@/features/ask-grieta/components/ask-grieta-cta';
import { PRODUCT_BY_SLUG } from '@/features/ask-grieta/constants/ask-grieta-products';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems } from '@/shared/components/breadcrumbs/build-items';
import { buttonStyles } from '@/shared/components/button/styles.css';

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
              // Was the WhatsApp pill, a dead end in Instagram's browser.
              <AskGrietaCta
                entry="replaced-whatsapp"
                placement={`products-page-${product.slug}`}
                product={PRODUCT_BY_SLUG[product.slug]}
                className={`${productWhatsAppCtaStyle} ${buttonStyles({ variant: 'primary', size: 'large' })}`}
              >
                {PRODUCT_BY_SLUG[product.slug] === 'consultation'
                  ? 'Jautā man par konsultāciju'
                  : 'Jautā man par ceļojuma plānu'}
              </AskGrietaCta>
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

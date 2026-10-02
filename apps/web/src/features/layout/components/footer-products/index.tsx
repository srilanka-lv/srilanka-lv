import Image from 'next/image';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { AskGrietaCta } from '@/features/ask-grieta/components/ask-grieta-cta';
import { PRODUCT_BY_SLUG } from '@/features/ask-grieta/constants/ask-grieta-products';
import { Heading } from '@/shared/components/heading';
import { products } from '@/shared/components/products-page/index.data';

import { footerHeadingStyle } from '../footer/styles.css';
import {
  footerProductsBodyStyle,
  footerProductsCardStyle,
  footerProductsChipStyle,
  footerProductsCtaStyle,
  footerProductsImageStyle,
  footerProductsImageWrapStyle,
  footerProductsListStyle,
  footerProductsTitleStyle,
} from './styles.css';

export const FooterProducts: FunctionComponent = () => {
  return (
    <div>
      <Heading as="h2" variant="h6" className={footerHeadingStyle}>
        Mani produkti
      </Heading>
      <ul className={footerProductsListStyle}>
        {products.map((product) => {
          const cardContent = (
            <>
              <span className={footerProductsImageWrapStyle}>
                <Image
                  className={footerProductsImageStyle}
                  src={product.thumbnailSrc}
                  alt={product.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 96px"
                />
              </span>
              <span className={footerProductsBodyStyle}>
                <span className={footerProductsChipStyle}>{product.subTitle}</span>
                <span className={footerProductsTitleStyle}>{product.title}</span>
                <span className={footerProductsCtaStyle}>
                  {product.whatsAppOnly ? 'Jautā man →' : 'Vairāk informācijas →'}
                </span>
              </span>
            </>
          );

          return (
            <li key={product.slug}>
              {product.whatsAppOnly ? (
                // Was a WhatsApp link; now opens the drawer with this product chosen.
                <AskGrietaCta
                  as="link"
                  entry="replaced-whatsapp"
                  placement={`footer-product-${product.slug}`}
                  product={PRODUCT_BY_SLUG[product.slug]}
                  className={footerProductsCardStyle}
                >
                  {cardContent}
                </AskGrietaCta>
              ) : (
                <Link className={footerProductsCardStyle} href={product.href}>
                  {cardContent}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

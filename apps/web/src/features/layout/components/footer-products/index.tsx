import { PAGES } from '@packages/sanity/constants/pages-slugs';
import Image from 'next/image';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

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
        <Link href={`/${PAGES.LV.PRODUCTS}`}>Mūsu produkti</Link>
      </Heading>
      <ul className={footerProductsListStyle}>
        {products.map((product) => (
          <li key={product.slug}>
            <Link className={footerProductsCardStyle} href={product.href}>
              <span className={footerProductsImageWrapStyle}>
                <Image
                  className={footerProductsImageStyle}
                  src={product.thumbnailSrc}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 96px"
                />
              </span>
              <span className={footerProductsBodyStyle}>
                <span className={footerProductsChipStyle}>{product.subTitle}</span>
                <span className={footerProductsTitleStyle}>{product.title}</span>
                <span className={footerProductsCtaStyle}>Vairāk informācijas →</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

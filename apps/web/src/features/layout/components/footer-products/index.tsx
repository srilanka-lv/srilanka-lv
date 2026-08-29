import Image from 'next/image';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { Heading } from '@/shared/components/heading';
import { products } from '@/shared/components/products-page/index.data';
import { WhatsAppPill } from '@/shared/components/whatsapp-button';

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
  footerProductsWhatsAppCtaStyle,
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
                {product.whatsAppOnly ? (
                  <span className={footerProductsWhatsAppCtaStyle}>
                    <WhatsAppPill />
                  </span>
                ) : (
                  <span className={footerProductsCtaStyle}>Vairāk informācijas →</span>
                )}
              </span>
            </>
          );

          return (
            <li key={product.slug}>
              {product.whatsAppOnly ? (
                <a
                  className={footerProductsCardStyle}
                  href={product.href}
                  title="Chat on WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="contact"
                  data-umami-event-channel="whatsapp"
                >
                  {cardContent}
                </a>
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

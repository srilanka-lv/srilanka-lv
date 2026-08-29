'use client';

import { PAGES } from '@packages/sanity/constants/pages-slugs';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';

import { FooterAboutMe } from '../footer-about-me';
import { FooterLinks } from '../footer-links';
import { FooterNewsletterForm } from '../footer-newsletter-form';
import { FooterProducts } from '../footer-products';
import { FooterSocials } from '../footer-socials';
import { footerColumnsStyle, footerSeamlessStyle, footerStyle } from './styles.css';

/*
 * Direction contract (impeccable)
 * THESIS: The footer is Grieta's back cover: after any page she personally hands the
 * reader her three offers. It refuses the anonymous equal-columns link dump.
 * OWN-WORLD: incumbent srilanka.lv: cream/deep-maroon ground, coral #ee5253 links with
 * the color-dodge highlight swipe, Comme, pill chips, rounded photo cards, her signature.
 * STORY: the reader finishes an article, recognizes Grieta, sees three photo-led offers,
 * clicks one; guide links, newsletter and socials catch everyone else.
 * FIRST VIEWPORT: full-bleed tinted band; a row of three product photo cards leads;
 * below a hairline: her story with signature, guide links, newsletter plus socials.
 * FORM: crafted footer extension of the incumbent world; local extension, no seed.
 */
// The products index already lists every product in full, so the footer there
// drops the "Mani produkti" cards and the full-bleed hairline band. Both EN
// (SSR) and LV (client) pathnames are covered for the rewrite duality.
const productsIndexPaths = [`/${PAGES.EN.PRODUCTS}`, `/${PAGES.LV.PRODUCTS}`];

export const Footer: FunctionComponent = () => {
  const pathname = usePathname();
  const isProductsIndex = productsIndexPaths.includes(pathname);

  return (
    <footer className={clsx(footerStyle, isProductsIndex && footerSeamlessStyle)}>
      {!isProductsIndex && <FooterProducts />}
      <div className={footerColumnsStyle}>
        <FooterAboutMe />
        <FooterLinks />
        <div>
          <FooterNewsletterForm />
          <FooterSocials />
        </div>
      </div>
    </footer>
  );
};

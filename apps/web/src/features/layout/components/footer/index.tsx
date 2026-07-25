import type { FunctionComponent } from 'react';

import { FooterAboutMe } from '../footer-about-me';
import { FooterLinks } from '../footer-links';
import { FooterNewsletterForm } from '../footer-newsletter-form';
import { FooterProducts } from '../footer-products';
import { FooterSocials } from '../footer-socials';
import { footerColumnsStyle, footerStyle } from './styles.css';

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
export const Footer: FunctionComponent = () => (
  <footer className={footerStyle}>
    <FooterProducts />
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

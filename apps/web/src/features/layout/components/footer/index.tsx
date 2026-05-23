import type { FunctionComponent } from 'react';

import { FooterAboutMe } from '../footer-about-me';
import { FooterNewsletterForm } from '../footer-newsletter-form';
import { FooterProducts } from '../footer-products';
import { footerStyle } from './styles.css';

export const Footer: FunctionComponent = () => (
  <footer className={footerStyle}>
    <FooterAboutMe />
    <FooterProducts />
    <FooterNewsletterForm />
  </footer>
);

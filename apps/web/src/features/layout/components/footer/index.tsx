import type { FunctionComponent } from 'react';

import { CoverImageEffect } from '@/shared/components/cover-image-effect';

import { FooterAboutMe } from '../footer-about-me';
import { FooterNewsletterForm } from '../footer-newsletter-form';
import { FooterProducts } from '../footer-products';
import { coverImageEffectStyles, footerStyle } from './styles.css';

export const Footer: FunctionComponent = () => (
  <footer className={footerStyle}>
    <CoverImageEffect variant="top" className={coverImageEffectStyles.top} />
    <FooterAboutMe />
    <FooterProducts />
    <FooterNewsletterForm />
    <CoverImageEffect variant="bottom" className={coverImageEffectStyles.bottom} />
  </footer>
);

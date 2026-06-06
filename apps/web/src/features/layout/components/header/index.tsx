'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { type FunctionComponent, useMemo } from 'react';

import {
  PAGE_ABOUT_ME_SLUG,
  PAGE_BLOGS_SLUG,
  PAGE_CONTACT_SLUG,
  PAGE_FLIGHT_TICKETS_SLUG,
  PAGE_PRODUCTS_SLUG,
} from '@/features/sanity/constants/pages-slugs';
import { Logo } from '@/shared/components/logo';

import { Navigation } from '../navigation';
import { headerStyles, logoStyle } from './styles.css';

type HeaderProps = {
  className?: string;
};

export const Header: FunctionComponent<HeaderProps> = ({ className }) => {
  const pathname = usePathname();

  const variant = useMemo(() => {
    const pagesWithoutOverlay = [
      `/${PAGE_BLOGS_SLUG}`,
      `/${PAGE_PRODUCTS_SLUG}`,
      `/${PAGE_ABOUT_ME_SLUG}`,
      `/${PAGE_FLIGHT_TICKETS_SLUG}`,
      `/${PAGE_CONTACT_SLUG}`,
    ];

    if (pagesWithoutOverlay.includes(pathname)) {
      return 'without-overlay';
    }

    return 'with-overlay';
  }, [pathname]);

  return (
    <header className={clsx(headerStyles({ variant }), className)}>
      <Logo className={logoStyle} />
      <Navigation />
    </header>
  );
};

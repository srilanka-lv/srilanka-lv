'use client';

import {
  PAGE_ABOUT_ME_SLUG,
  PAGE_BLOGS_SLUG,
  PAGE_CONTACT_SLUG,
  PAGE_FLIGHT_TICKETS_SLUG,
  PAGE_INFO_BEST_TIME_TO_TRAVEL_SLUG,
  PAGE_INFO_DAILY_BUDGET_SLUG,
  PAGE_INFO_HOW_LONG_TO_GO_SLUG,
  PAGE_INFO_TRANSPORT_SLUG,
  PAGE_INFO_VISA_SLUG,
  PAGE_INFO_WHAT_TO_DO_WHAT_NOT_TO_DO_SLUG,
  PAGE_INFO_WHERE_TO_STAY_SLUG,
  PAGE_PRODUCTS_SLUG,
} from '@packages/sanity/constants/pages-slugs';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { type FunctionComponent, useMemo } from 'react';

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
      `/${PAGE_INFO_WHAT_TO_DO_WHAT_NOT_TO_DO_SLUG}`,
      `/${PAGE_INFO_WHERE_TO_STAY_SLUG}`,
      `/${PAGE_INFO_DAILY_BUDGET_SLUG}`,
      `/${PAGE_INFO_BEST_TIME_TO_TRAVEL_SLUG}`,
      `/${PAGE_INFO_HOW_LONG_TO_GO_SLUG}`,
      `/${PAGE_INFO_VISA_SLUG}`,
      `/${PAGE_INFO_TRANSPORT_SLUG}`,
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

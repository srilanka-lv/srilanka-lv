'use client';

import { PAGES } from '@packages/sanity/constants/pages-slugs';
import { usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';

import { Logo } from '@/shared/components/logo';

import { Navigation } from '../navigation';
import { headerStyles, logoStyle } from './styles.css';

// The dark hero overlay belongs on the home page and individual blog posts.
// The blog index (`/blogi`) and other nested routes (e.g. `/produkti/<slug>`)
// render without it. Both EN (SSR) and LV (client) pathnames are covered for
// the rewrite duality.
const pathsWithOverlay = [`/${PAGES.EN.HOME}`, `/${PAGES.LV.HOME}`];

const isBlogPostPath = (pathname: string) =>
  pathname.startsWith(`/${PAGES.EN.BLOGS}/`) || pathname.startsWith(`/${PAGES.LV.BLOGS}/`);

export const Header: FunctionComponent = () => {
  const pathname = usePathname();

  const variant =
    pathsWithOverlay.includes(pathname) || isBlogPostPath(pathname)
      ? 'with-overlay'
      : 'without-overlay';

  return (
    <header className={headerStyles({ variant })}>
      <Logo className={logoStyle} />
      <Navigation />
    </header>
  );
};

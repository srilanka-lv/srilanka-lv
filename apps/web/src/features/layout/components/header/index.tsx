'use client';

import { PAGES } from '@packages/sanity/constants/pages-slugs';
import { usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';

import { Logo } from '@/shared/components/logo';

import { Navigation } from '../navigation';
import { headerStyles, logoStyle } from './styles.css';

// The dark hero overlay belongs on the home page only. Every other route,
// including nested ones like `/produkti/<slug>`, renders without it. Both the
// EN route (`/`, returned on SSR) and the LV slug (`/sakums`, returned on the
// client) are listed to cover the pathname rewrite duality.
const pathsWithOverlay = [`/${PAGES.EN.HOME}`, `/${PAGES.LV.HOME}`];

export const Header: FunctionComponent = () => {
  const pathname = usePathname();

  const variant = pathsWithOverlay.includes(pathname) ? 'with-overlay' : 'without-overlay';

  return (
    <header className={headerStyles({ variant })}>
      <Logo className={logoStyle} />
      <Navigation />
    </header>
  );
};

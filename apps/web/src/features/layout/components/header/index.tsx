'use client';

import { PAGES } from '@packages/sanity/constants/pages-slugs';
import { usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';

import { Logo } from '@/shared/components/logo';

import { Navigation } from '../navigation';
import { headerStyles, logoStyle } from './styles.css';

const homePaths: string[] = [PAGES.EN.HOME, PAGES.LV.HOME];
const pathsWithoutOverlay = [...Object.values(PAGES.EN), ...Object.values(PAGES.LV)]
  .filter((slug) => !homePaths.includes(slug))
  .map((slug) => `/${slug}`);

export const Header: FunctionComponent = () => {
  const pathname = usePathname();

  const variant = pathsWithoutOverlay.includes(pathname) ? 'without-overlay' : 'with-overlay';

  return (
    <header className={headerStyles({ variant })}>
      <Logo className={logoStyle} />
      <Navigation />
    </header>
  );
};

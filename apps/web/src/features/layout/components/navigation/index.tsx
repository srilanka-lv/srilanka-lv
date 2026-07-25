'use client';

import { PAGES } from '@packages/sanity/constants/pages-slugs';
import clsx from 'clsx';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';

import { cardStyles } from '@/shared/components/card/styles.css';
import { Divider } from '@/shared/components/divider';
import { IconButton } from '@/shared/components/icon-button';

import { useLayoutMobileNavigationIsVisible } from '../../stores/layout-store-hooks';
import { navigationItems, socialMediaItems } from './index.data';
import {
  navigationBackdropStyles,
  navigationButtonStyle,
  navigationItemStyles,
  navigationItemsDividerStyle,
  navigationStyles,
  socialMediaItemStyle,
  socialMediaStyle,
} from './styles.css';

type NavigationProps = {
  className?: string;
};

/**
 * `usePathname()` resolves to the rewritten EN route during SSR (e.g. `/products`)
 * but to the public LV slug on the client (`/produkti`). The nav `href`s are LV,
 * so we map an EN pathname back to its LV slug before the active check to keep it
 * consistent across SSR and client (otherwise the active item only lights up after
 * hydration). Home (`/`) is identical on both sides, so it is left out of the map.
 */
const enToLvPath: Record<string, string> = Object.fromEntries(
  Object.entries(PAGES.EN)
    .filter(([key]) => key !== 'HOME')
    .map(([key, enSlug]) => [`/${enSlug}`, `/${PAGES.LV[key as keyof typeof PAGES.LV]}`]),
);

const toLvPathname = (pathname: string): string => {
  const exactMatch = enToLvPath[pathname];

  if (exactMatch) {
    return exactMatch;
  }

  const nestedMatch = Object.entries(enToLvPath).find(([enPath]) =>
    pathname.startsWith(`${enPath}/`),
  );

  return nestedMatch ? pathname.replace(nestedMatch[0], nestedMatch[1]) : pathname;
};

export const Navigation: FunctionComponent<NavigationProps> = ({ className }) => {
  const pathname = usePathname();
  const activePathname = toLvPathname(pathname);
  const { mobileNavigationIsVisible, setMobileNavigationIsVisible } =
    useLayoutMobileNavigationIsVisible();

  const handleOpenMobileNavigation = () => setMobileNavigationIsVisible(true);
  const handleCloseMobileNavigation = () => setMobileNavigationIsVisible(false);

  return (
    <>
      <button
        type="button"
        aria-label="Aizvērt mobilo navigāciju"
        className={navigationBackdropStyles({ isVisible: mobileNavigationIsVisible })}
        onClick={handleCloseMobileNavigation}
        tabIndex={-1}
      />
      <nav
        className={clsx(
          cardStyles({ variant: 'filled', shadow: 'medium', radius: 'large' }),
          navigationStyles({ isVisible: mobileNavigationIsVisible }),
          className,
        )}
      >
        {navigationItems
          .filter(({ visibleInNavigation }) => visibleInNavigation)
          .map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              className={navigationItemStyles({
                active:
                  (activePathname === '/' && href === '/') ||
                  (activePathname.startsWith(href) && href !== '/'),
              })}
              onClick={handleCloseMobileNavigation}
            >
              {icon}
              {label}
            </Link>
          ))}
        <Divider
          className={navigationItemsDividerStyle}
          variant="dashed"
          color="default"
          spacing="small"
        />
        <div className={socialMediaStyle}>
          {socialMediaItems.map(({ href, icon, label }) => (
            <a
              className={socialMediaItemStyle}
              href={href}
              key={href}
              aria-label={label}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {icon}
            </a>
          ))}
        </div>
      </nav>
      <IconButton
        className={navigationButtonStyle}
        iconSlot={<Menu />}
        aria-label="Atvērt mobilo navigāciju"
        onClick={handleOpenMobileNavigation}
      />
    </>
  );
};

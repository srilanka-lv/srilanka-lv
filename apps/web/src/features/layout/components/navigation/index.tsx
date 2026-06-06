'use client';

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

export const Navigation: FunctionComponent<NavigationProps> = ({ className }) => {
  const pathname = usePathname();
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
                  (pathname === '/' && href === '/') || (pathname.startsWith(href) && href !== '/'),
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
          {socialMediaItems.map(({ href, icon }) => (
            <a
              className={socialMediaItemStyle}
              href={href}
              key={href}
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

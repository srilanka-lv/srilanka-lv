import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { Heading } from '@/shared/components/heading';

import { footerHeadingStyle } from '../footer/styles.css';
import { navigationItems } from '../navigation/index.data';
import { footerLinksLinkStyle, footerLinksListStyle } from './styles.css';

// Every item that is not in the header, except Home: that one is only
// registered for breadcrumbs and is reachable from the logo.
const guideItems = navigationItems.filter((item) => !item.visibleInNavigation && item.href !== '/');

export const FooterLinks: FunctionComponent = () => (
  <div>
    <Heading as="h2" variant="h6" className={footerHeadingStyle}>
      Viss par ceļošanu Šrilankā
    </Heading>
    <ul className={footerLinksListStyle}>
      {guideItems.map(({ label, href }) => (
        <li key={label}>
          <Link className={footerLinksLinkStyle} href={href}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

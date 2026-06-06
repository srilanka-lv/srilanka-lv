import clsx from 'clsx';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { getSiteUrl } from '@/shared/utils/get-site-url';

import type { BreadcrumbItem } from './build-items';
import {
  breadcrumbsCurrentStyle,
  breadcrumbsItemStyle,
  breadcrumbsLinkStyle,
  breadcrumbsListStyle,
  breadcrumbsNavStyle,
} from './styles.css';

type BreadcrumbsProps = {
  className?: string;
  items: BreadcrumbItem[];
};

function toAbsoluteUrl(href: string): string {
  const siteUrl = getSiteUrl();

  if (href === '/') {
    return siteUrl;
  }

  return `${siteUrl}${href}`;
}

export const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = ({ className, items }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: toAbsoluteUrl(item.href),
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumbs" className={clsx(breadcrumbsNavStyle, className)}>
        <ol className={breadcrumbsListStyle}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            if (isLast) {
              return (
                <li
                  key={item.href}
                  aria-current="page"
                  className={clsx(breadcrumbsItemStyle, breadcrumbsCurrentStyle)}
                >
                  {item.name}
                </li>
              );
            }

            return (
              <li key={item.href} className={breadcrumbsItemStyle}>
                <Link href={item.href} className={breadcrumbsLinkStyle}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

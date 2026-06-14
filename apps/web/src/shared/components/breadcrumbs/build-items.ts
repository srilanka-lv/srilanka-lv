import { PAGE_BLOGS_SLUG } from '@packages/sanity/constants/pages-slugs';

import { navigationItems } from '@/features/layout/components/navigation/index.data';

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function findNavLabel(href: string): string {
  const item = navigationItems.find((entry) => entry.href === href);

  if (!item) {
    throw new Error(`No navigationItems entry registered for href: ${href}`);
  }

  return item.label;
}

export function buildSectionItems(href: string): BreadcrumbItem[] {
  return [
    { name: findNavLabel('/'), href: '/' },
    { name: findNavLabel(href), href },
  ];
}

export function buildPostItems(slug: string, title: string): BreadcrumbItem[] {
  const blogHref = `/${PAGE_BLOGS_SLUG}`;

  return [
    { name: findNavLabel('/'), href: '/' },
    { name: findNavLabel(blogHref), href: blogHref },
    { name: title, href: `${blogHref}/${slug}` },
  ];
}

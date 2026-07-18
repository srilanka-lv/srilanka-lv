import { PAGES } from '@packages/sanity/constants/pages-slugs';

import { navigationItems } from '@/features/layout/components/navigation/index.data';

export type BreadcrumbItem = {
  name: string;
  href: string;
};

/**
 * A trail segment passed to `buildItems`. A `string` is a registered href whose
 * label is resolved from `navigationItems`; an object is an explicit leaf for
 * dynamic content (e.g. a blog post or product title) not in the navigation.
 */
type BreadcrumbSegment = string | BreadcrumbItem;

export function findNavLabel(href: string): string {
  const item = navigationItems.find((entry) => entry.href === href);

  if (!item) {
    throw new Error(`No navigationItems entry registered for href: ${href}`);
  }

  return item.label;
}

/**
 * Builds a breadcrumb trail of any depth, always rooted at Home. Pass each
 * ancestor and the current page in order, e.g.
 * `buildItems('/produkti', { name: title, href: '/produkti/<slug>' })`.
 */
export function buildItems(...segments: BreadcrumbSegment[]): BreadcrumbItem[] {
  return [
    { name: findNavLabel('/'), href: '/' },
    ...segments.map((segment) =>
      typeof segment === 'string' ? { name: findNavLabel(segment), href: segment } : segment,
    ),
  ];
}

export function buildSectionItems(href: string): BreadcrumbItem[] {
  return buildItems(href);
}

export function buildPostItems(slug: string, title: string): BreadcrumbItem[] {
  const blogHref = `/${PAGES.LV.BLOGS}`;

  return buildItems(blogHref, { name: title, href: `${blogHref}/${slug}` });
}

import { PAGE_ABOUT_ME_SLUG } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems, findNavLabel } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGE_ABOUT_ME_SLUG);

export default function AboutMePage() {
  const href = `/${PAGE_ABOUT_ME_SLUG}`;

  return (
    <>
      <Breadcrumbs items={buildSectionItems(href)} />
      <h1>{findNavLabel(href)}</h1>
      <span>About Me Page</span>
    </>
  );
}

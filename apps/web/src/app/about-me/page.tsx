import type { Metadata } from 'next';

import { PAGE_ABOUT_ME_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGE_ABOUT_ME_SLUG);

export default function AboutMePage() {
  return (
    <>
      <Breadcrumbs items={buildSectionItems(`/${PAGE_ABOUT_ME_SLUG}`)} />
      <span>About Me Page</span>
    </>
  );
}

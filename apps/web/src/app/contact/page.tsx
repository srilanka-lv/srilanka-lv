import { PAGE_CONTACT_SLUG } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems, findNavLabel } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGE_CONTACT_SLUG);

export default function ContactPage() {
  const href = `/${PAGE_CONTACT_SLUG}`;

  return (
    <>
      <Breadcrumbs items={buildSectionItems(href)} />
      <h1>{findNavLabel(href)}</h1>
      <span>About Me Page</span>
    </>
  );
}

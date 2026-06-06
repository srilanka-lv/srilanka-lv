import type { Metadata } from 'next';

import { PAGE_CONTACT_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGE_CONTACT_SLUG);

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={buildSectionItems(`/${PAGE_CONTACT_SLUG}`)} />
      <span>Contact Page</span>
    </>
  );
}

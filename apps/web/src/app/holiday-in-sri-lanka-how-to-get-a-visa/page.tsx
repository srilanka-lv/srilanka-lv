import type { Metadata } from 'next';

import { PAGE_INFO_VISA_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems, findNavLabel } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGE_INFO_VISA_SLUG);

export default function HolidayInSriLankaHowToGetAVisaPage() {
  const href = `/${PAGE_INFO_VISA_SLUG}`;

  return (
    <>
      <Breadcrumbs items={buildSectionItems(href)} />
      <h1>{findNavLabel(href)}</h1>
    </>
  );
}

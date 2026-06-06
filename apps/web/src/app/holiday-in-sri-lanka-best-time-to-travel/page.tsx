import type { Metadata } from 'next';

import { PAGE_INFO_BEST_TIME_TO_TRAVEL_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems, findNavLabel } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata(PAGE_INFO_BEST_TIME_TO_TRAVEL_SLUG);

export default function HolidayInSriLankaWhenToGoPage() {
  const href = `/${PAGE_INFO_BEST_TIME_TO_TRAVEL_SLUG}`;

  return (
    <>
      <Breadcrumbs items={buildSectionItems(href)} />
      <h1>{findNavLabel(href)}</h1>
    </>
  );
}

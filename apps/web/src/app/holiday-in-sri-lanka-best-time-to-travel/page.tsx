import { PAGE_INFO_BEST_TIME_TO_TRAVEL_SLUG } from '@packages/sanity/constants/pages-slugs';
import { pagesBySlugQuery } from '@packages/sanity/queries/pages-by-slug-query';
import type { Metadata } from 'next';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { buildSanityRepository } from '@/features/sanity/utils/build-sanity-repository';
import { StaticPageLayout } from '@/shared/components/static-page-layout';

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata(PAGE_INFO_BEST_TIME_TO_TRAVEL_SLUG);

export default async function HolidayInSriLankaWhatToDoPage() {
  const repository = buildSanityRepository();
  const post = await repository.query(pagesBySlugQuery, {
    slug: PAGE_INFO_BEST_TIME_TO_TRAVEL_SLUG,
  });

  return <StaticPageLayout href={`/${PAGE_INFO_BEST_TIME_TO_TRAVEL_SLUG}`} body={post?.body} />;
}

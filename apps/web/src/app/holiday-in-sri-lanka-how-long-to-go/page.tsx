import { PAGES } from '@packages/sanity/constants/pages-slugs';
import { pagesBySlugQuery } from '@packages/sanity/queries/pages-by-slug-query';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { buildSanityRepository } from '@/features/sanity/utils/build-sanity-repository';
import { StaticPageLayout } from '@/shared/components/static-page-layout';

export const generateMetadata = (): Promise<Metadata> =>
  buildPageMetadata(PAGES.LV.INFO_HOW_LONG_TO_GO);

const NextHolidayInSriLankaWhatToDoPage: FunctionComponent = async () => {
  const repository = buildSanityRepository();
  const post = await repository.query(pagesBySlugQuery, {
    slug: PAGES.LV.INFO_HOW_LONG_TO_GO,
  });

  return <StaticPageLayout href={`/${PAGES.LV.INFO_HOW_LONG_TO_GO}`} body={post?.body} />;
};

export default NextHolidayInSriLankaWhatToDoPage;

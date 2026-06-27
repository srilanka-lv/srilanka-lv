import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { BlogsPageLayout } from '@/shared/components/blogs-page-layout';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGES.LV.BLOGS);

const NextBlogsPage: FunctionComponent = async () => <BlogsPageLayout />;

export default NextBlogsPage;

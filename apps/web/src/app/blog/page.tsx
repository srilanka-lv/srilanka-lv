import type { Metadata } from 'next';

import { PAGE_BLOGS_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { BlogsPageLayout } from '@/shared/components/blogs-page-layout';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGE_BLOGS_SLUG);

export default async function BlogsPage() {
  return <BlogsPageLayout />;
}

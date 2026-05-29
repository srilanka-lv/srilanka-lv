import type { Metadata } from 'next';

import { PAGE_ABOUT_ME_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGE_ABOUT_ME_SLUG);

export default function AboutMePage() {
  return <span>About Me Page</span>;
}

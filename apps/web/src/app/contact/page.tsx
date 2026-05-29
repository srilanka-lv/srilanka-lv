import type { Metadata } from 'next';

import { PAGE_CONTACT_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGE_CONTACT_SLUG);

export default function ContactPage() {
  return <span>Contact Page</span>;
}

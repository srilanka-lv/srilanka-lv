import type { Metadata } from 'next';

import { PAGE_HOME_SLUG } from '@/features/sanity/constants/pages-slugs';
import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { HomeJsonLd } from '@/shared/components/home-json-ld';
import { SectionBlogs } from '@/shared/components/section-blogs';
import { SectionFaqs } from '@/shared/components/section-faqs';
import { SectionHero } from '@/shared/components/section-hero';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGE_HOME_SLUG, '/');

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <SectionHero />
      <SectionFaqs />
      <SectionBlogs sectionTitle="Mani piedzīvojumi Šrilankā" />
    </>
  );
}

import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { HomeJsonLd } from '@/shared/components/home-json-ld';
import { SectionBlogs } from '@/shared/components/section-blogs';
import { SectionFaqs } from '@/shared/components/section-faqs';
import { SectionHero } from '@/shared/components/section-hero';

export const generateMetadata = async (): Promise<Metadata> => {
  const metadata = await buildPageMetadata(PAGES.LV.HOME, '/');

  // The homepage title is authored in Sanity as the complete title; opt out of
  // the root layout's "%s | Šrilanka 26/27" template so it is not suffixed.
  if (typeof metadata.title === 'string') {
    return { ...metadata, title: { absolute: metadata.title } };
  }

  return metadata;
};

const NextHomePage: FunctionComponent = () => {
  return (
    <>
      <HomeJsonLd />
      <SectionHero />
      <SectionFaqs />
      <SectionBlogs sectionTitle="Mani piedzīvojumi Šrilankā" blogsLimit={6} />
    </>
  );
};

export default NextHomePage;

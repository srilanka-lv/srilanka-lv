import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { AboutJsonLd } from '@/shared/components/about-json-ld';
import { AboutPage } from '@/shared/components/about-page';
import { findNavLabel } from '@/shared/components/breadcrumbs/build-items';

// If the Sanity doc's seo.metaTitle is ever emptied, an SEO-focused page must
// not fall through to the bare layout default; the nav label keeps the root
// layout's title template working.
export const generateMetadata = async (): Promise<Metadata> => {
  const metadata = await buildPageMetadata(PAGES.LV.ABOUT_ME);

  return { ...metadata, title: metadata.title ?? findNavLabel(`/${PAGES.LV.ABOUT_ME}`) };
};

const NextAboutMePage: FunctionComponent = () => {
  const href = `/${PAGES.LV.ABOUT_ME}`;

  return (
    <>
      <AboutJsonLd path={href} title={findNavLabel(href)} />
      <AboutPage />
    </>
  );
};

export default NextAboutMePage;

import { PAGES } from '@packages/sanity/constants/pages-slugs';
import type { Metadata } from 'next';
import type { FunctionComponent } from 'react';

import { buildPageMetadata } from '@/features/sanity/utils/build-page-metadata';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { buildSectionItems, findNavLabel } from '@/shared/components/breadcrumbs/build-items';

export const generateMetadata = (): Promise<Metadata> => buildPageMetadata(PAGES.LV.CONTACT);

const NextContactPage: FunctionComponent = () => {
  const href = `/${PAGES.LV.CONTACT}`;

  return (
    <>
      <Breadcrumbs items={buildSectionItems(href)} />
      <h1>{findNavLabel(href)}</h1>
      <span>About Me Page</span>
    </>
  );
};

export default NextContactPage;

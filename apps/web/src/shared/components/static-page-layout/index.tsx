import type { PagesBySlugQueryResult } from '@packages/sanity/sanity.types';
import type { FunctionComponent } from 'react';

import { BlogText } from '../blog-text';
import { Breadcrumbs } from '../breadcrumbs';
import { buildSectionItems, findNavLabel } from '../breadcrumbs/build-items';
import { SectionBlogs } from '../section-blogs';
import { articleStyle } from './index.css';

type StaticPageLayoutProps = {
  href: string;
  body?: NonNullable<PagesBySlugQueryResult>['body'];
};

export const StaticPageLayout: FunctionComponent<StaticPageLayoutProps> = ({ href, body }) => (
  <>
    <article className={articleStyle}>
      <Breadcrumbs items={buildSectionItems(href)} />
      <h1>{findNavLabel(href)}</h1>
      {body && <BlogText body={body} />}
    </article>
    <SectionBlogs sectionTitle="Mani piedzīvojumi Šrilankā" blogsLimit={6} />
  </>
);

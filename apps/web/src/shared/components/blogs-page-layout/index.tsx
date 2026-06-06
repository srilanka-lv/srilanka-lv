import type { FunctionComponent } from 'react';

import { PAGE_BLOGS_SLUG } from '@/features/sanity/constants/pages-slugs';

import { Breadcrumbs } from '../breadcrumbs';
import { buildSectionItems } from '../breadcrumbs/build-items';
import { SectionBlogs } from '../section-blogs';
import { blogsPageLayoutBlogsStyle, blogsPageLayoutStyle } from './styles.css';

export const BlogsPageLayout: FunctionComponent = () => (
  <div className={blogsPageLayoutStyle}>
    <Breadcrumbs items={buildSectionItems(`/${PAGE_BLOGS_SLUG}`)} />
    <SectionBlogs sectionBlogsClassName={blogsPageLayoutBlogsStyle} />
    <aside>Partnerships</aside>
  </div>
);

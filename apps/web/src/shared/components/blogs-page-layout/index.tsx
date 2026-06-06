import type { FunctionComponent } from 'react';

import { PAGE_BLOGS_SLUG } from '@/features/sanity/constants/pages-slugs';

import { Breadcrumbs } from '../breadcrumbs';
import { buildSectionItems } from '../breadcrumbs/build-items';
import { SectionBlogs } from '../section-blogs';
import { blogsPageLayoutBlogsStyle, blogsPageLayoutStyle, breadcrumbsStyle } from './styles.css';

export const BlogsPageLayout: FunctionComponent = () => (
  <>
    <Breadcrumbs className={breadcrumbsStyle} items={buildSectionItems(`/${PAGE_BLOGS_SLUG}`)} />
    <div className={blogsPageLayoutStyle}>
      <SectionBlogs sectionBlogsClassName={blogsPageLayoutBlogsStyle} />
      <aside>Partnerships</aside>
    </div>
  </>
);

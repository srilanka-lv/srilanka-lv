import type { FunctionComponent } from 'react';

import { SectionBlogs } from '../section-blogs';
import { blogsPageLayoutBlogsStyle, blogsPageLayoutStyle } from './styles.css';

export const BlogsPageLayout: FunctionComponent = () => (
  <div className={blogsPageLayoutStyle}>
    <SectionBlogs sectionBlogsClassName={blogsPageLayoutBlogsStyle} />
    <aside>Partnerships</aside>
  </div>
);

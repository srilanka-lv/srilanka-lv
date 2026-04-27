import type { SchemaTypeDefinition } from 'sanity';

import { blogPosts } from './documents/blog-posts';
import { faqs } from './documents/faqs';
import { pages } from './documents/pages';
import { tags } from './documents/tags';
import { blockContent } from './objects/block-content';
import { openGraph } from './objects/open-graph';
import { seo } from './objects/seo';

export const schemas: SchemaTypeDefinition[] = [
  blockContent,
  seo,
  openGraph,
  tags,
  faqs,
  pages,
  blogPosts,
];

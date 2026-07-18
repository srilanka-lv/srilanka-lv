import type { SchemaTypeDefinition } from 'sanity';
import { stlTableBlock } from 'sanity-plugin-stl-table';

import { blogPosts } from './documents/blog-posts';
import { faqs } from './documents/faqs';
import { pages } from './documents/pages';
import { tags } from './documents/tags';
import { blockContent } from './objects/block-content';
import { imageGallery } from './objects/image-gallery';
import { openGraph } from './objects/open-graph';
import { seo } from './objects/seo';
import { youTube } from './objects/youtube';

export const schemas: SchemaTypeDefinition[] = [
  blockContent,
  seo,
  openGraph,
  imageGallery,
  stlTableBlock,
  youTube,
  tags,
  faqs,
  pages,
  blogPosts,
];

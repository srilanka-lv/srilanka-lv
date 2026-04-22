import type { SchemaTypeDefinition } from 'sanity';

import { blogPosts } from './documents/blog-posts';
import { tags } from './documents/tags';
import { blockContent } from './objects/block-content';
import { openGraph } from './objects/open-graph';
import { seo } from './objects/seo';

export const schemas: SchemaTypeDefinition[] = [blockContent, seo, openGraph, tags, blogPosts];

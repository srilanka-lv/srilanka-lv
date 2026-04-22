import type { SchemaTypeDefinition } from 'sanity';

import { blogPost } from './documents/blog-post';
import { tag } from './documents/tag';
import { blockContent } from './objects/block-content';
import { og } from './objects/og';
import { seo } from './objects/seo';

export const schemas: SchemaTypeDefinition[] = [blockContent, seo, og, tag, blogPost];

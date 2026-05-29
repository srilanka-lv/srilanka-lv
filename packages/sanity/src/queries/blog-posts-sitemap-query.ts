import { defineQuery } from 'groq';

export const blogPostsSitemapQuery = defineQuery(
  '*[_type == "blogPosts" && defined(slug.current)]{ "slug": slug.current, _updatedAt }',
);

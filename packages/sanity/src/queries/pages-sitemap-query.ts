import { defineQuery } from 'groq';

export const pagesSitemapQuery = defineQuery(
  '*[_type == "pages" && slug.current in $slugs]{ "slug": slug.current, _updatedAt }',
);

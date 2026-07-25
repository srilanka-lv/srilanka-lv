import { defineQuery } from 'groq';

export const pagesLlmsTxtQuery = defineQuery(
  '*[_type == "pages" && slug.current in $slugs]{ "slug": slug.current, title, "description": seo.metaDescription }',
);

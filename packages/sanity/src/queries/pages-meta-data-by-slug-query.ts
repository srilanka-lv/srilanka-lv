import { defineQuery } from 'groq';

export const pagesMetaDataBySlugQuery = defineQuery(
  '*[_type == "pages" && slug.current == $slug][0]{ seo, openGraph }',
);

import { defineQuery } from 'groq';

export const blogPostsMetaDataBySlugQuery = defineQuery(
  '*[_type == "blogPosts" && slug.current == $slug][0]{ seo, openGraph }',
);

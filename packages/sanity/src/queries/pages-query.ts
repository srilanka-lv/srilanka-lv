import { defineQuery } from 'groq';

export const pagesQuery = defineQuery(
  '*[_type == "pages"] | order(publishedAt desc) [0...$limit]{ _id, title, slug, excerpt, coverImage, publishedAt }',
);

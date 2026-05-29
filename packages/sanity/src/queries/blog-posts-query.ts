import { defineQuery } from 'groq';

export const blogPostsQuery = defineQuery(
  '*[_type == "blogPosts"] | order(publishedAt desc) [0...$limit]{ _id, title, slug, excerpt, coverImage, publishedAt }',
);

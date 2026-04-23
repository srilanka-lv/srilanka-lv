import { defineQuery } from 'groq';

export const allBlogPostsQuery = defineQuery(
  '*[_type == "blogPosts"]{ _id, title, slug, excerpt, coverImage, publishedAt }',
);

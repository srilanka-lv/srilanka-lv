import { defineQuery } from 'groq';

export const pagesQuery = defineQuery(
  '*[_type == "pages"] | order(title asc) [0...$limit]{ _id, title, slug }',
);

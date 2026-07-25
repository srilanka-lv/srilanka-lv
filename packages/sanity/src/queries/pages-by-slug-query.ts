import { defineQuery } from 'groq';

export const pagesBySlugQuery = defineQuery(`
  *[_type == "pages" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    body,
    seo,
    openGraph
  }
`);

import { defineQuery } from 'groq';

export const blogPostBySlugQuery = defineQuery(`
  *[_type == "blogPosts" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    body,
    publishedAt,
    seo,
    openGraph,
    tags[]->{ _id, title, slug },
    faqs[]->{ _id, question, answer }
  }
`);

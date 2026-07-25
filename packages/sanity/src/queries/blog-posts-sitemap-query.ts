import { defineQuery } from 'groq';

export const blogPostsSitemapQuery = defineQuery(`
  *[_type == "blogPosts" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt,
    "imageUrls": array::unique(array::compact(
      [coverImage.asset->url, openGraph.openGraphImage.asset->url]
      + coalesce(body[_type == "image"].asset->url, [])
      + coalesce(body[_type == "imageGallery"].images[].asset->url, [])
    ))
  }
`);

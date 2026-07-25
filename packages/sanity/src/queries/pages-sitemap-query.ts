import { defineQuery } from 'groq';

export const pagesSitemapQuery = defineQuery(`
  *[_type == "pages" && slug.current in $slugs]{
    "slug": slug.current,
    _updatedAt,
    "imageUrls": array::unique(array::compact(
      [openGraph.openGraphImage.asset->url]
      + coalesce(body[_type == "image"].asset->url, [])
      + coalesce(body[_type == "imageGallery"].images[].asset->url, [])
    ))
  }
`);

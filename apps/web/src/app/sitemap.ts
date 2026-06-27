import { PAGES } from '@packages/sanity/constants/pages-slugs';
import { blogPostsSitemapQuery } from '@packages/sanity/queries/blog-posts-sitemap-query';
import type { MetadataRoute } from 'next';

import { buildSanityRepository } from '@/features/sanity/utils/build-sanity-repository';
import { getSiteUrl } from '@/shared/utils/get-site-url';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const repository = buildSanityRepository();
  const posts = await repository.query(blogPostsSitemapQuery);

  const staticPaths = [
    '',
    `/${PAGES.LV.BLOGS}`,
    `/${PAGES.LV.PRODUCTS}`,
    `/${PAGES.LV.FLIGHT_TICKETS}`,
    `/${PAGES.LV.ABOUT_ME}`,
    `/${PAGES.LV.CONTACT}`,
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${siteUrl}/${PAGES.LV.BLOGS}/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  return [...staticEntries, ...blogEntries];
}

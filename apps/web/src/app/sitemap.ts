import { blogPostsSitemapQuery } from '@packages/sanity/queries/blog-posts-sitemap-query';
import type { MetadataRoute } from 'next';

import {
  PAGE_ABOUT_ME_SLUG,
  PAGE_BLOGS_SLUG,
  PAGE_CONTACT_SLUG,
  PAGE_FLIGHT_TICKETS_SLUG,
  PAGE_PRODUCTS_SLUG,
} from '@/features/sanity/constants/pages-slugs';
import { buildSanityRepository } from '@/features/sanity/utils/build-sanity-repository';
import { getSiteUrl } from '@/shared/utils/get-site-url';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const repository = buildSanityRepository();
  const posts = await repository.query(blogPostsSitemapQuery);

  const staticPaths = [
    '',
    `/${PAGE_BLOGS_SLUG}`,
    `/${PAGE_PRODUCTS_SLUG}`,
    `/${PAGE_FLIGHT_TICKETS_SLUG}`,
    `/${PAGE_ABOUT_ME_SLUG}`,
    `/${PAGE_CONTACT_SLUG}`,
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
      url: `${siteUrl}/${PAGE_BLOGS_SLUG}/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  return [...staticEntries, ...blogEntries];
}

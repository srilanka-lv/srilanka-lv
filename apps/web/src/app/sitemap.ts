import { PAGES } from '@packages/sanity/constants/pages-slugs';
import { blogPostsSitemapQuery } from '@packages/sanity/queries/blog-posts-sitemap-query';
import { pagesSitemapQuery } from '@packages/sanity/queries/pages-sitemap-query';
import type { MetadataRoute } from 'next';

import { buildSanityRepository } from '@/features/sanity/utils/build-sanity-repository';
import { getSiteUrl } from '@/shared/utils/get-site-url';

export const revalidate = 3600;

type StaticPage = {
  slug: string;
  path: string;
  priority: number;
};

const toStaticPage = (slug: string, path = `/${slug}`, priority = 0.7): StaticPage => ({
  slug,
  path,
  priority,
});

const staticPages: StaticPage[] = [
  toStaticPage(PAGES.LV.HOME, '', 1),
  toStaticPage(PAGES.LV.BLOGS),
  toStaticPage(PAGES.LV.PRODUCTS),
  toStaticPage(
    PAGES.LV.PRODUCTS_GIRLS_TRIP,
    `/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_GIRLS_TRIP}`,
  ),
  toStaticPage(PAGES.LV.FLIGHT_TICKETS),
  toStaticPage(PAGES.LV.ABOUT_ME),
  toStaticPage(PAGES.LV.INFO_WHAT_TO_DO),
  toStaticPage(PAGES.LV.INFO_WHERE_TO_STAY),
  toStaticPage(PAGES.LV.INFO_DAILY_BUDGET),
  toStaticPage(PAGES.LV.INFO_BEST_TIME_TO_TRAVEL),
  toStaticPage(PAGES.LV.INFO_HOW_LONG_TO_GO),
  toStaticPage(PAGES.LV.INFO_VISA),
  toStaticPage(PAGES.LV.INFO_TRANSPORT),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const repository = buildSanityRepository();

  const [pages, posts] = await Promise.all([
    repository.query(pagesSitemapQuery, {
      slugs: staticPages.map((staticPage) => staticPage.slug),
    }),
    repository.query(blogPostsSitemapQuery),
  ]);

  const pagesBySlug = new Map(pages.map((page) => [page.slug, page]));

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((staticPage) => {
    const page = pagesBySlug.get(staticPage.slug);

    return {
      url: `${siteUrl}${staticPage.path}`,
      ...(page ? { lastModified: new Date(page._updatedAt) } : {}),
      ...(page && page.imageUrls.length > 0 ? { images: page.imageUrls } : {}),
      changeFrequency: 'weekly',
      priority: staticPage.priority,
    };
  });

  const blogEntries: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${siteUrl}/${PAGES.LV.BLOGS}/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      ...(post.imageUrls.length > 0 ? { images: post.imageUrls } : {}),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  return [...staticEntries, ...blogEntries];
}

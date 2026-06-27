import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/shared/utils/get-site-url';

const robots = (): MetadataRoute.Robots => {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
};

export default robots;

import path from 'node:path';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

import {
  PAGE_ABOUT_ME_SLUG,
  PAGE_BLOGS_SLUG,
  PAGE_CONTACT_SLUG,
  PAGE_FLIGHT_TICKETS_SLUG,
  PAGE_HOME_SLUG,
  PAGE_PRODUCTS_SLUG,
} from '@/features/sanity/constants/pages-slugs';

import packageJson from '../../package.json' with { type: 'json' };

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'auto' },
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    qualities: [75, 100],
  },
  rewrites: async () => {
    return [
      {
        source: `/${PAGE_HOME_SLUG}`,
        destination: '/',
      },
      {
        source: `/${PAGE_PRODUCTS_SLUG}`,
        destination: '/products',
      },
      {
        source: `/${PAGE_ABOUT_ME_SLUG}`,
        destination: '/about-me',
      },
      {
        source: `/${PAGE_FLIGHT_TICKETS_SLUG}`,
        destination: '/flight-tickets',
      },
      {
        source: `/${PAGE_CONTACT_SLUG}`,
        destination: '/contact',
      },
      {
        source: `/${PAGE_BLOGS_SLUG}`,
        destination: '/blog',
      },
      {
        source: `/${PAGE_BLOGS_SLUG}/:slug`,
        destination: '/blog/:slug',
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: '/products',
        destination: `/${PAGE_PRODUCTS_SLUG}`,
        permanent: true,
      },
      {
        source: '/about-me',
        destination: `/${PAGE_ABOUT_ME_SLUG}`,
        permanent: true,
      },
      {
        source: '/flight-tickets',
        destination: `/${PAGE_FLIGHT_TICKETS_SLUG}`,
        permanent: true,
      },
      {
        source: '/contact',
        destination: `/${PAGE_CONTACT_SLUG}`,
        permanent: true,
      },
      {
        source: '/blog',
        destination: `/${PAGE_BLOGS_SLUG}`,
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: `/${PAGE_BLOGS_SLUG}/:slug`,
        permanent: true,
      },
    ];
  },
  output: 'standalone',
  outputFileTracingRoot: path.join(import.meta.dirname, '../../'),
  deploymentId: `v${packageJson.version.replaceAll('.', '-')}`,
  reactCompiler: true,
};

export default withVanillaExtract(nextConfig);

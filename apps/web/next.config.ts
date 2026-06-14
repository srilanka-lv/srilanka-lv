import path from 'node:path';
import {
  PAGE_ABOUT_ME_SLUG,
  PAGE_BLOGS_SLUG,
  PAGE_CONTACT_SLUG,
  PAGE_FLIGHT_TICKETS_SLUG,
  PAGE_HOME_SLUG,
  PAGE_INFO_BEST_TIME_TO_TRAVEL_SLUG,
  PAGE_INFO_DAILY_BUDGET_SLUG,
  PAGE_INFO_HOW_LONG_TO_GO_SLUG,
  PAGE_INFO_TRANSPORT_SLUG,
  PAGE_INFO_VISA_SLUG,
  PAGE_INFO_WHAT_TO_DO_WHAT_NOT_TO_DO_SLUG,
  PAGE_INFO_WHERE_TO_STAY_SLUG,
  PAGE_PRODUCTS_SLUG,
} from '@packages/sanity/constants/pages-slugs';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

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
      {
        source: `/${PAGE_INFO_WHAT_TO_DO_WHAT_NOT_TO_DO_SLUG}`,
        destination: '/holiday-in-sri-lanka-what-to-do',
      },
      {
        source: `/${PAGE_INFO_WHERE_TO_STAY_SLUG}`,
        destination: '/holiday-in-sri-lanka-where-to-stay',
      },
      {
        source: `/${PAGE_INFO_DAILY_BUDGET_SLUG}`,
        destination: '/holiday-in-sri-lanka-daily-budget',
      },
      {
        source: `/${PAGE_INFO_BEST_TIME_TO_TRAVEL_SLUG}`,
        destination: '/holiday-in-sri-lanka-best-time-to-travel',
      },
      {
        source: `/${PAGE_INFO_HOW_LONG_TO_GO_SLUG}`,
        destination: '/holiday-in-sri-lanka-how-long-to-go',
      },
      {
        source: `/${PAGE_INFO_VISA_SLUG}`,
        destination: '/holiday-in-sri-lanka-how-to-get-a-visa',
      },
      {
        source: `/${PAGE_INFO_TRANSPORT_SLUG}`,
        destination: '/holiday-in-sri-lanka-transport',
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
      {
        source: '/holiday-in-sri-lanka-what-to-do',
        destination: `/${PAGE_INFO_WHAT_TO_DO_WHAT_NOT_TO_DO_SLUG}`,
        permanent: true,
      },
      {
        source: '/holiday-in-sri-lanka-where-to-stay',
        destination: `/${PAGE_INFO_WHERE_TO_STAY_SLUG}`,
        permanent: true,
      },
      {
        source: '/holiday-in-sri-lanka-daily-budget',
        destination: `/${PAGE_INFO_DAILY_BUDGET_SLUG}`,
        permanent: true,
      },
      {
        source: '/holiday-in-sri-lanka-best-time-to-travel',
        destination: `/${PAGE_INFO_BEST_TIME_TO_TRAVEL_SLUG}`,
        permanent: true,
      },
      {
        source: '/holiday-in-sri-lanka-how-long-to-go',
        destination: `/${PAGE_INFO_HOW_LONG_TO_GO_SLUG}`,
        permanent: true,
      },
      {
        source: '/holiday-in-sri-lanka-how-to-get-a-visa',
        destination: `/${PAGE_INFO_VISA_SLUG}`,
        permanent: true,
      },
      {
        source: '/holiday-in-sri-lanka-transport',
        destination: `/${PAGE_INFO_TRANSPORT_SLUG}`,
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

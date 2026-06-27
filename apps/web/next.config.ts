import path from 'node:path';
import { PAGES } from '@packages/sanity/constants/pages-slugs';
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
        source: `/${PAGES.LV.HOME}`,
        destination: `/${PAGES.EN.HOME}`,
      },
      {
        source: `/${PAGES.LV.PRODUCTS}`,
        destination: `/${PAGES.EN.PRODUCTS}`,
      },
      {
        source: `/${PAGES.LV.ABOUT_ME}`,
        destination: `/${PAGES.EN.ABOUT_ME}`,
      },
      {
        source: `/${PAGES.LV.FLIGHT_TICKETS}`,
        destination: `/${PAGES.EN.FLIGHT_TICKETS}`,
      },
      {
        source: `/${PAGES.LV.CONTACT}`,
        destination: `/${PAGES.EN.CONTACT}`,
      },
      {
        source: `/${PAGES.LV.BLOGS}`,
        destination: `/${PAGES.EN.BLOGS}`,
      },
      {
        source: `/${PAGES.LV.BLOGS}/:slug`,
        destination: `/${PAGES.EN.BLOGS}/:slug`,
      },
      {
        source: `/${PAGES.LV.INFO_WHAT_TO_DO}`,
        destination: `/${PAGES.EN.INFO_WHAT_TO_DO}`,
      },
      {
        source: `/${PAGES.LV.INFO_WHERE_TO_STAY}`,
        destination: `/${PAGES.EN.INFO_WHERE_TO_STAY}`,
      },
      {
        source: `/${PAGES.LV.INFO_DAILY_BUDGET}`,
        destination: `/${PAGES.EN.INFO_DAILY_BUDGET}`,
      },
      {
        source: `/${PAGES.LV.INFO_BEST_TIME_TO_TRAVEL}`,
        destination: `/${PAGES.EN.INFO_BEST_TIME_TO_TRAVEL}`,
      },
      {
        source: `/${PAGES.LV.INFO_HOW_LONG_TO_GO}`,
        destination: `/${PAGES.EN.INFO_HOW_LONG_TO_GO}`,
      },
      {
        source: `/${PAGES.LV.INFO_VISA}`,
        destination: `/${PAGES.EN.INFO_VISA}`,
      },
      {
        source: `/${PAGES.LV.INFO_TRANSPORT}`,
        destination: `/${PAGES.EN.INFO_TRANSPORT}`,
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: `/${PAGES.EN.PRODUCTS}`,
        destination: `/${PAGES.LV.PRODUCTS}`,
        permanent: true,
      },
      {
        source: `/${PAGES.EN.ABOUT_ME}`,
        destination: `/${PAGES.LV.ABOUT_ME}`,
        permanent: true,
      },
      {
        source: `/${PAGES.EN.FLIGHT_TICKETS}`,
        destination: `/${PAGES.LV.FLIGHT_TICKETS}`,
        permanent: true,
      },
      {
        source: `/${PAGES.EN.CONTACT}`,
        destination: `/${PAGES.LV.CONTACT}`,
        permanent: true,
      },
      {
        source: `/${PAGES.EN.BLOGS}`,
        destination: `/${PAGES.LV.BLOGS}`,
        permanent: true,
      },
      {
        source: `/${PAGES.EN.BLOGS}/:slug`,
        destination: `/${PAGES.LV.BLOGS}/:slug`,
        permanent: true,
      },
      {
        source: `/${PAGES.EN.INFO_WHAT_TO_DO}`,
        destination: `/${PAGES.LV.INFO_WHAT_TO_DO}`,
        permanent: true,
      },
      {
        source: `/${PAGES.EN.INFO_WHERE_TO_STAY}`,
        destination: `/${PAGES.LV.INFO_WHERE_TO_STAY}`,
        permanent: true,
      },
      {
        source: `/${PAGES.EN.INFO_DAILY_BUDGET}`,
        destination: `/${PAGES.LV.INFO_DAILY_BUDGET}`,
        permanent: true,
      },
      {
        source: `/${PAGES.EN.INFO_BEST_TIME_TO_TRAVEL}`,
        destination: `/${PAGES.LV.INFO_BEST_TIME_TO_TRAVEL}`,
        permanent: true,
      },
      {
        source: `/${PAGES.EN.INFO_HOW_LONG_TO_GO}`,
        destination: `/${PAGES.LV.INFO_HOW_LONG_TO_GO}`,
        permanent: true,
      },
      {
        source: `/${PAGES.EN.INFO_VISA}`,
        destination: `/${PAGES.LV.INFO_VISA}`,
        permanent: true,
      },
      {
        source: `/${PAGES.EN.INFO_TRANSPORT}`,
        destination: `/${PAGES.LV.INFO_TRANSPORT}`,
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

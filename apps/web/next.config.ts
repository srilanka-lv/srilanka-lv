import path from 'node:path';
import { PAGES, RETIRED_PAGES } from '@packages/sanity/constants/pages-slugs';
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
      {
        protocol: 'https',
        hostname: 'www.gstatic.com',
      },
    ],
    qualities: [75, 100],
  },
  rewrites: async () => {
    return [
      {
        // The app router ignores dot-prefixed folders, so /.well-known/*
        // routes live under app/well-known/*.
        source: '/.well-known/:path*',
        destination: '/well-known/:path*',
      },
      {
        source: `/${PAGES.LV.HOME}`,
        destination: `/${PAGES.EN.HOME}`,
      },
      {
        source: `/${PAGES.LV.PRODUCTS}`,
        destination: `/${PAGES.EN.PRODUCTS}`,
      },
      {
        source: `/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_GIRLS_TRIP}`,
        destination: `/${PAGES.EN.PRODUCTS}/${PAGES.EN.PRODUCTS_GIRLS_TRIP}`,
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
        source: `/${PAGES.EN.PRODUCTS_GIRLS_TRIP}`,
        destination: `/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_GIRLS_TRIP}`,
        permanent: true,
      },
      {
        source: `/${PAGES.EN.PRODUCTS}/${PAGES.EN.PRODUCTS_GIRLS_TRIP}`,
        destination: `/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_GIRLS_TRIP}`,
        permanent: true,
      },
      // The consultation and holiday-plan pages are retired but still indexed
      // by Google, so every historical URL lands on the girls trip page.
      // Temporary (307) so the URLs can come back if those pages ship later.
      ...[
        {
          en: RETIRED_PAGES.EN.PRODUCTS_CONSULTATION,
          lv: RETIRED_PAGES.LV.PRODUCTS_CONSULTATION,
        },
        {
          en: RETIRED_PAGES.EN.PRODUCTS_HOLIDAY_PLAN,
          lv: RETIRED_PAGES.LV.PRODUCTS_HOLIDAY_PLAN,
        },
      ].flatMap(({ en, lv }) =>
        [`/${en}`, `/${PAGES.EN.PRODUCTS}/${en}`, `/${PAGES.LV.PRODUCTS}/${lv}`].map((source) => ({
          source,
          destination: `/${PAGES.LV.PRODUCTS}/${PAGES.LV.PRODUCTS_GIRLS_TRIP}`,
          permanent: false,
        })),
      ),
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
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value:
              '</llms.txt>; rel="llms-txt", </llms.txt>; rel="describedby"; type="text/markdown", </.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
          },
        ],
      },
    ];
  },
  output: 'standalone',
  outputFileTracingRoot: path.join(import.meta.dirname, '../../'),
  deploymentId: `v${packageJson.version.replaceAll('.', '-')}`,
  reactCompiler: true,
};

export default withVanillaExtract(nextConfig);

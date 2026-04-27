import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

import packageJson from '../../package.json' with { type: 'json' };

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'on' },
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/produkti',
        destination: '/products',
      },
      {
        source: '/par-mani',
        destination: '/about-me',
      },
      {
        source: '/lidojumi-cenas',
        destination: '/flight-tickets',
      },
      {
        source: '/kontakti',
        destination: '/contact',
      },
    ];
  },
  output: 'standalone',
  deploymentId: `v${packageJson.version.replaceAll('.', '-')}`,
  reactCompiler: true,
};

export default withVanillaExtract(nextConfig);

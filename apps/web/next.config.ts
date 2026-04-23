import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

import packageJson from '../../package.json' with { type: 'json' };

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'on' },
});

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/letakie-lidojumi-uz-srilanku-no-rigas',
        destination: '/flights-calendar',
      },
    ];
  },
  output: 'standalone',
  deploymentId: `v${packageJson.version.replaceAll('.', '-')}`,
  reactCompiler: true,
};

export default withVanillaExtract(nextConfig);

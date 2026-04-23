import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  studioHost: 'srilanka-lv',
  deployment: {
    autoUpdates: true,
    appId: 'a51gbbero6ba8k7zesiopc3w',
  },
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  typegen: {
    path: '../../packages/sanity/src/**/*.{ts,tsx}',
    schema: './schema.json',
    generates: '../../packages/sanity/src/sanity.types.ts',
  },
});

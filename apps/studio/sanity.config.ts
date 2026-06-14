import './schemaTypes/components/register';

import { visionTool } from '@sanity/vision';
import { schemas } from '@srilanka/sanity';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media, mediaAssetSource } from 'sanity-plugin-media';

export default defineConfig({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_DATASET as string,
  plugins: [structureTool(), visionTool(), media()],
  schema: {
    types: schemas,
  },
  form: {
    image: {
      assetSources: (prev) => prev.filter((source) => source === mediaAssetSource),
    },
    file: {
      assetSources: (prev) => prev.filter((source) => source === mediaAssetSource),
    },
  },
});

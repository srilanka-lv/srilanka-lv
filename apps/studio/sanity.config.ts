import { visionTool } from '@sanity/vision';
import { schemas } from '@srilanka/sanity';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_DATASET as string,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemas,
  },
});

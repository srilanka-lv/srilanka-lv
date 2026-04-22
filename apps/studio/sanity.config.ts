import { visionTool } from '@sanity/vision';
import { schemas } from '@srilanka/sanity';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  name: 'srilanka-lv',
  title: 'SriLanka.lv',

  projectId: '<your-sanity-project-id>',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemas,
  },
});

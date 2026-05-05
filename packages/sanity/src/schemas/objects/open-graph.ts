import { defineField, defineType } from 'sanity';

import { imageDimensionsValidator } from '../utils/validate-image-dimensions';

export const openGraph = defineType({
  title: 'Open Graph',
  name: 'openGraph',
  type: 'object',
  fields: [
    defineField({
      title: 'Open Graph Title',
      name: 'openGraphTitle',
      type: 'string',
      description: 'Title shown when sharing on social media.',
    }),
    defineField({
      title: 'Open Graph Description',
      name: 'openGraphDescription',
      type: 'text',
      rows: 3,
      description: 'Description shown when sharing on social media.',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      title: 'Open Graph Image',
      name: 'openGraphImage',
      type: 'image',
      description: 'Image shown when sharing on social media. Required: 1200×630 pixels.',
      options: {
        accept: 'image/png, image/jpeg, image/webp',
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.custom(imageDimensionsValidator({ width: 1200, height: 630 })),
    }),
  ],
});

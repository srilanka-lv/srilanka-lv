import { defineField, defineType } from 'sanity';

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
      description:
        'Image shown when sharing on social media. Recommended size: 1200x630px (1.91:1 ratio).',
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
    }),
  ],
});

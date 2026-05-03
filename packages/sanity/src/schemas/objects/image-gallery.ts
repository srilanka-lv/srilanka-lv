import { defineArrayMember, defineField, defineType } from 'sanity';

import { imageDimensionsValidator } from '../utils/validate-image-dimensions';

export const imageGallery = defineType({
  title: 'Image Gallery',
  name: 'imageGallery',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: (rule) => rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              validation: (rule) => rule.required(),
            },
          ],
          validation: (rule) =>
            rule.custom(imageDimensionsValidator({ width: 1080, height: 1920 })),
        }),
      ],
      options: { layout: 'grid' },
      validation: (rule) => rule.min(1),
    }),
  ],
});

import { defineField, defineType } from 'sanity';

export const tag = defineType({
  title: 'Birka',
  name: 'tag',
  type: 'document',
  fields: [
    defineField({
      title: 'Nosaukums',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'URL',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
  ],
});

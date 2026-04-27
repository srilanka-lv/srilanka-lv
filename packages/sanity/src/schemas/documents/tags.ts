import { defineField, defineType } from 'sanity';

export const tags = defineType({
  title: 'Tags',
  name: 'tags',
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Excerpt',
      name: 'excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      title: 'FAQs',
      name: 'faqs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faqs' }] }],
    }),
  ],
});

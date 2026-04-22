import { defineField, defineType } from 'sanity';

export const seo = defineType({
  title: 'SEO',
  name: 'seo',
  type: 'object',
  fields: [
    defineField({
      title: 'Meta Title',
      name: 'metaTitle',
      type: 'string',
      description: 'Overrides the page title in search engines.',
    }),
    defineField({
      title: 'Meta Description',
      name: 'metaDescription',
      type: 'text',
      rows: 3,
      description: 'Description shown in search engine results.',
      validation: (rule) => rule.max(160),
    }),
  ],
});

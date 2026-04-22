import { defineField, defineType } from 'sanity';

export const seo = defineType({
  title: 'SEO',
  name: 'seo',
  type: 'object',
  fields: [
    defineField({
      title: 'Meta virsraksts',
      name: 'metaTitle',
      type: 'string',
      description: 'Pārraksta lapas virsrakstu meklētājprogrammās.',
    }),
    defineField({
      title: 'Meta apraksts',
      name: 'metaDescription',
      type: 'text',
      rows: 3,
      description: 'Apraksts, kas parādās meklētājprogrammu rezultātos.',
      validation: (rule) => rule.max(160),
    }),
  ],
});

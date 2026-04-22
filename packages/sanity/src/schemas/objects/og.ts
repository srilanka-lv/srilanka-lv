import { defineField, defineType } from 'sanity';

export const og = defineType({
  title: 'Open Graph',
  name: 'og',
  type: 'object',
  fields: [
    defineField({
      title: 'OG virsraksts',
      name: 'ogTitle',
      type: 'string',
      description: 'Virsraksts, kas parādās, daloties sociālajos tīklos.',
    }),
    defineField({
      title: 'OG apraksts',
      name: 'ogDescription',
      type: 'text',
      rows: 3,
      description: 'Apraksts, kas parādās, daloties sociālajos tīklos.',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      title: 'OG attēls',
      name: 'ogImage',
      type: 'image',
      description: 'Attēls, kas parādās, daloties sociālajos tīklos.',
    }),
  ],
});

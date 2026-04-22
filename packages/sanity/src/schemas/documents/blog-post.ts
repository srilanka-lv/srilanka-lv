import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  title: 'Bloga ieraksts',
  name: 'blogPost',
  type: 'document',
  fields: [
    defineField({
      title: 'Virsraksts',
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
    defineField({
      title: 'Vāka attēls',
      name: 'coverImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternatīvais teksts',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Īss apraksts',
      name: 'excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      title: 'Saturs',
      name: 'body',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Birkas',
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      title: 'Publicēšanas datums',
      name: 'publishedAt',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'SEO',
      name: 'seo',
      type: 'seo',
    }),
    defineField({
      title: 'Open Graph',
      name: 'og',
      type: 'og',
    }),
  ],
  orderings: [
    {
      title: 'Publicēšanas datums (jaunākais)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, media, publishedAt }) {
      return {
        title,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString('lv-LV') : 'Nav publicēts',
        media,
      };
    },
  },
});

import { defineField, defineType } from 'sanity';

export const pages = defineType({
  title: 'Pages',
  name: 'pages',
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
      title: 'FAQ',
      name: 'faq',
      type: 'reference',
      to: [{ type: 'faqs' }],
    }),
    defineField({
      title: 'SEO',
      name: 'seo',
      type: 'seo',
    }),
    defineField({
      title: 'Open Graph',
      name: 'openGraph',
      type: 'openGraph',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: slug ? `/${slug}` : 'No slug',
      };
    },
  },
});

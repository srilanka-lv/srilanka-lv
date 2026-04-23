import { defineField, defineType } from 'sanity';

export const faqs = defineType({
  title: 'FAQs',
  name: 'faqs',
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
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [{ type: 'faqItem' }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      return {
        title,
        subtitle: items?.length
          ? `${items.length} question${items.length === 1 ? '' : 's'}`
          : 'No questions',
      };
    },
  },
});

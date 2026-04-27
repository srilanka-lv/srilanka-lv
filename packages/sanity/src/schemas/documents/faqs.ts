import { defineField, defineType } from 'sanity';

export const faqs = defineType({
  title: 'FAQs',
  name: 'faqs',
  type: 'document',
  fields: [
    defineField({
      title: 'Question',
      name: 'question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Answer',
      name: 'answer',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'question',
    },
  },
});

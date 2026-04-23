import { defineField, defineType } from 'sanity';

export const faqItem = defineType({
  title: 'FAQ Item',
  name: 'faqItem',
  type: 'object',
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

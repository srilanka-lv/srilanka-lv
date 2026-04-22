import { defineArrayMember, defineType } from 'sanity';

export const blockContent = defineType({
  title: 'Saturs',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normāls', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Citāts', value: 'blockquote' },
      ],
      lists: [
        { title: 'Saraksts', value: 'bullet' },
        { title: 'Numurēts saraksts', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Treknraksts', value: 'strong' },
          { title: 'Slīpraksts', value: 'em' },
        ],
        annotations: [
          {
            title: 'Saite',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (rule) =>
                  rule.uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternatīvais teksts',
          validation: (rule) => rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Paraksts',
        },
      ],
    }),
  ],
});

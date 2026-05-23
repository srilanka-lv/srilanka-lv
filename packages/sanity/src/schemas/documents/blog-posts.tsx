import { defineField, defineType } from 'sanity';

import { AutoSlugInput } from '../../components/auto-slug-input';
import { imageDimensionsValidator } from '../utils/validate-image-dimensions';

export const blogPosts = defineType({
  title: 'Blog Posts',
  name: 'blogPosts',
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      description:
        'The title for this blog post. Always shows up as the big title in the front-end, which is good for SEO. Aim for 30–60 characters: long enough to be descriptive, short enough that Google does not truncate it in search results.',
      name: 'title',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .min(30)
          .max(60)
          .warning('Outside the recommended 30–60 character range for SEO titles.'),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description:
        'The last part of the URL for this blog post. Auto-generated from the title until you edit it. Once you change it manually, it will not auto-update again.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      components: {
        input: AutoSlugInput,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Cover Image',
      name: 'coverImage',
      type: 'image',
      description:
        'The big background image for this blog post. Required dimensions: 3456px width, 2234px height.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Cover Image Alt Text',
          description:
            'The alt text for the cover image. This should describe the image. For example: "A photo of a modern cafe where people are coworking together in Madiha, in the South of Sri Lanka."',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) =>
        rule.required().custom(imageDimensionsValidator({ width: 3456, height: 2234 })),
    }),
    defineField({
      title: 'Excerpt',
      name: 'excerpt',
      type: 'text',
      rows: 3,
      description:
        'The short description of this blog post. This will show up as the meta description in the front-end, which is good for SEO. Aim for 150–160 characters: long enough to be descriptive, short enough that Google does not truncate it in search results.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'blockContent',
      description:
        'The main content of this blog post. This will show up as the body of the blog post in the front-end. Use this space to tell your story, share your insights, and engage your readers.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Tags',
      description:
        'Tags are used to categorize your blog posts. For example: "Travel", "Food", "Lifestyle", "Technology", etc.',
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tags' }] }],
    }),
    defineField({
      title: 'Published At',
      description:
        'The date and time this blog post was published. This will show up as the published date in the front-end.',
      name: 'publishedAt',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'FAQs',
      description: 'FAQs are used to answer frequently asked questions about this blog post.',
      name: 'faqs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faqs' }] }],
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
  orderings: [
    {
      title: 'Published At (newest)',
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
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString('lv-LV') : 'Not published',
        media,
      };
    },
  },
});

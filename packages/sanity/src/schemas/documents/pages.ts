import { defineField, defineType } from 'sanity';

import { PAGES } from '../../constants/pages-slugs';

const SLUGS_WITHOUT_BODY: string[] = [
  PAGES.LV.HOME,
  PAGES.LV.FLIGHT_TICKETS,
  PAGES.LV.ABOUT_ME,
  PAGES.LV.PRODUCTS,
  PAGES.LV.BLOGS,
];

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
      title: 'Body',
      name: 'body',
      type: 'blockContent',
      description:
        'The main content of this page. This will show up as the body of the page in the front-end. Use this space to tell your story, share your insights, and engage your readers.',
      hidden: ({ document }) => {
        const slug = (document?.slug as { current?: string } | undefined)?.current;
        return slug ? SLUGS_WITHOUT_BODY.includes(slug) : false;
      },
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

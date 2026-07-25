import { PAGES } from '@packages/sanity/constants/pages-slugs';
import { blogPostsQuery } from '@packages/sanity/queries/blog-posts-query';
import { pagesLlmsTxtQuery } from '@packages/sanity/queries/pages-llms-txt-query';

import { buildSanityRepository } from '@/features/sanity/utils/build-sanity-repository';
import { products } from '@/shared/components/products-page/index.data';
import { SITE_NAME } from '@/shared/constants/site-name';
import { getSiteUrl } from '@/shared/utils/get-site-url';

export const revalidate = 3600;

const BLOG_POSTS_LIMIT = 20;

const SITE_SUMMARY =
  'Latviešu valodas ceļvedis par Šrilanku, ko raksta latviete, kura salā dzīvo kopš 2022. gada';

type SectionPage = {
  slug: string;
  path: string;
  fallback?: {
    title: string;
    description: string;
  };
};

type Section = {
  heading: string;
  pages: SectionPage[];
};

const toSectionPage = (slug: string, path = `/${slug}`): SectionPage => ({ slug, path });

const sections: Section[] = [
  {
    heading: 'Ceļveži',
    pages: [
      toSectionPage(PAGES.LV.INFO_WHAT_TO_DO),
      toSectionPage(PAGES.LV.INFO_WHERE_TO_STAY),
      toSectionPage(PAGES.LV.INFO_DAILY_BUDGET),
      toSectionPage(PAGES.LV.FLIGHT_TICKETS),
      toSectionPage(PAGES.LV.INFO_BEST_TIME_TO_TRAVEL),
      toSectionPage(PAGES.LV.INFO_HOW_LONG_TO_GO),
      toSectionPage(PAGES.LV.INFO_VISA),
      toSectionPage(PAGES.LV.INFO_TRANSPORT),
    ],
  },
  {
    heading: 'Produkti',
    pages: [
      toSectionPage(PAGES.LV.PRODUCTS),
      ...products.map((product) => ({
        slug: product.slug,
        path: product.href,
        fallback: {
          title: product.title,
          description: product.description,
        },
      })),
    ],
  },
  {
    heading: 'Par mani',
    pages: [toSectionPage(PAGES.LV.ABOUT_ME), toSectionPage(PAGES.LV.CONTACT)],
  },
];

const toSingleLine = (text: string): string => text.replaceAll(/\s+/g, ' ').trim();

const toListItem = (title: string, url: string, description?: string | null): string => {
  if (description) {
    return `- [${toSingleLine(title)}](${url}): ${toSingleLine(description)}`;
  }

  return `- [${toSingleLine(title)}](${url})`;
};

export const GET = async (): Promise<Response> => {
  const siteUrl = getSiteUrl();
  const repository = buildSanityRepository();
  const slugs = [
    PAGES.LV.HOME,
    ...sections.flatMap((section) => section.pages.map((sectionPage) => sectionPage.slug)),
  ];

  const [pages, posts] = await Promise.all([
    repository.query(pagesLlmsTxtQuery, { slugs }),
    repository.query(blogPostsQuery, { limit: BLOG_POSTS_LIMIT }),
  ]);

  const pagesBySlug = new Map(pages.map((sanityPage) => [sanityPage.slug, sanityPage]));

  const lines: string[] = [`# ${SITE_NAME}`, '', `> ${SITE_SUMMARY}`];

  const sectionLines = (section: Section): string[] => {
    const items = section.pages.flatMap((sectionPage) => {
      const sanityPage = pagesBySlug.get(sectionPage.slug);
      const title = sanityPage?.title ?? sectionPage.fallback?.title;

      if (!title) {
        return [];
      }

      const description = sanityPage?.description ?? sectionPage.fallback?.description;

      return [toListItem(title, `${siteUrl}${sectionPage.path}`, description)];
    });

    if (items.length === 0) {
      return [];
    }

    return ['', `## ${section.heading}`, '', ...items];
  };

  const postItems = posts.flatMap((post) => {
    if (!post.slug?.current || !post.title) {
      return [];
    }

    return [
      toListItem(post.title, `${siteUrl}/${PAGES.LV.BLOGS}/${post.slug.current}`, post.excerpt),
    ];
  });

  const [guides, productsSection, aboutSection] = sections;

  lines.push(...sectionLines(guides));
  if (postItems.length > 0) {
    lines.push('', '## Blogi', '', ...postItems);
  }
  lines.push(...sectionLines(productsSection), ...sectionLines(aboutSection));

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};

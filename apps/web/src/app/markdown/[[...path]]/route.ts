import { PAGES } from '@packages/sanity/constants/pages-slugs';
import { blogPostsBySlugQuery } from '@packages/sanity/queries/blog-posts-by-slug-query';
import { blogPostsQuery } from '@packages/sanity/queries/blog-posts-query';
import { pagesBySlugQuery } from '@packages/sanity/queries/pages-by-slug-query';
import type { SanityTable } from 'structured-table';

import { buildSanityRepository } from '@/features/sanity/utils/build-sanity-repository';
import { buildSiteOverviewMarkdown } from '@/features/sanity/utils/build-site-overview-markdown';
import {
  type CustomTypeSerializers,
  portableTextToMarkdown,
} from '@/features/sanity/utils/portable-text-to-markdown';
import { sanityTableToMarkdown } from '@/features/sanity/utils/sanity-table-to-markdown';
import { urlForImage } from '@/features/sanity/utils/url-for-image';
import { products } from '@/shared/components/products-page/index.data';
import { getSiteUrl } from '@/shared/utils/get-site-url';

export const revalidate = 3600;

const BLOG_POSTS_LIMIT = 20;

const PAGE_SLUGS = new Set<string>([
  PAGES.LV.INFO_WHAT_TO_DO,
  PAGES.LV.INFO_WHERE_TO_STAY,
  PAGES.LV.INFO_DAILY_BUDGET,
  PAGES.LV.INFO_BEST_TIME_TO_TRAVEL,
  PAGES.LV.INFO_HOW_LONG_TO_GO,
  PAGES.LV.INFO_VISA,
  PAGES.LV.INFO_TRANSPORT,
  PAGES.LV.FLIGHT_TICKETS,
  PAGES.LV.ABOUT_ME,
  PAGES.LV.PRODUCTS,
]);

type ImageBlockValue = {
  asset?: unknown;
  alt?: string;
  caption?: string;
};

type ImageGalleryValue = {
  images?: ImageBlockValue[];
};

type StlTableBlockValue = {
  stlParsed?: string;
  caption?: string;
};

type YouTubeBlockValue = {
  url?: string;
  caption?: string;
};

const imageMarkdown = (image: ImageBlockValue): string | null => {
  if (!image.asset) {
    return null;
  }

  const url = urlForImage(image).width(1200).auto('format').quality(80).url();
  const lines = [`![${image.alt ?? ''}](${url})`];

  if (image.caption) {
    lines.push('', `*${image.caption}*`);
  }

  return lines.join('\n');
};

const customTypes: CustomTypeSerializers = {
  image: (value) => imageMarkdown(value as ImageBlockValue),
  imageGallery: (value) => {
    const images = (value as ImageGalleryValue).images ?? [];
    const rendered = images.map(imageMarkdown).filter((line): line is string => line !== null);

    return rendered.length > 0 ? rendered.join('\n\n') : null;
  },
  stlTableBlock: (value) => {
    const { stlParsed, caption } = value as StlTableBlockValue;

    if (!stlParsed) {
      return null;
    }

    const table = JSON.parse(stlParsed) as SanityTable;
    const markdown = sanityTableToMarkdown({ ...table, caption: table.caption ?? caption });

    return markdown || null;
  },
  youTube: (value) => {
    const { url, caption } = value as YouTubeBlockValue;

    return url ? `[${caption ?? 'YouTube'}](${url})` : null;
  },
};

const toMarkdownResponse = (markdown: string, status = 200): Response =>
  new Response(markdown, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      'x-markdown-tokens': `${Math.ceil(markdown.length / 4)}`,
    },
  });

const buildDocument = (parts: (string | null | undefined)[]): string =>
  `${parts.filter(Boolean).join('\n\n').trim()}\n`;

const buildPageMarkdown = async (slug: string): Promise<string | null> => {
  const repository = buildSanityRepository();
  const sanityPage = await repository.query(pagesBySlugQuery, { slug });
  const product = products.find((entry) => entry.slug === slug);
  const title = sanityPage?.title ?? product?.title;

  if (!title) {
    return null;
  }

  const description = sanityPage?.seo?.metaDescription ?? product?.description;
  const body = portableTextToMarkdown(sanityPage?.body, customTypes);
  const productList =
    slug === PAGES.LV.PRODUCTS
      ? products
          .map((entry) => `- [${entry.title}](${getSiteUrl()}${entry.href}): ${entry.description}`)
          .join('\n')
      : null;
  const canonicalUrl = `${getSiteUrl()}${product?.href ?? `/${slug}`}`;

  return buildDocument([
    `# ${title}`,
    description ? `> ${description}` : null,
    body || null,
    productList,
    `[${canonicalUrl}](${canonicalUrl})`,
  ]);
};

const buildBlogListMarkdown = async (): Promise<string> => {
  const repository = buildSanityRepository();
  const posts = await repository.query(blogPostsQuery, { limit: BLOG_POSTS_LIMIT });
  const siteUrl = getSiteUrl();

  const items = posts.flatMap((post) => {
    if (!post.slug?.current || !post.title) {
      return [];
    }

    const url = `${siteUrl}/${PAGES.LV.BLOGS}/${post.slug.current}`;

    return [
      post.excerpt ? `- [${post.title}](${url}): ${post.excerpt}` : `- [${post.title}](${url})`,
    ];
  });

  return buildDocument(['# Blogi', items.join('\n')]);
};

const buildBlogPostMarkdown = async (slug: string): Promise<string | null> => {
  const repository = buildSanityRepository();
  const post = await repository.query(blogPostsBySlugQuery, { slug });

  if (!post?.title) {
    return null;
  }

  const body = portableTextToMarkdown(post.body, customTypes);
  const faqs = (post.faqs ?? []).flatMap((faq) => {
    if (!faq.question || !faq.answer) {
      return [];
    }

    const answer = portableTextToMarkdown(faq.answer, customTypes).trim();

    return answer ? [`### ${faq.question}\n\n${answer}`] : [];
  });
  const canonicalUrl = `${getSiteUrl()}/${PAGES.LV.BLOGS}/${slug}`;

  return buildDocument([
    `# ${post.title}`,
    post.excerpt ? `> ${post.excerpt}` : null,
    body || null,
    faqs.length > 0 ? `## Bieži uzdotie jautājumi\n\n${faqs.join('\n\n')}` : null,
    `[${canonicalUrl}](${canonicalUrl})`,
  ]);
};

type MarkdownRouteContext = {
  params: Promise<{ path?: string[] }>;
};

export const GET = async (_request: Request, context: MarkdownRouteContext): Promise<Response> => {
  const { path } = await context.params;
  const segments = path ?? [];
  const joined = segments.join('/');

  if (joined === '' || joined === PAGES.LV.HOME) {
    return toMarkdownResponse(await buildSiteOverviewMarkdown());
  }

  if (joined === PAGES.LV.BLOGS) {
    return toMarkdownResponse(await buildBlogListMarkdown());
  }

  if (segments.length === 2 && segments[0] === PAGES.LV.BLOGS) {
    const markdown = await buildBlogPostMarkdown(segments[1]);

    if (markdown) {
      return toMarkdownResponse(markdown);
    }
  }

  if (segments.length === 2 && segments[0] === PAGES.LV.PRODUCTS) {
    const markdown = await buildPageMarkdown(segments[1]);

    if (markdown) {
      return toMarkdownResponse(markdown);
    }
  }

  if (segments.length === 1 && PAGE_SLUGS.has(joined)) {
    const markdown = await buildPageMarkdown(joined);

    if (markdown) {
      return toMarkdownResponse(markdown);
    }
  }

  return toMarkdownResponse('# Not found\n', 404);
};

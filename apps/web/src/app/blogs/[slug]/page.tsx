import { blogPostsBySlugQuery } from '@packages/sanity/queries/blog-posts-by-slug-query';
import { blogPostsQuery } from '@packages/sanity/queries/blog-posts-query';
import type { Metadata } from 'next';

import { buildSanityRepository } from '@/features/sanity/utils/build-sanity-repository';
import { urlForImage } from '@/features/sanity/utils/url-for-image';
import { BlogPageLayout } from '@/shared/components/blog-page-layout';

export const revalidate = 3600; // 1 hour

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const repository = buildSanityRepository();
  const posts = await repository.query(blogPostsQuery, { limit: 6 });

  const slugs = posts
    .filter(({ slug }) => slug?.current)
    .map(({ slug }) => ({
      slug: slug?.current,
    }));

  return slugs;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const repository = buildSanityRepository();
  const post = await repository.query(blogPostsBySlugQuery, { slug });

  const ogTitle = post?.openGraph?.openGraphTitle ?? post?.title ?? undefined;
  const ogDescription = post?.openGraph?.openGraphDescription ?? post?.excerpt ?? undefined;
  const ogImage = post?.openGraph?.openGraphImage;

  return {
    title: post?.seo?.metaTitle,
    description: post?.seo?.metaDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      ...(ogImage
        ? {
            images: [
              {
                url: urlForImage(ogImage)
                  .width(1200)
                  .height(630)
                  // biome-ignore lint/suspicious/noFocusedTests: This isn't a test - it's the Sanity image URL.
                  .fit('crop')
                  .auto('format')
                  .quality(85)
                  .url(),
                width: 1200,
                height: 630,
                alt: ogImage.alt ?? '',
              },
            ],
          }
        : {}),
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  return <BlogPageLayout slug={slug} />;
}

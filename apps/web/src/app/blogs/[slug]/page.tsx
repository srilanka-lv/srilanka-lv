import { blogPostBySlugQuery } from '@packages/sanity/queries/blog-post-by-slug-query';
import type { Metadata } from 'next';

import { DefaultSanityProvider } from '@/features/sanity/providers/default-sanity-provider';
import { DefaultSanityRepository } from '@/features/sanity/repositories/default-sanity-repository';
import { urlForImage } from '@/features/sanity/utils/url-for-image';
import { BlogPageLayout } from '@/shared/components/blog-page-layout';

const sanityProvider = new DefaultSanityProvider();
const sanityRepository = new DefaultSanityRepository(sanityProvider);

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityRepository.query(blogPostBySlugQuery, { slug });

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
                url: urlForImage(ogImage).width(1200).height(630).fit('crop').auto('format').url(),
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

import { blogPostBySlugQuery } from '@packages/sanity/queries/blog-post-by-slug-query';
import type { Metadata } from 'next';

import { DefaultSanityProvider } from '@/features/sanity/providers/default-sanity-provider';
import { DefaultSanityRepository } from '@/features/sanity/repositories/default-sanity-repository';
import { BlogPageLayout } from '@/shared/components/blog-page-layout';

const sanityProvider = new DefaultSanityProvider();
const sanityRepository = new DefaultSanityRepository(sanityProvider);

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityRepository.query(blogPostBySlugQuery, { slug });

  return {
    title: post?.seo?.metaTitle,
    description: post?.seo?.metaDescription,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  return <BlogPageLayout slug={slug} />;
}

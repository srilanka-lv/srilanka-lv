import { blogPostBySlugQuery } from '@packages/sanity/queries/blog-post-by-slug-query';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PortableText } from '@/features/sanity/components/portable-text';
import { DefaultSanityProvider } from '@/features/sanity/providers/default-sanity-provider';
import { DefaultSanityRepository } from '@/features/sanity/repositories/default-sanity-repository';
import { urlForImage } from '@/features/sanity/utils/url-for-image';
import { BlogCoverImage } from '@/shared/components/blog-cover-image';
import { BlogHero } from '@/shared/components/blog-hero';
import { BlogText } from '@/shared/components/blog-text';
import { BlogHeroTitle } from '@/shared/components/blog-title';
import { FaqList } from '@/shared/components/faq-list';

const sanityProvider = new DefaultSanityProvider();
const sanityRepository = new DefaultSanityRepository(sanityProvider);

type BlogPostPageProps = {
  params: Promise<{ blogSlug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { blogSlug } = await params;
  const post = await sanityRepository.query(blogPostBySlugQuery, { blogSlug });

  return {
    title: post?.seo?.metaTitle,
    description: post?.seo?.metaDescription,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { blogSlug } = await params;
  const post = await sanityRepository.query(blogPostBySlugQuery, { blogSlug });

  if (!post) {
    notFound();
  }

  const blogCoverImageUrl = post.coverImage
    ? // biome-ignore lint/suspicious/noFocusedTests: This isn't a test - it's the Sanity image URL.
      urlForImage(post.coverImage).width(2400).quality(100).fit('max').auto('format').url()
    : null;

  return (
    <>
      {blogCoverImageUrl && (
        <BlogCoverImage src={blogCoverImageUrl} alt={post.coverImage?.alt ?? ''} />
      )}

      <article>
        <BlogHero>
          <BlogHeroTitle>{post.title}</BlogHeroTitle>
        </BlogHero>

        {post.tags && post.tags.length > 0 && (
          <ul>
            {post.tags.map((tag) => (
              <li key={tag._id}>{tag.title}</li>
            ))}
          </ul>
        )}

        {post.body && <BlogText body={post.body} />}

        {post.faqs && post.faqs.length > 0 && (
          <FaqList
            items={post.faqs.map((faq) => ({
              id: faq._id,
              question: faq.question ?? '',
              answer: faq.answer ? <PortableText value={faq.answer} /> : null,
            }))}
          />
        )}
      </article>
    </>
  );
}

import { blogPostBySlugQuery } from '@packages/sanity/queries/blog-post-by-slug-query';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PortableText } from '@/features/sanity/components/portable-text';
import { DefaultSanityProvider } from '@/features/sanity/providers/default-sanity-provider';
import { DefaultSanityRepository } from '@/features/sanity/repositories/default-sanity-repository';
import { urlForImage } from '@/features/sanity/utils/url-for-image';
import { CoverImage } from '@/shared/components/cover-image';
import { FaqList } from '@/shared/components/faq-list';
import { Heading } from '@/shared/components/heading';
import { Text } from '@/shared/components/text';

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

  const coverImageUrl = post.coverImage
    ? urlForImage(post.coverImage).width(2400).quality(90).fit('max').auto('format').url()
    : null;

  return (
    <>
      {coverImageUrl && <CoverImage src={coverImageUrl} alt={post.coverImage?.alt ?? ''} />}

      <article>
        <Heading as="h1" variant="h1">
          {post.title}
        </Heading>

        {post.excerpt && <Text>{post.excerpt}</Text>}

        {post.tags && post.tags.length > 0 && (
          <ul>
            {post.tags.map((tag) => (
              <li key={tag._id}>{tag.title}</li>
            ))}
          </ul>
        )}

        {post.body && <PortableText value={post.body} />}

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

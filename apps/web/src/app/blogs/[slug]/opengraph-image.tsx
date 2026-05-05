import { blogPostBySlugQuery } from '@packages/sanity/queries/blog-post-by-slug-query';
import { ImageResponse } from 'next/og';

import { DefaultSanityProvider } from '@/features/sanity/providers/default-sanity-provider';
import { DefaultSanityRepository } from '@/features/sanity/repositories/default-sanity-repository';
import { urlForImage } from '@/features/sanity/utils/url-for-image';
import { BlogOgImageTemplate } from '@/shared/components/blog-og-image-template';
import { BlogOgImageTemplateFallback } from '@/shared/components/blog-og-image-template-fallback';

export const alt = 'Šrilanka.lv blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const sanityProvider = new DefaultSanityProvider();
const sanityRepository = new DefaultSanityRepository(sanityProvider);

type RouteProps = {
  params: Promise<{ slug: string }>;
};

const renderFallback = () => new ImageResponse(<BlogOgImageTemplateFallback />, size);

export default async function OpengraphImage({ params }: RouteProps) {
  const { slug } = await params;

  try {
    const post = await sanityRepository.query(blogPostBySlugQuery, { slug });

    if (!post?.coverImage) {
      return renderFallback();
    }

    const coverImageUrl = urlForImage(post.coverImage)
      .width(1200)
      .height(630)
      // biome-ignore lint/suspicious/noFocusedTests: This isn't a test - it's the Sanity image URL.
      .fit('crop')
      .auto('format')
      .quality(100)
      .url();

    return new ImageResponse(
      <BlogOgImageTemplate
        title={post.title ?? ''}
        coverImageUrl={coverImageUrl}
        coverImageAlt={post.coverImage.alt ?? ''}
      />,
      size,
    );
  } catch {
    return renderFallback();
  }
}

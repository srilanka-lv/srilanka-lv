import { blogPostsBySlugQuery } from '@packages/sanity/queries/blog-posts-by-slug-query';
import { ImageResponse } from 'next/og';

import { buildSanityRepository } from '@/features/sanity/utils/build-sanity-repository';
import { urlForImage } from '@/features/sanity/utils/url-for-image';
import { BlogOgImageTemplate } from '@/shared/components/blog-og-image-template';
import { BlogOgImageTemplateFallback } from '@/shared/components/blog-og-image-template-fallback';

export const alt = 'Šrilanka.lv blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

let commeDataPromise: Promise<ArrayBuffer> | null = null;

function getCommeData(): Promise<ArrayBuffer> {
  if (!commeDataPromise) {
    const port = process.env.PORT ?? '3000';
    commeDataPromise = fetch(`http://localhost:${port}/fonts/Comme-SemiBold.ttf`).then((response) =>
      response.arrayBuffer(),
    );
  }

  return commeDataPromise;
}

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export default async function OpengraphImage({ params }: RouteProps) {
  const { slug } = await params;

  const fonts = [
    {
      name: 'Comme',
      data: await getCommeData(),
      weight: 600 as const,
      style: 'normal' as const,
    },
  ];
  const renderFallback = () =>
    new ImageResponse(<BlogOgImageTemplateFallback />, { ...size, fonts });

  try {
    const repository = buildSanityRepository();
    const post = await repository.query(blogPostsBySlugQuery, { slug });

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
      { ...size, fonts },
    );
  } catch {
    return renderFallback();
  }
}

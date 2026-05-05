import { blogPostBySlugQuery } from '@packages/sanity/queries/blog-post-by-slug-query';
import { ImageResponse } from 'next/og';

import { DefaultSanityProvider } from '@/features/sanity/providers/default-sanity-provider';
import { DefaultSanityRepository } from '@/features/sanity/repositories/default-sanity-repository';
import { urlForImage } from '@/features/sanity/utils/url-for-image';
import { BlogOgImageTemplate } from '@/shared/components/blog-og-image-template';
import { BrandedFallback } from '@/shared/components/blog-og-image-template/branded-fallback';
import { commeBoldData } from '@/shared/fonts/comme/comme-bold-data';

export const alt = 'Šrilanka.lv blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const sanityProvider = new DefaultSanityProvider();
const sanityRepository = new DefaultSanityRepository(sanityProvider);

const fonts = [
  {
    name: 'Comme',
    data: commeBoldData,
    weight: 700 as const,
    style: 'normal' as const,
  },
];

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export default async function OpengraphImage({ params }: RouteProps) {
  const { slug } = await params;

  try {
    const post = await sanityRepository.query(blogPostBySlugQuery, { slug });

    if (!post || !post.coverImage) {
      return new ImageResponse(<BrandedFallback />, { ...size, fonts });
    }

    const coverImageUrl = urlForImage(post.coverImage)
      .width(1200)
      .height(630)
      .fit('crop')
      .auto('format')
      .quality(85)
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
    return new ImageResponse(<BrandedFallback />, { ...size, fonts });
  }
}

import type { FunctionComponent } from 'react';

import { BlogOgImageTemplateLogo } from '../blog-og-image-template-logo';

type BlogOgImageTemplateProps = {
  title: string;
  coverImageUrl: string;
  coverImageAlt: string;
};

export const BlogOgImageTemplate: FunctionComponent<BlogOgImageTemplateProps> = ({
  title,
  coverImageUrl,
  coverImageAlt,
}) => (
  <div
    style={{
      position: 'relative',
      width: 1200,
      height: 630,
      display: 'flex',
      backgroundColor: '#fff',
    }}
  >
    {/* Layer 1: cover image */}
    {/* biome-ignore lint/performance/noImgElement: img is what we want fr the blog og image template */}
    <img
      src={coverImageUrl}
      alt={coverImageAlt}
      width={1200}
      height={630}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />

    {/* Layer 2: dark gradient overlay for legibility.
        Satori collapses empty positioned divs without explicit dimensions, so width/height are required. */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1200,
        height: 630,
        backgroundImage:
          'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.125) 25%, rgba(0,0,0,0.125) 0%, rgba(0,0,0,0.50) 100%)',
      }}
    />

    {/* Layer 5: logo, top-left */}
    <div
      style={{
        position: 'absolute',
        top: 80,
        left: 68,
        display: 'flex',
      }}
    >
      <BlogOgImageTemplateLogo width={400} />
    </div>

    {/* Layer 6: title, bottom-left. display must be '-webkit-box' for Satori's line-clamp support. */}
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        left: 56,
        right: 56,
        color: 'whitesmoke',
        fontFamily: 'Comme',
        fontWeight: 900,
        fontSize: 100,
        lineHeight: 1.25,
        letterSpacing: '-0.02em',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}
    >
      {title}
    </div>
  </div>
);

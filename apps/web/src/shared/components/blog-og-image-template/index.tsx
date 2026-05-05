import { CoverImageEffect } from './cover-image-effect';
import { Logo } from './logo';

type BlogOgImageTemplateProps = {
  title: string;
  coverImageUrl: string;
  coverImageAlt: string;
};

export function BlogOgImageTemplate({
  title,
  coverImageUrl,
  coverImageAlt,
}: BlogOgImageTemplateProps) {
  return (
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

      {/* Layer 2: dark gradient overlay for legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 25%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* Layer 3 + 4: white rip strips */}
      <CoverImageEffect variant="top" />
      <CoverImageEffect variant="bottom" />

      {/* Layer 5: logo, top-left */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 48,
          display: 'flex',
        }}
      >
        <Logo width={200} />
      </div>

      {/* Layer 6: title, bottom-left.
          display must be '-webkit-box' for Satori's line-clamp support. */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          left: 48,
          right: 48,
          color: 'whitesmoke',
          fontFamily: 'Comme',
          fontWeight: 700,
          fontSize: 68,
          lineHeight: 1.1,
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
}

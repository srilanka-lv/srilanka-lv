import Image from 'next/image';
import type { FunctionComponent } from 'react';

import { captionStyle, figureStyle, imageStyle } from './styles.css';

type GuideFigureProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /**
   * Only for the one image above the fold: it becomes the LCP element.
   *
   * Next 16 treats `preload` and `loading`/`fetchPriority` as mutually
   * exclusive: `preload` only inserts a `<link rel="preload">` and then drops
   * the element attributes. Lighthouse's LCP discovery check wants
   * `fetchpriority=high` on the request itself, so this sets
   * `fetchPriority="high"` and `loading="eager"` and leaves `preload` off.
   */
  preload?: boolean;
  sizes?: string;
};

/**
 * A photo inside the guide: next/image with explicit dimensions so the layout
 * never shifts, lazy unless it is the hero, and an optional caption.
 */
export const GuideFigure: FunctionComponent<GuideFigureProps> = ({
  src,
  alt,
  width,
  height,
  caption,
  preload = false,
  sizes = '(min-width: 1024px) 768px, 100vw',
}) => (
  <figure className={figureStyle}>
    <Image
      className={imageStyle}
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={preload ? 'eager' : 'lazy'}
      fetchPriority={preload ? 'high' : 'auto'}
    />
    {caption ? <figcaption className={captionStyle}>{caption}</figcaption> : null}
  </figure>
);

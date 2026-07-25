import type { BlogPostsBySlugQueryResult } from '@packages/sanity/sanity.types';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { getImageProps } from 'next/image';
import type { FunctionComponent } from 'react';
import { preload } from 'react-dom';

import { urlForImage } from '@/features/sanity/utils/url-for-image';

import {
  coverImageBackgroundOverflowStyle,
  coverImageBackgroundStyle,
  coverImageBackgroundVar,
  coverImageBackgroundWrapperStyle,
  coverImageSpacerStyle,
  coverImageStyle,
} from './styles.css';

type BlogCoverImageProps = {
  image: NonNullable<BlogPostsBySlugQueryResult>['coverImage'];
};

const getBackgroundImage = (srcSet = '') => {
  const imageSet = srcSet
    .split(', ')
    .map((str) => {
      const [url, dpi] = str.split(' ');
      return `url("${url}") ${dpi}`;
    })
    .join(', ');
  return `image-set(${imageSet})`;
};

export const BlogCoverImage: FunctionComponent<BlogCoverImageProps> = ({ image }) => {
  if (!image) {
    return null;
  }

  const src = image
    ? // biome-ignore lint/suspicious/noFocusedTests: This isn't a test - it's the Sanity image URL.
      urlForImage(image).width(2400).quality(80).fit('max').auto('format').url()
    : null;

  const alt = image?.alt ?? '';

  if (!src) {
    return null;
  }

  const {
    props: { srcSet, src: optimizedSrc },
  } = getImageProps({
    src,
    alt,
    width: 2400,
    height: 1551,
  });

  preload(optimizedSrc, {
    as: 'image',
    imageSrcSet: srcSet,
    fetchPriority: 'high',
  });

  return (
    <span className={coverImageStyle}>
      <span className={coverImageBackgroundOverflowStyle}>
        <span className={coverImageBackgroundWrapperStyle}>
          <span
            className={coverImageBackgroundStyle}
            role="img"
            aria-label={alt}
            style={{
              ...assignInlineVars({
                [coverImageBackgroundVar]: getBackgroundImage(srcSet),
              }),
            }}
          />
        </span>
      </span>
      <span className={coverImageSpacerStyle} />
    </span>
  );
};

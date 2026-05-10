import type { BlogPostBySlugQueryResult } from '@packages/sanity/sanity.types';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { getImageProps } from 'next/image';
import type { FunctionComponent } from 'react';
import { preload } from 'react-dom';

import { urlForImage } from '@/features/sanity/utils/url-for-image';

import { CoverImageEffect } from '../cover-image-effect';
import {
  coverImageBackgroundOverflowStyle,
  coverImageBackgroundStyle,
  coverImageBackgroundVar,
  coverImageBackgroundWrapperStyle,
  coverImageEffectStyle,
  coverImageSpacerStyle,
  coverImageStyle,
} from './styles.css';

type BlogCoverImageProps = {
  image: NonNullable<BlogPostBySlugQueryResult>['coverImage'];
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
      urlForImage(image).width(2400).quality(100).fit('max').auto('format').url()
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
    quality: 100,
  });

  preload(optimizedSrc, {
    as: 'image',
    imageSrcSet: srcSet,
    fetchPriority: 'high',
  });

  return (
    <span className={coverImageStyle}>
      <CoverImageEffect className={coverImageEffectStyle} variant="top" />
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
      <CoverImageEffect className={coverImageEffectStyle} variant="bottom" />
    </span>
  );
};

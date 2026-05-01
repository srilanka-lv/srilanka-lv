import { assignInlineVars } from '@vanilla-extract/dynamic';
import { getImageProps } from 'next/image';
import type { FunctionComponent } from 'react';
import { preload } from 'react-dom';

import { CoverImageEffect } from '../cover-image-effect';
import {
  coverImageBackgroundOverflowStyle,
  coverImageBackgroundStyle,
  coverImageBackgroundVar,
  coverImageBackgroundWrapperStyle,
  coverImageEffectStyle,
  coverImageSpacerStyle,
} from './styles.css';

type BlogCoverImageProps = {
  src: string;
  alt: string;
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

export const BlogCoverImage: FunctionComponent<BlogCoverImageProps> = ({ src, alt }) => {
  const {
    props: { srcSet, src: optimizedSrc },
  } = getImageProps({
    src,
    alt,
    width: 2400,
    height: 1600,
    quality: 100,
  });

  preload(optimizedSrc, {
    as: 'image',
    imageSrcSet: srcSet,
    fetchPriority: 'high',
  });

  return (
    <>
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
    </>
  );
};

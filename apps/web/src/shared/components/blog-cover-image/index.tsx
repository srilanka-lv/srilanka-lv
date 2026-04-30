import clsx from 'clsx';
import Image, { type ImageProps } from 'next/image';
import type { FunctionComponent } from 'react';

import { CoverImageEffect } from '../cover-image-effect';
import { coverImageSpacerStyle, coverImageStyle, coverImageWrapperStyle } from './styles.css';

type BlogCoverImageProps = Omit<ImageProps, 'fill' | 'width' | 'height'>;

export const BlogCoverImage: FunctionComponent<BlogCoverImageProps> = ({
  className,
  sizes = '100vw',
  ...rest
}) => (
  <>
    <CoverImageEffect variant="top" />
    <div className={clsx(coverImageWrapperStyle, className)}>
      <Image className={coverImageStyle} fill sizes={sizes} preload {...rest} />
    </div>
    <span className={coverImageSpacerStyle} />
    <CoverImageEffect variant="bottom" />
  </>
);

import clsx from 'clsx';
import Image, { type ImageProps } from 'next/image';
import type { FunctionComponent } from 'react';

import { CoverImageEffect } from '../cover-image-effect';
import { coverImageSpacerStyle, coverImageStyle, coverImageWrapperStyle } from './styles.css';

type CoverImageProps = Omit<ImageProps, 'fill' | 'width' | 'height'>;

export const CoverImage: FunctionComponent<CoverImageProps> = ({
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

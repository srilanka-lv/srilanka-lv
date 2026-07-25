import type { ImageGallery as ImageGalleryValue } from '@srilanka/sanity/types';
import Image from 'next/image';

import { urlForImage } from '../../utils/url-for-image';
import {
  imageGalleryCaptionStyle,
  imageGalleryFigureStyle,
  imageGalleryGridStyle,
  imageGalleryImageWrapperStyle,
  imageGalleryItemStyle,
} from './styles.css';

type ImageGalleryProps = {
  value: ImageGalleryValue;
};

export function ImageGallery({ value }: ImageGalleryProps) {
  const images = value.images;

  if (!images?.length) {
    return null;
  }

  return (
    <ul className={imageGalleryGridStyle}>
      {images.map((image) => {
        if (!image.asset) {
          return null;
        }

        // biome-ignore lint/suspicious/noFocusedTests: This isn't a test - it's the Sanity image URL.
        const url = urlForImage(image).width(800).quality(80).fit('max').auto('format').url();

        return (
          <li key={image._key} className={imageGalleryItemStyle}>
            <figure className={imageGalleryFigureStyle}>
              <div className={imageGalleryImageWrapperStyle}>
                <Image
                  src={url}
                  alt={image.alt ?? ''}
                  fill
                  sizes="(min-width: 1024px) 200px, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              {image.caption ? (
                <figcaption className={imageGalleryCaptionStyle}>{image.caption}</figcaption>
              ) : null}
            </figure>
          </li>
        );
      })}
    </ul>
  );
}

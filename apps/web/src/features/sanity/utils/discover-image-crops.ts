import type { SanityImageSource } from '@sanity/image-url';

import { urlForImage } from './url-for-image';

const CROPS: [number, number][] = [
  [1200, 675], // 16:9
  [1200, 900], // 4:3
  [1200, 1200], // 1:1
];

/**
 * Google Discover prefers Article images >= 1200px wide in 16:9, 4:3 and 1:1.
 * Returns direct cdn.sanity.io URLs cropped to those ratios.
 */
export function discoverImageCrops(image: { asset?: unknown } | null | undefined): string[] {
  if (!image?.asset) {
    return [];
  }

  return CROPS.map(([width, height]) =>
    urlForImage(image as SanityImageSource)
      .width(width)
      .height(height)
      // biome-ignore lint/suspicious/noFocusedTests: This isn't a test - it's the Sanity image URL.
      .fit('crop')
      .auto('format')
      .url(),
  );
}

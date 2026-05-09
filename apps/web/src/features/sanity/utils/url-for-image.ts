import { type SanityImageSource, createImageUrlBuilder } from '@sanity/image-url';

const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET as string,
});

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

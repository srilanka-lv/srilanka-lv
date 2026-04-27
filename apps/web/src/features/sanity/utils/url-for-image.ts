import { type SanityImageSource, createImageUrlBuilder } from '@sanity/image-url';
import { env } from 'next-runtime-env';

const builder = createImageUrlBuilder({
  projectId: env('NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID') as string,
  dataset: env('NEXT_PUBLIC_SANITY_STUDIO_DATASET') as string,
});

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

import type { BlockContent, ImageGallery } from '@packages/sanity/sanity.types';

type BlockContentImage =
  | Extract<BlockContent[number], { _type: 'image' }>
  | NonNullable<ImageGallery['images']>[number];

export function collectBlockContentImages(
  blockContent: BlockContent | null | undefined,
): BlockContentImage[] {
  if (!blockContent) {
    return [];
  }

  const images: BlockContentImage[] = [];

  for (const block of blockContent) {
    if (block._type === 'image') {
      images.push(block);
    } else if (block._type === 'imageGallery' && block.images) {
      images.push(...block.images);
    }
  }

  return images;
}

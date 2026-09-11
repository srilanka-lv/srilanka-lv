import { getYouTubeVideoId } from '@packages/sanity/schemas/utils/youtube-video-id';

export type VideoObjectInput = {
  url: string;
  name: string;
  description: string;
  /** ISO date. Google requires it for VideoObject, so the node is omitted without one. */
  uploadDate?: string;
};

export type VideoObjectNode = {
  '@type': 'VideoObject';
  name: string;
  description: string;
  uploadDate: string;
  thumbnailUrl: string;
  contentUrl: string;
  embedUrl: string;
};

export function buildVideoObject(input: VideoObjectInput): VideoObjectNode | null {
  const id = getYouTubeVideoId(input.url);

  if (!id || !input.uploadDate) {
    return null;
  }

  return {
    '@type': 'VideoObject',
    name: input.name,
    description: input.description,
    uploadDate: input.uploadDate,
    thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    contentUrl: input.url,
    embedUrl: `https://www.youtube.com/embed/${id}`,
  };
}

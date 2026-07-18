import { PlayIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { getYouTubeVideoId } from '../utils/youtube-video-id';

export const youTube = defineType({
  name: 'youTube',
  type: 'object',
  title: 'YouTube Embed',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ['http', 'https'] })
          .custom((value) => {
            if (!value) {
              return true;
            }
            return getYouTubeVideoId(value) ? true : 'Enter a valid YouTube video URL';
          }),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
  ],
  preview: {
    select: { url: 'url', caption: 'caption' },
    prepare({ url, caption }) {
      const id = typeof url === 'string' ? getYouTubeVideoId(url) : null;

      return {
        title: caption || 'YouTube video',
        subtitle: typeof url === 'string' ? url : 'No URL set',
        media: id ? (
          // biome-ignore lint/performance/noImgElement: Sanity Studio preview, not a Next.js page
          <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt="" />
        ) : (
          PlayIcon
        ),
      };
    },
  },
});

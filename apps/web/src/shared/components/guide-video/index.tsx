import { getYouTubeVideoId } from '@packages/sanity/schemas/utils/youtube-video-id';
import type { FunctionComponent } from 'react';

import { captionStyle, figureStyle } from '../guide-figure/styles.css';
import { YouTubeFacade } from '../youtube-facade';

export type GuideVideoData = {
  url: string;
  /** Shown to the reader under the player and used as the VideoObject name. */
  title: string;
  /** One or two sentences: the caption under the player and the VideoObject description. */
  description: string;
  /** ISO date the video was published on YouTube. Required for VideoObject schema. */
  uploadDate: string;
};

/**
 * A YouTube video inside the guide: server-rendered figure and caption around
 * the click-to-load facade. The same data feeds the page's VideoObject nodes.
 */
export const GuideVideo: FunctionComponent<GuideVideoData> = ({ url, title, description }) => {
  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return null;
  }

  return (
    <figure className={figureStyle}>
      <YouTubeFacade videoId={videoId} title={title} />
      <figcaption className={captionStyle}>
        <strong>{title}.</strong> {description}
      </figcaption>
    </figure>
  );
};

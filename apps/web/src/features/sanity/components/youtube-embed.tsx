'use client';

import dynamic from 'next/dynamic';

import {
  inlineImageCaptionStyle,
  youtubeFigureStyle,
  youtubeWrapperStyle,
} from './portable-text/styles.css';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

type YouTubeEmbedProps = {
  url?: string;
  caption?: string;
  /** Render the YouTube thumbnail with a play button; the iframe loads on first play. */
  light?: boolean;
  /** Fires once, when playback first starts. */
  onStart?: () => void;
};

export function YouTubeEmbed({ url, caption, light, onStart }: YouTubeEmbedProps) {
  if (!url) {
    return null;
  }

  return (
    <figure className={youtubeFigureStyle}>
      <div className={youtubeWrapperStyle}>
        <ReactPlayer
          src={url}
          controls
          width="100%"
          height="100%"
          light={light}
          onStart={onStart}
        />
      </div>
      {caption ? <figcaption className={inlineImageCaptionStyle}>{caption}</figcaption> : null}
    </figure>
  );
}

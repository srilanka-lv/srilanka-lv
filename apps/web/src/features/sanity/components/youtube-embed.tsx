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
};

export function YouTubeEmbed({ url, caption }: YouTubeEmbedProps) {
  if (!url) {
    return null;
  }

  return (
    <figure className={youtubeFigureStyle}>
      <div className={youtubeWrapperStyle}>
        <ReactPlayer src={url} controls width="100%" height="100%" />
      </div>
      {caption ? <figcaption className={inlineImageCaptionStyle}>{caption}</figcaption> : null}
    </figure>
  );
}

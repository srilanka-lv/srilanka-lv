'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import { type FunctionComponent, useState } from 'react';

import { buttonStyle, frameStyle, iframeStyle, playBadgeStyle, thumbnailStyle } from './styles.css';

type YouTubeFacadeProps = {
  videoId: string;
  title: string;
};

/**
 * Click-to-load YouTube player. Until the reader presses play, the page holds
 * only a poster frame served through next/image, so the ~500 KB YouTube
 * iframe never counts against LCP or INP. On play the iframe is inserted with
 * autoplay so one click still starts the video.
 */
export const YouTubeFacade: FunctionComponent<YouTubeFacadeProps> = ({ videoId, title }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={frameStyle}>
      {playing ? (
        <iframe
          className={iframeStyle}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={buttonStyle}
          onClick={() => setPlaying(true)}
          // The visible label is "Skatīties", so the accessible name has to
          // start with it: WCAG 2.5.3 and Lighthouse both check that.
          aria-label={`Skatīties video: ${title}`}
          data-umami-event="video-play"
          data-umami-event-video={videoId}
        >
          <Image
            className={thumbnailStyle}
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            width={480}
            height={360}
            sizes="(min-width: 1024px) 768px, 100vw"
          />
          <span className={playBadgeStyle} aria-hidden="true">
            <Play size={18} />
            Skatīties
          </span>
        </button>
      )}
    </div>
  );
};

'use client';

import { getYouTubeVideoId } from '@packages/sanity/schemas/utils/youtube-video-id';

import {
  GIRLS_TRIP_VIDEO_HEADING,
  GIRLS_TRIP_VIDEO_POSTER_HEIGHT,
  GIRLS_TRIP_VIDEO_POSTER_SRC,
  GIRLS_TRIP_VIDEO_POSTER_WIDTH,
  GIRLS_TRIP_VIDEO_SECTION_ID,
  GIRLS_TRIP_VIDEO_TITLE,
  GIRLS_TRIP_VIDEO_URL,
} from '@/shared/constants/girls-trip-video';
import { trackEvent } from '@/shared/utils/analytics';

import { TripPageSection } from '../trip-page-section';
import { YouTubeFacade } from '../youtube-facade';
import { tripPageVideoPlayerStyle } from './styles.css';

const videoId = getYouTubeVideoId(GIRLS_TRIP_VIDEO_URL);

export const TripPageVideoSection = () => (
  <TripPageSection
    id={GIRLS_TRIP_VIDEO_SECTION_ID}
    title={GIRLS_TRIP_VIDEO_HEADING}
    trackingId="video"
  >
    {videoId && (
      <div className={tripPageVideoPlayerStyle}>
        {/* Click-to-load: only the poster loads until the visitor presses play. */}
        <YouTubeFacade
          videoId={videoId}
          title={GIRLS_TRIP_VIDEO_TITLE}
          poster={{
            src: GIRLS_TRIP_VIDEO_POSTER_SRC,
            width: GIRLS_TRIP_VIDEO_POSTER_WIDTH,
            height: GIRLS_TRIP_VIDEO_POSTER_HEIGHT,
          }}
          // Two of three columns from lg (the container caps near 1024px).
          posterSizes="(min-width: 1024px) 700px, 100vw"
          onPlay={() => {
            void trackEvent('video-play', { video: 'girls-trip' });
          }}
        />
      </div>
    )}
  </TripPageSection>
);

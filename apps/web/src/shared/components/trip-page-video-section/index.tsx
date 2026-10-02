'use client';

import { YouTubeEmbed } from '@/features/sanity/components/youtube-embed';
import {
  GIRLS_TRIP_VIDEO_HEADING,
  GIRLS_TRIP_VIDEO_SECTION_ID,
  GIRLS_TRIP_VIDEO_URL,
} from '@/shared/constants/girls-trip-video';
import { trackEvent } from '@/shared/utils/analytics';

import { TripPageSection } from '../trip-page-section';
import { tripPageVideoPlayerStyle } from './styles.css';

export const TripPageVideoSection = () => (
  <TripPageSection
    id={GIRLS_TRIP_VIDEO_SECTION_ID}
    title={GIRLS_TRIP_VIDEO_HEADING}
    trackingId="video"
  >
    <div className={tripPageVideoPlayerStyle}>
      {/* Thumbnail mode: the YouTube iframe only loads once the viewer presses play. */}
      <YouTubeEmbed
        url={GIRLS_TRIP_VIDEO_URL}
        light
        onStart={() => {
          void trackEvent('video-play', { video: 'girls-trip' });
        }}
      />
    </div>
  </TripPageSection>
);

'use client';

import { YouTubeEmbed } from '@/features/sanity/components/youtube-embed';
import {
  GIRLS_TRIP_VIDEO_HEADING,
  GIRLS_TRIP_VIDEO_SECTION_ID,
  GIRLS_TRIP_VIDEO_URL,
} from '@/shared/constants/girls-trip-video';
import { trackEvent } from '@/shared/utils/analytics';

import { Heading } from '../heading';
import {
  tripPageVideoPlayerStyle,
  tripPageVideoSectionStyle,
  tripPageVideoTitleStyle,
} from './styles.css';

export const TripPageVideoSection = () => (
  <section id={GIRLS_TRIP_VIDEO_SECTION_ID} className={tripPageVideoSectionStyle}>
    <Heading as="h2" variant="h2" className={tripPageVideoTitleStyle}>
      {GIRLS_TRIP_VIDEO_HEADING}
    </Heading>
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
  </section>
);

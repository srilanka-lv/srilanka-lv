/** Laura's talk-to-camera video about the girls trip. */
export const GIRLS_TRIP_VIDEO_URL = 'https://youtu.be/A44GNYkbX5Y';

/**
 * Sharp 1280x720 poster for the click-to-load player: YouTube's maxresdefault
 * frame, self-hosted as WebP. Also the VideoObject thumbnailUrl.
 */
export const GIRLS_TRIP_VIDEO_POSTER_SRC = '/images/srilanka-lv_meitenu-celojums_video-poster.webp';
export const GIRLS_TRIP_VIDEO_POSTER_WIDTH = 1280;
export const GIRLS_TRIP_VIDEO_POSTER_HEIGHT = 720;

/** The video's title on YouTube; used as the VideoObject name so structured data matches the video. */
export const GIRLS_TRIP_VIDEO_TITLE = '10 dienu ceļojums Šrilankā tikai meitenēm (2027)';

/**
 * ISO upload date of the video, read from YouTube. Google requires it on
 * VideoObject, so the structured data omits the video while it is unset.
 */
export const GIRLS_TRIP_VIDEO_UPLOAD_DATE: string | undefined = '2026-09-11';

// PLACEHOLDER copy drafted by Claude at Dave's request; Latvian copy is Laura's
// to finalise before this ships.
export const GIRLS_TRIP_VIDEO_HEADING = 'Par šo ceļojumu';
export const GIRLS_TRIP_VIDEO_ANCHOR_LABEL = 'Noskaties video par ceļojumu';
export const GIRLS_TRIP_VIDEO_SECTION_ID = 'video';

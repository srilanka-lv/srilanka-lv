import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, color } = vars;

export const tripPagePlanItinerarySectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[8],
  marginTop: spacing[16],
  scrollMarginTop: spacing[4],
  backgroundColor: color.background,

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gridTemplateRows: 'repeat(1, min-content)',
      marginTop: spacing[24],
    },
  },
});

// Sticky only beside the itinerary on wide screens; on a phone a sticky
// heading would slide over the day list.
export const tripPagePlanItinerarySectionWrapperStyle = style({
  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      position: 'sticky',
      top: spacing[8],
    },
  },
});

// The shared title is sticky by itself; here the whole column (title plus
// buttons) is the sticky unit instead.
export const tripPagePlanItineraryTitleStyle = style({
  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      position: 'static',
    },
  },
});

// Phones and tablets get the sticky bar instead; from lg the bar is gone, so
// the buttons ride along beside the itinerary.
export const tripPagePlanItinerarySectionCtaStyle = style({
  display: 'none',

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      display: 'flex',
      marginTop: spacing[8],
      maxWidth: '20rem',
    },
  },
});

export const tripPagePlanItineraryStyle = style({
  gridColumn: 'span 2',
});

export const tripPagePlanItineraryItemSeparatorStyle = style({
  gridColumn: '1 / 3',
  height: '1px',
  backgroundColor: `color-mix(in oklch, ${color.foreground} 10%, transparent)`,
  margin: 0,
  padding: 0,
  width: '100%',
  border: 'none',

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      width: `calc(100% - 2 * ${spacing[4]})`,
      paddingLeft: spacing[4],
      paddingRight: spacing[4],
      marginTop: spacing[2],
      marginBottom: spacing[2],
    },
  },
});

import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, border, color } = vars;

export const tripPagePlanItinerarySectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[8],
  marginTop: spacing[8],
  marginBottom: spacing[16],
  backgroundColor: color.background,

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(1, min-content)',
    },
  },
});

export const tripPagePlanItinerarySectionMapStyle = style({
  display: 'none',

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      gridColumn: '1 / 2',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: `color-mix(in oklch, ${color.accent} 10%, transparent)`,
      alignSelf: 'flex-start',
      borderRadius: border.radius.large,
      overflow: 'hidden',
      aspectRatio: '1 / 1',
    },
  },
});

export const tripPagePlanItinerarySectionMapImageStyle = style({
  width: '100%',
  height: '100%',
  aspectRatio: '1 / 1',
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

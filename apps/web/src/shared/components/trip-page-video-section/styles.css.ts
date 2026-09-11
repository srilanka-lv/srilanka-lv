import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font } = vars;

export const tripPageVideoSectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[2],
  marginBottom: spacing[4],
  // Offset the anchor target so the sticky header does not cover the heading.
  scrollMarginTop: spacing[8],

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      // Matches the hero's bottom margin so the USP section keeps its rhythm.
      marginBottom: spacing[24],
    },
  },
});

export const tripPageVideoTitleStyle = style({
  fontSize: font.size['2xl'],
  fontWeight: font.weight.normal,
  lineHeight: font.lineHeight.tight,
  marginTop: spacing[12],
  marginBottom: spacing[6],

  '@media': {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      fontSize: font.size['4xl'],
    },
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size['5xl'],
      marginBottom: spacing[8],
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      // The hero's bottom margin already provides the gap at desktop.
      marginTop: 0,
    },
  },
});

export const tripPageVideoPlayerStyle = style({
  width: '100%',

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      maxWidth: '60rem',
    },
  },
});

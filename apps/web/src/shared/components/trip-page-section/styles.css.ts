import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font } = vars;

export const tripPageSectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: spacing[12],
  scrollMarginTop: spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: spacing[8],
      marginTop: spacing[16],
    },
  },
});

export const tripPageSectionTitleStyle = style({
  fontSize: font.size['2xl'],
  fontWeight: font.weight.normal,
  lineHeight: font.lineHeight.tight,
  marginTop: 0,
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
      marginBottom: 0,
    },
  },
});

export const tripPageSectionBodyStyle = style({
  minWidth: 0,
  fontSize: font.size.base,
  lineHeight: font.lineHeight.relaxed,

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      gridColumn: '2 / 4',
    },
  },
});

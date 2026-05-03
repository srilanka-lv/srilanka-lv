import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const blogParagraphStyle = style({
  marginBlock: vars.spacing[8],
  fontSize: vars.font.size.xl,
  lineHeight: vars.font.lineHeight.normal,

  selectors: {
    '&:first-of-type': {
      marginTop: 0,
    },
    '&:last-of-type': {
      marginBottom: 0,
    },
  },

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      fontSize: vars.font.size['2xl'],
    },
  },
});

export const blogHeadingStyle = style({
  marginBlock: vars.spacing[8],
  fontSize: vars.font.size['4xl'],
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      fontSize: vars.font.size['6xl'],
    },
  },
});

export const blogBlockquoteStyle = style({
  marginBlock: vars.spacing[8],
  paddingLeft: vars.spacing[4],
  borderLeft: `4px solid ${vars.color.primaryForeground}`,
  fontStyle: 'italic',
});

export const blogListStyle = style({
  marginBlock: vars.spacing[8],
  paddingLeft: vars.spacing[6],
  fontSize: vars.font.size.xl,
  lineHeight: vars.font.lineHeight.relaxed,

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      fontSize: vars.font.size['2xl'],
    },
  },
});

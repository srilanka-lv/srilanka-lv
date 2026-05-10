import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { font, spacing, color } = vars;

export const blogParagraphStyle = style({
  marginBlock: spacing[8],
  fontSize: font.size.xl,
  lineHeight: font.lineHeight.normal,

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
      fontSize: font.size.xl,
    },
  },
});

export const blogHeadingStyle = style({
  marginBlock: spacing[8],
  fontSize: font.size['4xl'],
  fontWeight: font.weight.semibold,
  lineHeight: font.lineHeight.tight,
});

export const blogBlockquoteStyle = style({
  marginBlock: spacing[8],
  paddingLeft: spacing[4],
  borderLeft: `4px solid ${color.primaryForeground}`,
  fontStyle: 'italic',
});

export const blogListStyle = style({
  marginBlock: spacing[8],
  paddingLeft: spacing[6],
  fontSize: font.size.xl,
  lineHeight: font.lineHeight.relaxed,

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      fontSize: font.size.xl,
    },
  },
});

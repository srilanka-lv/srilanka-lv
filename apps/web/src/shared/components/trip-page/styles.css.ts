import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font } = vars;

export const tripPageTitleStyle = style({
  fontSize: font.size['2xl'],
  fontWeight: font.weight.normal,
  lineHeight: font.lineHeight.tight,
  marginTop: 0,
  marginBottom: spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      fontSize: font.size['4xl'],
      marginTop: spacing[6],
      marginBottom: spacing[6],
    },
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size['5xl'],
      marginTop: spacing[8],
      marginBottom: spacing[8],
    },
  },
});

import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font } = vars;

export const tripPageUspItemListStyle = style({
  display: 'grid',
  gap: spacing[6],
  fontSize: font.size.base,
  lineHeight: font.lineHeight.relaxed,
  padding: 0,
  paddingLeft: spacing[4],
  margin: 0,

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      columnGap: spacing[10],
      rowGap: spacing[8],
    },
  },
});

export const tripPageUspItemListItemStyle = style({
  paddingLeft: spacing[1],

  selectors: {
    '&::marker': {
      color: vars.color.accent,
    },
  },
});

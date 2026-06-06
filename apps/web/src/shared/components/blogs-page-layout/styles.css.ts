import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing } = vars;

export const blogsPageLayoutBlogsStyle = style({
  all: 'revert',
  display: 'grid',
  gridAutoRows: '1fr',
  gridAutoFlow: 'row',
  gap: spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
});

export const blogsPageLayoutStyle = style({
  paddingTop: spacing[12],
  paddingBottom: spacing[12],

  '@media': {
    [`screen and (min-width: ${breakpoints.xl})`]: {
      display: 'grid',
      gridTemplateColumns: `1fr ${breakpoints.xxs}`,
      gap: spacing[12],
      paddingBottom: spacing[24],
    },
  },
});

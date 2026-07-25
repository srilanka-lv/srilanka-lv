import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing } = vars;

export const blogsPageLayoutStyle = style({
  paddingTop: 'unset',
  paddingBottom: spacing[12],

  '@media': {
    // lg+: 2rem here + the footer's 4rem top padding = the site-wide 6rem
    // gap between page content and the footer's first heading.
    [`screen and (min-width: ${breakpoints.lg})`]: {
      paddingBottom: spacing[8],
    },
    [`screen and (min-width: ${breakpoints.xl})`]: {
      display: 'grid',
      gridTemplateColumns: `1fr ${breakpoints.xxs}`,
      gap: spacing[12],
    },
  },
});

export const breadcrumbsStyle = style({
  paddingBottom: spacing[8],
});

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

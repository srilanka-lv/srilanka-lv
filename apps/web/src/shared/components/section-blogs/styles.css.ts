import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing } = vars;

export const sectionBlogsTitleStyle = style({
  marginBottom: 0,
});

export const sectionBlogsStyle = style({
  position: 'relative',
  display: 'grid',
  width: '100svw',
  gridAutoColumns: '62.5svw',
  gridAutoFlow: 'column',
  gap: spacing[8],
  padding: `${spacing[8]} ${spacing[4]}`,
  left: '50%',
  right: '50%',
  marginLeft: '-50svw',
  marginRight: '-50svw',
  overflowX: 'auto',

  '@media': {
    [`screen and (min-width: ${breakpoints.xs})`]: {
      gridAutoColumns: '50svw',
    },
    [`screen and (min-width: ${breakpoints.sm})`]: {
      gridAutoColumns: '32.5svw',
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      gridAutoColumns: '20svw',
      padding: spacing[8],
    },
    [`screen and (min-width: ${breakpoints.xl})`]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(10svw, 1fr))',
    },
  },
});

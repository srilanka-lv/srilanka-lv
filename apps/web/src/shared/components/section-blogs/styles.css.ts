import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { font, spacing } = vars;

export const sectionBlogsTitleStyle = style({
  fontSize: font.size['2xl'],
  lineHeight: font.lineHeight.relaxed,
  marginTop: spacing[8],
  marginBottom: spacing[2],

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size['4xl'],
    },
  },
});

export const sectionBlogsStyle = style({
  position: 'relative',
  display: 'grid',
  width: '100svw',
  gridAutoColumns: '62.5svw',
  gridAutoFlow: 'column',
  gap: spacing[6],
  padding: `${spacing[2]} ${spacing[6]} ${spacing[10]} ${spacing[6]}`,
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
    [`screen and (min-width: ${breakpoints.md})`]: {
      padding: `${spacing[6]} ${spacing[4]} ${spacing[12]} ${spacing[4]}`,
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

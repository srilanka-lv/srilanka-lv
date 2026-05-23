import { style } from '@vanilla-extract/css';

import { inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { font, spacing } = vars;

export const sectionBlogsTitleStyle = style(
  inOverridesLayer({
    fontSize: font.size['2xl'],
    lineHeight: font.lineHeight.relaxed,
    textAlign: 'center',
    marginTop: spacing[12],
    marginBottom: 0,

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        fontSize: font.size['4xl'],
        marginTop: spacing[24],
        marginBottom: spacing[4],
      },
    },
  }),
);

export const sectionBlogsStyle = style(
  inOverridesLayer({
    position: 'relative',
    display: 'grid',
    width: '100svw',
    gridAutoColumns: '62.5svw',
    gridAutoFlow: 'column',
    gap: spacing[6],
    padding: `${spacing[10]} ${spacing[6]}`,
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
        padding: `2.25rem ${spacing[4]} ${spacing[12]}`,
      },
      [`screen and (min-width: ${breakpoints.lg})`]: {
        gridAutoColumns: '20svw',
        padding: `2.25rem ${spacing[8]} ${spacing[8]}`,
      },
      [`screen and (min-width: ${breakpoints.xl})`]: {
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
      },
      [`screen and (min-width: ${breakpoints.xxl})`]: {
        padding: `2.25rem ${spacing[40]} ${spacing[12]}`,
        gap: spacing[12],
      },
    },
  }),
);

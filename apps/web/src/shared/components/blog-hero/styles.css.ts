import { style } from '@vanilla-extract/css';

import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const blogHeroStyle = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: '4svw',
  paddingRight: '4svw',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      paddingTop: '90px',
    },
    [`screen and (min-width: ${breakpoints.xl})`]: {
      paddingTop: '72px',
    },
  },
});

import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const subFooterStyle = style({
  position: 'relative',
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.normal,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  listStyle: 'none',
  padding: `${vars.spacing[4]} 0`,
  margin: 0,

  selectors: {
    '&::before': {
      position: 'absolute',
      content: '',
      top: 0,
      height: '100%',
      width: '100svw',
      zIndex: vars.zIndex['-10'],
      backgroundColor: 'white',
      borderTop: `1px solid ${vars.color.primaryForeground}`,
      borderBottom: `1px solid ${vars.color.primaryForeground}`,
    },
  },

  '@media': {
    [`screen and (min-width: ${breakpoints.xl})`]: {
      flexDirection: 'row',
      padding: `${vars.spacing[6]} 0`,
    },
  },
});

export const subFooterItemStyle = style({
  position: 'relative',
  zIndex: vars.zIndex['10'],
  display: 'inline-flex',
  alignItems: 'center',
  paddingTop: vars.spacing[1],
  paddingBottom: vars.spacing[1],

  selectors: {
    '&:not(:last-child)::after': {
      content: '',
      display: 'none',
      width: '1px',
      height: vars.spacing[4],
      backgroundColor: vars.color.foreground,
      marginLeft: vars.spacing[2],
      marginRight: vars.spacing[2],

      '@media': {
        [`screen and (min-width: ${breakpoints.xl})`]: {
          display: 'inline-block',
          marginLeft: vars.spacing[4],
          marginRight: vars.spacing[4],
        },
      },
    },
  },

  '@media': {
    [`screen and (min-width: ${breakpoints.xl})`]: {
      paddingTop: vars.spacing[4],
      paddingBottom: vars.spacing[4],
    },
  },
});

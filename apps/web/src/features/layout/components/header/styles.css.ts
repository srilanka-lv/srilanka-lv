import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const headerStyle = style({
  position: 'relative',
  zIndex: vars.zIndex['20'],
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  paddingTop: vars.spacing[4],
  paddingBottom: vars.spacing[4],
  backgroundColor: vars.color.background,

  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100svw',
      backgroundColor: vars.color.background,
      zIndex: -1,
    },
  },

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      minHeight: '90px',
      flexDirection: 'column',
      gap: vars.spacing[4],
      paddingTop: vars.spacing[6],
      paddingBottom: 0,
    },
    [`screen and (min-width: ${breakpoints.xl})`]: {
      alignItems: 'baseline',
      flexDirection: 'row',
      gap: vars.spacing[0],
    },
  },
});

export const logoStyle = style({
  width: vars.spacing[40],

  '@media': {
    [`screen and (min-width: ${breakpoints.xs})`]: {
      width: vars.spacing[56],
    },
    [`screen and (min-width: ${breakpoints.md})`]: {
      width: vars.spacing[48],
    },
    [`screen and (min-width: ${breakpoints.xl})`]: {
      width: vars.spacing[40],
    },
    [`screen and (min-width: ${breakpoints.xxl})`]: {
      width: vars.spacing[48],
    },
  },
});

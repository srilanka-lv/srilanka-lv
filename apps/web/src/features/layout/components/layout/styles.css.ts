import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const layoutStyle = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: vars.spacing[4],
  paddingRight: vars.spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      paddingLeft: 'unset',
      paddingRight: 'unset',
      maxWidth: breakpoints.sm,
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      maxWidth: breakpoints.md,
    },
    [`screen and (min-width: ${breakpoints.xl})`]: {
      maxWidth: breakpoints.lg,
    },
    [`screen and (min-width: ${breakpoints.xxl})`]: {
      maxWidth: breakpoints.xl,
    },
  },
});

export const mainStyle = style({
  isolation: 'isolate',
});

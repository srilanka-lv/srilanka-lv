import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing } = vars;

export const blogHeroStyle = style({
  color: 'whitesmoke', // works both in light and dark mode
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: spacing[6],
  paddingRight: spacing[6],

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      paddingTop: '90px',
      maxWidth: breakpoints.sm,
      paddingLeft: 'initial',
      paddingRight: 'initial',
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      maxWidth: breakpoints.md,
    },
    [`screen and (min-width: ${breakpoints.xl})`]: {
      paddingTop: '72px',
      maxWidth: breakpoints.lg,
    },
    [`screen and (min-width: ${breakpoints.xxl})`]: {
      maxWidth: breakpoints.xl,
    },
  },
});

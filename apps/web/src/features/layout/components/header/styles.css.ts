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

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      flexDirection: 'column',
      gap: vars.spacing[2],
      paddingTop: vars.spacing[6],
    },
    [`screen and (min-width: ${breakpoints.xl})`]: {
      flexDirection: 'row',
      gap: vars.spacing[0],
    },
  },
});

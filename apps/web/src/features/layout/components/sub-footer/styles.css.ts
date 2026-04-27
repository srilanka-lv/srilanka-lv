import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const subFooterStyle = style({
  position: 'relative',
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.normal,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  listStyle: 'none',
  padding: 0,
  margin: `${vars.spacing[4]} 0 0 0`,

  selectors: {
    '&::after': {
      position: 'absolute',
      content: '',
      top: 0,
      backgroundColor: 'white',
      height: '100%',
      width: '100svw',
      zIndex: vars.zIndex['0'],
      borderTop: `1px solid ${vars.color.primaryForeground}`,
      borderBottom: `1px solid ${vars.color.primaryForeground}`,
    },
  },
});

export const subFooterItemStyle = style({
  position: 'relative',
  zIndex: vars.zIndex['10'],
  display: 'inline-flex',
  alignItems: 'center',
  paddingTop: vars.spacing[4],
  paddingBottom: vars.spacing[4],
  selectors: {
    '&:not(:last-child)::after': {
      content: '',
      display: 'inline-block',
      width: '1px',
      height: vars.spacing[4],
      backgroundColor: vars.color.foreground,
      marginLeft: vars.spacing[2],
      marginRight: vars.spacing[2],
    },
  },
});

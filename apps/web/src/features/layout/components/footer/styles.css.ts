import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const footerStyle = style({
  position: 'relative',
  display: 'grid',
  gap: vars.spacing[12],
  justifyContent: 'center',
  padding: `${vars.spacing[20]} ${vars.spacing[4]}`,
  color: vars.color.background,
  textWrap: 'balance',

  selectors: {
    '&::before': {
      alignSelf: 'center',
      justifySelf: 'center',
      position: 'absolute',
      content: '',
      backgroundColor: vars.color.foreground,
      height: '100%',
      width: '100svw',
      zIndex: vars.zIndex['-10'],
      borderTop: `1px solid ${vars.color.primaryForeground}`,
      borderBottom: `1px solid ${vars.color.primaryForeground}`,
    },
  },

  '@media': {
    [`screen and (min-width: ${breakpoints.xs})`]: {
      padding: `${vars.spacing[32]} ${vars.spacing[8]}`,
    },
    [`screen and (min-width: ${breakpoints.xl})`]: {
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: vars.spacing[12],
      padding: `${vars.spacing[48]} ${vars.spacing[0]}`,
    },
  },
});

export const footerHeadingStyle = style({
  fontSize: vars.font.size['2xl'],
  margin: 0,
});

export const footerTextStyle = style({
  fontSize: vars.font.size.base,
});

export const footerListStyle = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const coverImageEffectStyle = style({
  left: 'unset',
  placeSelf: 'center',
  width: '100svw',
});

export const coverImageEffectStyles = styleVariants({
  top: [coverImageEffectStyle, { top: 0 }],
  bottom: [
    coverImageEffectStyle,
    {
      fill: 'white',
      bottom: 0,
      transform: 'rotate(180deg)',
    },
  ],
});

import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, color, zIndex, font } = vars;

export const footerStyle = style({
  position: 'relative',
  display: 'grid',
  gap: spacing[12],
  justifyContent: 'center',
  padding: `${spacing[20]} 0`,
  textWrap: 'balance',
  color: color.primary,
  backgroundColor: 'transparent',

  selectors: {
    '&::before': {
      alignSelf: 'center',
      justifySelf: 'center',
      position: 'absolute',
      content: '',
      backgroundColor: `color-mix(in oklch, ${color.accent} 6.25%, transparent)`,
      height: '100%',
      width: '100svw',
      zIndex: zIndex['-10'],
      borderTop: `1px solid ${color.primaryForeground}`,
      borderBottom: `1px solid ${color.primaryForeground}`,
    },
  },

  '@media': {
    [`screen and (min-width: ${breakpoints.xs})`]: {
      padding: `${spacing[32]} ${spacing[8]}`,
    },
    [`screen and (min-width: ${breakpoints.xl})`]: {
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: spacing[12],
      padding: `${spacing[48]} ${spacing[0]}`,
    },
  },
});

export const footerHeadingStyle = style({
  fontSize: font.size['2xl'],
  margin: 0,
});

export const footerTextStyle = style({
  fontSize: font.size.lg,
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
      fill: color.background,
      bottom: `-1px`,
      transform: 'rotate(180deg)',
    },
  ],
});

export const footerProfileStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[4],
  marginTop: spacing[8],
});

export const footerProfilePictureStyle = style({
  width: spacing[20],
  height: spacing[20],
  borderRadius: '100px',
});

export const footerSignatureStyle = style({
  fill: color.foreground,
  width: spacing[40],
  height: 'auto',
});

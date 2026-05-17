import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { color, zIndex, spacing } = vars;

const coverImageEffectStyle = style({
  position: 'absolute',
  width: '100%',
  height: spacing[8],
  left: 0,
  fill: color.background,
  zIndex: zIndex['10'],

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      height: spacing[12],
    },
    [`screen and (min-width: ${breakpoints.xxl})`]: {
      height: spacing[24],
    },
  },
});

export const coverImageEffectStyles = styleVariants({
  top: [
    coverImageEffectStyle,
    {
      top: '68px',

      '@media': {
        [`screen and (min-width: ${breakpoints.xs})`]: {
          top: '70px',
        },
        [`screen and (min-width: ${breakpoints.md})`]: {
          top: '112px',
        },
        [`screen and (min-width: ${breakpoints.xl})`]: {
          top: '90px',
        },
      },
    },
  ],
  bottom: [
    coverImageEffectStyle,
    {
      bottom: 'calc(25svh - 1px)',
      transform: 'rotate(180deg)',

      '@media': {
        [`screen and (min-width: ${breakpoints.md})`]: {
          bottom: '-1px',
        },
      },
    },
  ],
});

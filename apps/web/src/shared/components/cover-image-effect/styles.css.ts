import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const coverImageEffectStyle = style({
  position: 'absolute',
  width: '100%',
  height: 'auto',
  left: 0,
  fill: vars.color.background,
  zIndex: vars.zIndex['10'],
});

export const coverImageEffectStyles = styleVariants({
  top: [
    coverImageEffectStyle,
    {
      top: '52px',

      '@media': {
        [`screen and (min-width: ${breakpoints.md})`]: {
          top: '90px',
        },
        [`screen and (min-width: ${breakpoints.xl})`]: {
          top: '72px',
        },
      },
    },
  ],
  bottom: [
    coverImageEffectStyle,
    {
      bottom: '0',
      transform: 'rotate(180deg)',

      '@media': {
        [`screen and (min-width: ${breakpoints.xl})`]: {
          bottom: '0',
        },
      },
    },
  ],
});

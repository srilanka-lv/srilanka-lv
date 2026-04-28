import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const coverImageEffectStyle = style({
  position: 'absolute',
  width: '100%',
  height: 'auto',
  left: 0,
  fill: vars.color.background,
  zIndex: vars.zIndex['10'],
});

export const coverImageEffectStyles = styleVariants({
  top: [coverImageEffectStyle, { top: vars.spacing[16] }],
  bottom: [
    coverImageEffectStyle,
    {
      bottom: vars.spacing[-24],
      transform: 'rotate(180deg)',
    },
  ],
});

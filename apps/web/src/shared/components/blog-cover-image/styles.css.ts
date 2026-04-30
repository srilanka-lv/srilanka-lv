import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const coverImageWrapperStyle = style({
  position: 'absolute',
  inset: 0,
  top: vars.spacing[24],
  width: '100vw',
  height: '100dvh',
});

export const coverImageStyle = style({
  objectFit: 'cover',
});

export const coverImageSpacerStyle = style({
  position: 'relative',
  display: 'block',
  height: '100dvh',
});

import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const inlineImageFigureStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[1],
  margin: 0,
});

export const inlineImageCaptionStyle = style({
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.snug,
  color: vars.color.foreground,
});

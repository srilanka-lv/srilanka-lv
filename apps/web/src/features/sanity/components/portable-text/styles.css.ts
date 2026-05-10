import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font, color } = vars;

export const inlineImageFigureStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[1],
  margin: 0,
});

export const inlineImageCaptionStyle = style({
  fontSize: font.size.sm,
  lineHeight: font.lineHeight.snug,
  color: color.foreground,
});

import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font, color } = vars;

export const imageGalleryGridStyle = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: spacing[3],
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const imageGalleryItemStyle = style({
  margin: 0,
});

export const imageGalleryFigureStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[1],
  margin: 0,
});

export const imageGalleryImageWrapperStyle = style({
  position: 'relative',
  aspectRatio: '9 / 16',
  overflow: 'clip',
});

export const imageGalleryCaptionStyle = style({
  fontSize: font.size.sm,
  lineHeight: font.lineHeight.snug,
  color: color.foreground,
});

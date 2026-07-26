import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, font, spacing, border } = vars;

export const itineraryListStyle = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gap: spacing[2],
});

export const legStyle = style({
  display: 'grid',
  gap: spacing[1],
});

export const legRouteStyle = style({
  fontSize: font.size.sm,
  lineHeight: font.lineHeight.normal,
});

export const legTimeStyle = style({
  fontWeight: font.weight.semibold,
  fontVariantNumeric: 'tabular-nums',
});

export const legMetaStyle = style({
  fontSize: font.size.xs,
  color: color.secondaryForeground,
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing[2],
});

export const overnightStyle = style({
  fontWeight: font.weight.semibold,
});

export const layoverStyle = style({
  justifySelf: 'start',
  padding: `${spacing[1]} ${spacing[3]}`,
  borderRadius: border.radius.small,
  backgroundColor: color.secondary,
  color: color.secondaryForeground,
  fontSize: font.size.xs,
});

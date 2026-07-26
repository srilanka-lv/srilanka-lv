import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, font, spacing, border } = vars;

export const statusLineStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: spacing[2],
});

const chipBaseStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: `${spacing[1]} ${spacing[3]}`,
  borderRadius: border.radius.small,
  backgroundColor: color.secondary,
  color: color.secondaryForeground,
  fontSize: font.size.xs,
  lineHeight: font.lineHeight.normal,
});

export const chipStyles = styleVariants({
  route: [chipBaseStyle],
  oneWay: [chipBaseStyle, { fontWeight: font.weight.semibold }],
});

export const stampStyle = style({
  fontSize: font.size.xs,
  color: color.secondaryForeground,
});

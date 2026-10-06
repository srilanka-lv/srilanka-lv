import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, border, spacing, font } = vars;

export const todoGrietaMarkStyle = style({
  display: 'inline',
  paddingInline: spacing[1],
  borderRadius: border.radius.small,
  outline: `2px dashed ${color.error}`,
  outlineOffset: '1px',
  backgroundColor: `color-mix(in oklch, ${color.error} 15%, transparent)`,
  color: color.foreground,
  fontFamily: 'ui-monospace, monospace',
  fontSize: font.size.sm,
  boxDecorationBreak: 'clone',
  WebkitBoxDecorationBreak: 'clone',
});

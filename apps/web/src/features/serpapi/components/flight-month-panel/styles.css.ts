import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, font, spacing } = vars;

export const panelStyle = style({
  display: 'grid',
  gap: spacing[4],
});

export const panelHeaderStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  gap: spacing[3],
});

export const panelTitleStyle = style({
  margin: 0,
  fontSize: font.size['2xl'],
  fontWeight: font.weight.semibold,
  lineHeight: font.lineHeight.tight,
});

export const panelLowestStyle = style({
  fontSize: font.size.sm,
  color: color.secondaryForeground,
});

export const rowListStyle = style({
  display: 'grid',
  gap: spacing[3],
});

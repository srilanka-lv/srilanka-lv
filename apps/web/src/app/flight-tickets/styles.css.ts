import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { breakpoint, color, font, spacing } = vars;

export const pageStyle = style({
  maxWidth: breakpoint.md,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: spacing[24],
  display: 'grid',
  gap: spacing[6],
});

export const introStyle = style({
  margin: 0,
});

export const methodNoteStyle = style({
  margin: 0,
  fontSize: font.size.xs,
  color: color.secondaryForeground,
});

export const funnelCardStyle = style({
  display: 'grid',
  gap: spacing[3],
  justifyItems: 'start',
  padding: spacing[6],
});

export const funnelTitleStyle = style({
  margin: 0,
  fontSize: font.size.xl,
  fontWeight: font.weight.semibold,
});

export const funnelBodyStyle = style({
  margin: 0,
});

export const staleCardStyle = style({
  display: 'grid',
  gap: spacing[3],
  justifyItems: 'start',
  padding: spacing[6],
});

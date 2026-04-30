import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const blogParagraphStyle = style({
  marginBlock: vars.spacing[8],
  fontSize: vars.font.size['2xl'],
  lineHeight: vars.font.lineHeight.normal,
});

export const blogHeadingStyle = style({
  marginBlock: vars.spacing[8],
  fontSize: vars.font.size['6xl'],
  fontWeight: vars.font.weight.bold,
  lineHeight: vars.font.lineHeight.snug,
});

export const blogBlockquoteStyle = style({
  marginBlock: vars.spacing[8],
  paddingLeft: vars.spacing[4],
  borderLeft: `4px solid ${vars.color.primaryForeground}`,
  fontStyle: 'italic',
});

export const blogListStyle = style({
  marginBlock: vars.spacing[8],
  paddingLeft: vars.spacing[6],
  fontSize: vars.font.size['2xl'],
  lineHeight: vars.font.lineHeight.relaxed,
});

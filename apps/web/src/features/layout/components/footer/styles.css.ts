import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const footerStyle = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '1fr',
  gap: vars.spacing[4],
  alignItems: 'start',
  justifyItems: 'start',
});

export const footerColumnStyle = style({
  margin: 0,
});

export const footerHeadingStyle = style({
  fontSize: vars.font.size['2xl'],
  margin: 0,
});

export const footerTextStyle = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.medium,
});

export const footerListStyle = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

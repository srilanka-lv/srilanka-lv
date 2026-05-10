import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const formStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[4],
});

export const textStyle = style({
  fontSize: vars.font.size.lg,
  margin: 0,
});

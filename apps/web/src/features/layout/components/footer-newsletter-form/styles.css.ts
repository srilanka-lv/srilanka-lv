import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font } = vars;

export const formStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[4],
});

export const textStyle = style({
  fontSize: font.size.lg,
  margin: 0,
});

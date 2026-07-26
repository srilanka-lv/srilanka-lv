import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing } = vars;

export const rootStyle = style({
  display: 'grid',
  gap: spacing[6],
});

export const listStyle = style({
  display: 'flex',
  alignItems: 'flex-end',
  gap: spacing[2],
  overflowX: 'auto',
  paddingBottom: spacing[2],
});

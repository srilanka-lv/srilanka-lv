import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { breakpoint, spacing } = vars;

export const articleStyle = style({
  maxWidth: breakpoint.md,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: spacing[24],
});

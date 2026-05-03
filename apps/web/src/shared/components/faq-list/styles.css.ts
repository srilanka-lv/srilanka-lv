import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const faqListStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[2],
});

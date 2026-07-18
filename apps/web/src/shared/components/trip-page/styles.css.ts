import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font } = vars;

export const tripPageTitleStyle = style({
  fontSize: font.size['5xl'],
  fontWeight: font.weight.normal,
  lineHeight: font.lineHeight.tight,
  marginTop: spacing[8],
  marginBottom: spacing[8],
});

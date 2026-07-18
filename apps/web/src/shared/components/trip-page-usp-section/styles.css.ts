import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font } = vars;

export const tripPageUspSectionStyle = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(2, min-content)',
  gap: spacing[8],
});

export const tripPageUspTitleStyle = style({
  fontSize: font.size['5xl'],
  fontWeight: font.weight.normal,
  lineHeight: font.lineHeight.tight,
  marginTop: 0,
});

export const tripPageUspItemListStyle = style({
  fontSize: font.size.base,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(2, min-content)',
  gap: spacing[8],
  gridColumn: '2 / 4',
  gridRow: '1 / 2',
  padding: 0,
  margin: 0,
});

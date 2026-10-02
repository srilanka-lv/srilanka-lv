import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font, color } = vars;

// GuideFaq renders bare h3/p pairs and leaves the look to the page around it.
export const tripPageFaqStyle = style({});

globalStyle(`${tripPageFaqStyle} > div`, {
  paddingBlock: spacing[4],
  borderTop: `1px solid color-mix(in oklch, ${color.foreground} 10%, transparent)`,
});

globalStyle(`${tripPageFaqStyle} h3`, {
  margin: 0,
  marginBottom: spacing[2],
  fontSize: font.size.lg,
  fontWeight: font.weight.semibold,
  lineHeight: font.lineHeight.snug,
});

globalStyle(`${tripPageFaqStyle} p`, {
  margin: 0,
  lineHeight: font.lineHeight.relaxed,
});

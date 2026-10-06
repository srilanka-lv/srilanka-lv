import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color } = vars;

export const faqListStyle = style({
  borderTop: `1px solid color-mix(in oklch, ${color.foreground} 10%, transparent)`,
});

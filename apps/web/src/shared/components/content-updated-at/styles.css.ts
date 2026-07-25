import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, color, font } = vars;

export const contentUpdatedAtStyle = style(
  inComponentsLayer({
    margin: `${spacing[2]} 0 0`,
    fontSize: font.size.sm,
    color: `color-mix(in oklch, ${color.foreground} 65%, ${color.background})`,
  }),
);

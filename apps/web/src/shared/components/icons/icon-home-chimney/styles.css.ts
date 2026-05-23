import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, spacing } = vars;

const iconStyle = style(
  inComponentsLayer({
    width: '100%',
    height: '100%',
    flexShrink: 0,
  }),
);

export const iconStyles = recipe({
  base: iconStyle,
  variants: {
    size: {
      small: inComponentsLayer({
        width: spacing[6],
        height: spacing[6],
      }),
      medium: inComponentsLayer({
        width: spacing[8],
        height: spacing[8],
      }),
      large: inComponentsLayer({
        width: spacing[12],
        height: spacing[12],
      }),
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export const iconFillStyle = style(
  inComponentsLayer({
    fill: color.foreground,
  }),
);

export const iconAccentStyle = style(
  inComponentsLayer({
    fill: color.accent,
  }),
);

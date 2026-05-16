import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, spacing } = vars;

const iconStyle = style({
  width: '100%',
  height: '100%',
  flexShrink: 0,
});

export const iconStyles = recipe({
  base: iconStyle,
  variants: {
    size: {
      small: {
        width: spacing[6],
        height: spacing[6],
      },
      medium: {
        width: spacing[8],
        height: spacing[8],
      },
      large: {
        width: spacing[12],
        height: spacing[12],
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export const iconFillStyle = style({
  fill: color.foreground,
});

export const iconAccentStyle = style({
  fill: color.accent,
});

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, spacing } = vars;

export const logoStyles = recipe({
  base: {
    display: 'block',
    fill: color.primary,
    height: 'auto',
  },
  variants: {
    size: {
      small: { width: spacing[20] },
      medium: { width: spacing[32] },
      large: { width: spacing[56] },
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

export const logoLinkStyle = style({
  display: 'block',
});

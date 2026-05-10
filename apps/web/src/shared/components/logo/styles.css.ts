import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const logoStyles = recipe({
  base: {
    display: 'block',
    fill: vars.color.primary,
    height: 'auto',
  },
  variants: {
    size: {
      small: { width: vars.spacing[20] },
      medium: { width: vars.spacing[32] },
      large: { width: vars.spacing[56] },
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

export const logoLinkStyle = style({
  display: 'block',
});

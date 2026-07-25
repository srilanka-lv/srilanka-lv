import { recipe } from '@vanilla-extract/recipes';

import { inBaseLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, shadow, border } = vars;

export const cardStyles = recipe({
  base: {},
  variants: {
    variant: {
      filled: inBaseLayer({
        backgroundColor: color.surface,
      }),
      outline: inBaseLayer({
        backgroundColor: 'transparent',
        border: `1px solid ${color.foreground}`,
        boxShadow: 'none',
      }),
    },
    shadow: {
      none: inBaseLayer({ boxShadow: shadow.none }),
      small: inBaseLayer({ boxShadow: shadow.small }),
      medium: inBaseLayer({ boxShadow: shadow.medium }),
      large: inBaseLayer({ boxShadow: shadow.large }),
    },
    radius: {
      small: inBaseLayer({ borderRadius: border.radius.small }),
      medium: inBaseLayer({ borderRadius: border.radius.medium }),
      large: inBaseLayer({ borderRadius: border.radius.large }),
    },
  },
  defaultVariants: {
    variant: 'filled',
    shadow: 'medium',
    radius: 'medium',
  },
});

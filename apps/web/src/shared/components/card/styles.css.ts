import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, shadow, border } = vars;

export const cardStyles = recipe({
  base: {},
  variants: {
    variant: {
      filled: {
        backgroundColor: color.primaryForeground,
      },
      outline: {
        backgroundColor: 'transparent',
        border: `1px solid ${color.foreground}`,
        boxShadow: 'none',
      },
    },
    shadow: {
      none: { boxShadow: shadow.none },
      small: { boxShadow: shadow.small },
      medium: { boxShadow: shadow.medium },
      large: { boxShadow: shadow.large },
    },
    radius: {
      small: { borderRadius: border.radius.small },
      medium: { borderRadius: border.radius.medium },
      large: { borderRadius: border.radius.large },
    },
  },
  defaultVariants: {
    variant: 'filled',
    shadow: 'medium',
    radius: 'medium',
  },
});

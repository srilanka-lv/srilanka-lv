import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const cardStyles = recipe({
  base: {},
  variants: {
    variant: {
      filled: {
        backgroundColor: vars.color.primaryForeground,
      },
      outline: {
        backgroundColor: 'transparent',
        border: `1px solid ${vars.color.foreground}`,
        boxShadow: 'none',
      },
    },
    shadow: {
      none: { boxShadow: vars.shadow.none },
      small: { boxShadow: vars.shadow.small },
      medium: { boxShadow: vars.shadow.medium },
      large: { boxShadow: vars.shadow.large },
    },
    radius: {
      small: { borderRadius: vars.border.radius.small },
      medium: { borderRadius: vars.border.radius.medium },
      large: { borderRadius: vars.border.radius.large },
    },
  },
  defaultVariants: {
    variant: 'filled',
    shadow: 'medium',
    radius: 'medium',
  },
});

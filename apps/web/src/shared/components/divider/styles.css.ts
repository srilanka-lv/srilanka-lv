import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const dividerStyles = recipe({
  base: {
    border: 'none',
    borderTopWidth: '1px',
    width: '100%',
  },
  variants: {
    variant: {
      solid: { borderTopStyle: 'solid' },
      dashed: { borderTopStyle: 'dashed' },
      dotted: { borderTopStyle: 'dotted' },
    },
    spacing: {
      none: { marginBlock: vars.spacing[0] },
      small: { marginBlock: vars.spacing[2] },
      medium: { marginBlock: vars.spacing[4] },
      large: { marginBlock: vars.spacing[8] },
    },
    color: {
      default: { borderTopColor: vars.color.foreground },
      subtle: { borderTopColor: vars.color.secondary },
    },
  },
  defaultVariants: {
    variant: 'solid',
    spacing: 'medium',
    color: 'default',
  },
});

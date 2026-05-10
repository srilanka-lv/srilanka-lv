import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, color } = vars;

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
      none: { marginBlock: spacing[0] },
      small: { marginBlock: spacing[2] },
      medium: { marginBlock: spacing[4] },
      large: { marginBlock: spacing[8] },
    },
    color: {
      default: { borderTopColor: color.foreground },
      subtle: { borderTopColor: color.secondary },
    },
  },
  defaultVariants: {
    variant: 'solid',
    spacing: 'medium',
    color: 'default',
  },
});

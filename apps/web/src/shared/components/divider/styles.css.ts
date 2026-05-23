import { recipe } from '@vanilla-extract/recipes';

import { inBaseLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, color } = vars;

export const dividerStyles = recipe({
  base: inBaseLayer({
    border: 'none',
    borderTopWidth: '1px',
    width: '100%',
  }),
  variants: {
    variant: {
      solid: inBaseLayer({ borderTopStyle: 'solid' }),
      dashed: inBaseLayer({ borderTopStyle: 'dashed' }),
      dotted: inBaseLayer({ borderTopStyle: 'dotted' }),
    },
    spacing: {
      none: inBaseLayer({ marginBlock: spacing[0] }),
      small: inBaseLayer({ marginBlock: spacing[2] }),
      medium: inBaseLayer({ marginBlock: spacing[4] }),
      large: inBaseLayer({ marginBlock: spacing[8] }),
    },
    color: {
      default: inBaseLayer({ borderTopColor: color.foreground }),
      subtle: inBaseLayer({ borderTopColor: color.secondary }),
    },
  },
  defaultVariants: {
    variant: 'solid',
    spacing: 'medium',
    color: 'default',
  },
});

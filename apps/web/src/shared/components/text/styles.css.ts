import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const textStyles = recipe({
  base: {
    lineHeight: vars.font.lineHeight.normal,
  },
  variants: {
    fontSize: {
      small: { fontSize: vars.font.size.sm },
      medium: { fontSize: vars.font.size.base },
      large: { fontSize: vars.font.size.lg },
    },
    fontWeight: {
      normal: { fontWeight: vars.font.weight.normal },
      medium: { fontWeight: vars.font.weight.medium },
      semibold: { fontWeight: vars.font.weight.semibold },
      bold: { fontWeight: vars.font.weight.bold },
    },
    fontStyle: {
      normal: { fontStyle: 'normal' },
      italic: { fontStyle: 'italic' },
    },
  },
  defaultVariants: {
    fontSize: 'medium',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
});

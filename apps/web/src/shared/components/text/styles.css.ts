import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { font } = vars;

export const textStyles = recipe({
  base: {
    lineHeight: font.lineHeight.normal,
  },
  variants: {
    fontSize: {
      small: { fontSize: font.size.sm },
      medium: { fontSize: font.size.base },
      large: { fontSize: font.size.lg },
    },
    fontWeight: {
      normal: { fontWeight: font.weight.normal },
      medium: { fontWeight: font.weight.medium },
      semibold: { fontWeight: font.weight.semibold },
      bold: { fontWeight: font.weight.bold },
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

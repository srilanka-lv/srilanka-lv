import { recipe } from '@vanilla-extract/recipes';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { font } = vars;

export const textStyles = recipe({
  base: inComponentsLayer({
    lineHeight: font.lineHeight.normal,
  }),
  variants: {
    fontSize: {
      small: inComponentsLayer({ fontSize: font.size.sm }),
      medium: inComponentsLayer({ fontSize: font.size.base }),
      large: inComponentsLayer({ fontSize: font.size.lg }),
    },
    fontWeight: {
      normal: inComponentsLayer({ fontWeight: font.weight.normal }),
      medium: inComponentsLayer({ fontWeight: font.weight.medium }),
      semibold: inComponentsLayer({ fontWeight: font.weight.semibold }),
      bold: inComponentsLayer({ fontWeight: font.weight.bold }),
    },
    fontStyle: {
      normal: inComponentsLayer({ fontStyle: 'normal' }),
      italic: inComponentsLayer({ fontStyle: 'italic' }),
    },
  },
  defaultVariants: {
    fontSize: 'medium',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
});

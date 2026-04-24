import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const logoStyles = recipe({
  base: {
    fontFamily: vars.font.family.display,
    fontWeight: vars.font.weight.normal,
    lineHeight: vars.font.lineHeight.tight,
  },
  variants: {
    size: {
      small: { fontSize: vars.font.size['2xl'] },
      medium: { fontSize: vars.font.size['3xl'] },
      large: { fontSize: vars.font.size['4xl'] },
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

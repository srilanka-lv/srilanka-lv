import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const logoStyles = recipe({
  base: {
    color: vars.color.primary,
    fontFamily: vars.font.family.display,
    fontWeight: vars.font.weight.normal,
    lineHeight: vars.font.lineHeight.none,
  },
  variants: {
    size: {
      small: { fontSize: vars.font.size['4xl'] },
      medium: { fontSize: vars.font.size['5xl'] },
      large: { fontSize: vars.font.size['6xl'] },
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

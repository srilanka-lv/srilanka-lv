import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const headingStyles = recipe({
  base: {
    lineHeight: vars.font.lineHeight.tight,
  },
  variants: {
    variant: {
      h1: {
        fontSize: vars.font.size['5xl'],
        fontWeight: vars.font.weight.extrabold,
      },
      h2: {
        fontSize: vars.font.size['4xl'],
        fontWeight: vars.font.weight.bold,
      },
      h3: {
        fontSize: vars.font.size['3xl'],
        fontWeight: vars.font.weight.bold,
      },
      h4: {
        fontSize: vars.font.size['2xl'],
        fontWeight: vars.font.weight.semibold,
      },
      h5: {
        fontSize: vars.font.size.xl,
        fontWeight: vars.font.weight.semibold,
      },
      h6: {
        fontSize: vars.font.size.lg,
        fontWeight: vars.font.weight.medium,
      },
      unstyled: {
        fontSize: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
      },
    },
  },
});

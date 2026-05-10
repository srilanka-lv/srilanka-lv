import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { font } = vars;

export const headingStyles = recipe({
  base: {
    lineHeight: font.lineHeight.tight,
  },
  variants: {
    variant: {
      h1: {
        fontSize: font.size['5xl'],
        fontWeight: font.weight.extrabold,
      },
      h2: {
        fontSize: font.size['4xl'],
        fontWeight: font.weight.bold,
      },
      h3: {
        fontSize: font.size['3xl'],
        fontWeight: font.weight.bold,
      },
      h4: {
        fontSize: font.size['2xl'],
        fontWeight: font.weight.semibold,
      },
      h5: {
        fontSize: font.size.xl,
        fontWeight: font.weight.semibold,
      },
      h6: {
        fontSize: font.size.lg,
        fontWeight: font.weight.medium,
      },
      unstyled: {
        fontSize: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
      },
    },
  },
});

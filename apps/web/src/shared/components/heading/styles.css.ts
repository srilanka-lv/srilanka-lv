import { recipe } from '@vanilla-extract/recipes';

import { inBaseLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { font } = vars;

export const headingStyles = recipe({
  base: inBaseLayer({
    lineHeight: font.lineHeight.tight,
  }),
  variants: {
    variant: {
      h1: inBaseLayer({
        fontSize: font.size['5xl'],
        fontWeight: font.weight.extrabold,
      }),
      h2: inBaseLayer({
        fontSize: font.size['4xl'],
        fontWeight: font.weight.bold,
      }),
      h3: inBaseLayer({
        fontSize: font.size['3xl'],
        fontWeight: font.weight.bold,
      }),
      h4: inBaseLayer({
        fontSize: font.size['2xl'],
        fontWeight: font.weight.semibold,
      }),
      h5: inBaseLayer({
        fontSize: font.size.xl,
        fontWeight: font.weight.semibold,
      }),
      h6: inBaseLayer({
        fontSize: font.size.lg,
        fontWeight: font.weight.medium,
      }),
      unstyled: inBaseLayer({
        fontSize: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
      }),
    },
  },
});

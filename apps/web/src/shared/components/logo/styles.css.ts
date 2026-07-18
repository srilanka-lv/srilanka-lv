import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, spacing } = vars;

export const logoStyles = recipe({
  base: inComponentsLayer({
    display: 'block',
    fill: color.primary,
    height: 'auto',
  }),
  variants: {
    size: {
      small: inComponentsLayer({ width: spacing[20] }),
      medium: inComponentsLayer({ width: spacing[32] }),
      large: inComponentsLayer({ width: spacing[56] }),
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

export const logoLinkStyle = style(
  inComponentsLayer({
    display: 'block',

    selectors: {
      '&:link, &:visited, &:hover, &:active': {
        color: 'currentColor',
      },
      '&::after': {
        all: 'unset',
      },
    },
  }),
);

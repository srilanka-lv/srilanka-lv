import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color } = vars;

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const spinnerStyles = recipe({
  base: inComponentsLayer({
    display: 'inline-block',
    borderRadius: '50%',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: color.border,
    borderTopColor: color.foreground,
    animation: `${spin} 0.6s linear infinite`,
  }),
  variants: {
    size: {
      small: inComponentsLayer({
        width: '16px',
        height: '16px',
      }),
      medium: inComponentsLayer({
        width: '24px',
        height: '24px',
      }),
      large: inComponentsLayer({
        width: '32px',
        height: '32px',
      }),
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

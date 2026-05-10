import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color } = vars;

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const spinnerStyles = recipe({
  base: {
    display: 'inline-block',
    borderRadius: '50%',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: color.secondary,
    borderTopColor: color.foreground,
    animation: `${spin} 0.6s linear infinite`,
  },
  variants: {
    size: {
      small: {
        width: '16px',
        height: '16px',
      },
      medium: {
        width: '24px',
        height: '24px',
      },
      large: {
        width: '32px',
        height: '32px',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

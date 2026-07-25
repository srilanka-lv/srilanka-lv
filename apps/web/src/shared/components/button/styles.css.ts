import { recipe } from '@vanilla-extract/recipes';

import { inBaseLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, border, font, color } = vars;

export const buttonStyles = recipe({
  base: inBaseLayer({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    borderRadius: border.radius.medium,
    fontWeight: font.weight.medium,
    cursor: 'pointer',
    transition: 'background-color 150ms, border-color 150ms, color 150ms',
    border: '1px solid transparent',
    lineHeight: 1,
    textDecoration: 'none',
    selectors: {
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  }),
  variants: {
    variant: {
      primary: inBaseLayer({
        backgroundColor: color.accent,
        color: color.accentForeground,
        selectors: {
          '&:hover:not(:disabled)': {
            opacity: 0.9,
          },
        },
      }),
      secondary: inBaseLayer({
        backgroundColor: color.secondary,
        color: color.secondaryForeground,
        selectors: {
          '&:hover:not(:disabled)': {
            opacity: 0.8,
          },
        },
      }),
      outline: inBaseLayer({
        backgroundColor: 'transparent',
        color: color.foreground,
        borderColor: color.border,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: color.secondary,
          },
        },
      }),
      ghost: inBaseLayer({
        backgroundColor: 'transparent',
        color: color.foreground,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: color.secondary,
          },
        },
      }),
    },
    size: {
      small: inBaseLayer({
        fontSize: font.size.xs,
        padding: `${spacing[1]} ${spacing[3]}`,
      }),
      medium: inBaseLayer({
        fontSize: font.size.sm,
        padding: `${spacing[2]} ${spacing[4]}`,
      }),
      large: inBaseLayer({
        fontSize: font.size.base,
        padding: `${spacing[3]} ${spacing[6]}`,
      }),
    },
    iconOnly: {
      true: inBaseLayer({
        gap: 0,
      }),
    },
  },
  compoundVariants: [
    {
      variants: { iconOnly: true, size: 'small' },
      style: inBaseLayer({ padding: spacing[1] }),
    },
    {
      variants: { iconOnly: true, size: 'medium' },
      style: inBaseLayer({ padding: spacing[2] }),
    },
    {
      variants: { iconOnly: true, size: 'large' },
      style: inBaseLayer({ padding: spacing[3] }),
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
    iconOnly: false,
  },
});

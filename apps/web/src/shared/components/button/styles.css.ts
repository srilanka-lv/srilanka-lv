import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const buttonStyles = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.spacing[2],
    borderRadius: vars.border.radius.medium,
    fontWeight: vars.font.weight.medium,
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
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.accent,
        color: vars.color.accentForeground,
        selectors: {
          '&:hover:not(:disabled)': {
            opacity: 0.9,
          },
        },
      },
      secondary: {
        backgroundColor: vars.color.secondary,
        color: vars.color.secondaryForeground,
        selectors: {
          '&:hover:not(:disabled)': {
            opacity: 0.8,
          },
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: vars.color.foreground,
        borderColor: vars.color.secondary,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.color.secondary,
          },
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: vars.color.foreground,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.color.secondary,
          },
        },
      },
    },
    size: {
      small: {
        fontSize: vars.font.size.xs,
        padding: `${vars.spacing[1]} ${vars.spacing[3]}`,
      },
      medium: {
        fontSize: vars.font.size.sm,
        padding: `${vars.spacing[2]} ${vars.spacing[4]}`,
      },
      large: {
        fontSize: vars.font.size.base,
        padding: `${vars.spacing[3]} ${vars.spacing[6]}`,
      },
    },
    iconOnly: {
      true: {
        gap: 0,
      },
    },
  },
  compoundVariants: [
    {
      variants: { iconOnly: true, size: 'small' },
      style: { padding: vars.spacing[1] },
    },
    {
      variants: { iconOnly: true, size: 'medium' },
      style: { padding: vars.spacing[2] },
    },
    {
      variants: { iconOnly: true, size: 'large' },
      style: { padding: vars.spacing[3] },
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
    iconOnly: false,
  },
});

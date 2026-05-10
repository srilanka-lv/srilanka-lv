import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, border, font, color } = vars;

export const buttonStyles = recipe({
  base: {
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
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: color.accent,
        color: color.accentForeground,
        selectors: {
          '&:hover:not(:disabled)': {
            opacity: 0.9,
          },
        },
      },
      secondary: {
        backgroundColor: color.secondary,
        color: color.secondaryForeground,
        selectors: {
          '&:hover:not(:disabled)': {
            opacity: 0.8,
          },
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: color.foreground,
        borderColor: color.secondary,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: color.secondary,
          },
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: color.foreground,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: color.secondary,
          },
        },
      },
    },
    size: {
      small: {
        fontSize: font.size.xs,
        padding: `${spacing[1]} ${spacing[3]}`,
      },
      medium: {
        fontSize: font.size.sm,
        padding: `${spacing[2]} ${spacing[4]}`,
      },
      large: {
        fontSize: font.size.base,
        padding: `${spacing[3]} ${spacing[6]}`,
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
      style: { padding: spacing[1] },
    },
    {
      variants: { iconOnly: true, size: 'medium' },
      style: { padding: spacing[2] },
    },
    {
      variants: { iconOnly: true, size: 'large' },
      style: { padding: spacing[3] },
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
    iconOnly: false,
  },
});

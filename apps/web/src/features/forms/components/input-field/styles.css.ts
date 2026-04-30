import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

export const rootStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[1],
  width: '100%',
  selectors: {
    '&[data-disabled]': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const labelStyle = style({
  fontWeight: vars.font.weight.medium,
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.normal,
  color: 'inherit',
});

export const inputWrapperStyle = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const inputStyles = recipe({
  base: {
    width: '100%',
    minWidth: 0,
    backgroundColor: vars.color.primaryForeground,
    border: `1px solid ${vars.color.secondary}`,
    borderRadius: vars.border.radius.medium,
    color: vars.color.foreground,
    fontFamily: 'inherit',
    outline: 'none',
    transition: `border-color ${vars.transition.duration.fast} ${vars.transition.easing.easeInOut}, box-shadow ${vars.transition.duration.fast} ${vars.transition.easing.easeInOut}`,
    selectors: {
      '&::placeholder': {
        color: vars.color.secondaryForeground,
        opacity: 0.5,
      },
      '&:focus': {
        borderColor: vars.focus.color,
        boxShadow: `0 0 0 ${vars.focus.width} ${vars.focus.color}`,
      },
      '&[data-invalid]': {
        borderColor: vars.color.error,
      },
      '&[data-invalid]:focus': {
        borderColor: vars.color.error,
        boxShadow: `0 0 0 ${vars.focus.width} ${vars.color.error}`,
      },
    },
  },
  variants: {
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
    loading: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: { loading: true, size: 'small' },
      style: { paddingRight: vars.spacing[8] },
    },
    {
      variants: { loading: true, size: 'medium' },
      style: { paddingRight: vars.spacing[10] },
    },
    {
      variants: { loading: true, size: 'large' },
      style: { paddingRight: vars.spacing[12] },
    },
  ],
  defaultVariants: {
    size: 'medium',
    loading: false,
  },
});

export const helperTextStyle = style({
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.normal,
  color: vars.color.secondaryForeground,
});

export const errorTextStyle = style({
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.normal,
  color: vars.color.error,
});

export const spinnerStyle = style({
  position: 'absolute',
  right: vars.spacing[3],
  top: 0,
  bottom: 0,
  margin: 'auto 0',
  pointerEvents: 'none',
});

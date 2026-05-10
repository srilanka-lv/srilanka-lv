import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font, color, border, transition, focus } = vars;

export const rootStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[1],
  width: '100%',
  selectors: {
    '&[data-disabled]': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const labelStyle = style({
  fontWeight: font.weight.medium,
  fontSize: font.size.sm,
  lineHeight: font.lineHeight.normal,
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
    backgroundColor: color.background,
    border: `1px solid ${color.secondary}`,
    borderRadius: border.radius.medium,
    color: color.foreground,
    fontFamily: 'inherit',
    outline: 'none',
    transition: `border-color ${transition.duration.fast} ${transition.easing.easeInOut}, box-shadow ${transition.duration.fast} ${transition.easing.easeInOut}`,
    selectors: {
      '&::placeholder': {
        color: color.foreground,
        opacity: 0.5,
      },
      '&:focus': {
        borderColor: focus.color,
        boxShadow: `0 0 0 ${focus.width} ${focus.color}`,
      },
      '&[data-invalid]': {
        borderColor: color.error,
      },
      '&[data-invalid]:focus': {
        borderColor: color.error,
        boxShadow: `0 0 0 ${focus.width} ${color.error}`,
      },
    },
  },
  variants: {
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
    loading: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: { loading: true, size: 'small' },
      style: { paddingRight: spacing[8] },
    },
    {
      variants: { loading: true, size: 'medium' },
      style: { paddingRight: spacing[10] },
    },
    {
      variants: { loading: true, size: 'large' },
      style: { paddingRight: spacing[12] },
    },
  ],
  defaultVariants: {
    size: 'medium',
    loading: false,
  },
});

export const helperTextStyle = style({
  fontSize: font.size.xs,
  lineHeight: font.lineHeight.normal,
  color: color.foreground,
});

export const errorTextStyle = style({
  fontSize: font.size.xs,
  lineHeight: font.lineHeight.normal,
  color: color.error,
});

export const spinnerStyle = style({
  position: 'absolute',
  right: spacing[3],
  top: 0,
  bottom: 0,
  margin: 'auto 0',
  pointerEvents: 'none',
});

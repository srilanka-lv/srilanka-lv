import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, font, spacing, border, shadow } = vars;

const contentEnterKeyframes = keyframes({
  from: { opacity: 0, transform: 'translateY(-0.25rem)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const rowStyle = style({
  backgroundColor: color.surface,
  borderRadius: border.radius.medium,
  boxShadow: shadow.small,
});

export const summaryStyle = style({
  listStyle: 'none',
  cursor: 'pointer',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: spacing[3],
  padding: spacing[4],
  borderRadius: border.radius.medium,
  selectors: {
    '&::-webkit-details-marker': {
      display: 'none',
    },
  },
  ':focus-visible': {
    outline: `${vars.focus.width} solid ${vars.focus.color}`,
    outlineOffset: vars.focus.offset,
  },
});

export const dateStyle = style({
  fontWeight: font.weight.medium,
  fontSize: font.size.sm,
});

export const airlinesStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing[2],
  fontSize: font.size.xs,
  color: color.secondaryForeground,
});

export const logoStyle = style({
  borderRadius: border.radius.small,
});

export const metaStyle = style({
  fontSize: font.size.xs,
  color: color.secondaryForeground,
});

export const priceStyle = style({
  marginLeft: 'auto',
  fontWeight: font.weight.semibold,
  fontVariantNumeric: 'tabular-nums',
});

export const chevronStyle = style({
  transition: `rotate ${vars.transition.duration.fast} ${vars.transition.easing.easeInOut}`,
  selectors: {
    'details[open] &': {
      rotate: '180deg',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const contentStyle = style({
  display: 'grid',
  gap: spacing[4],
  padding: spacing[4],
  paddingTop: 0,
  animation: `${contentEnterKeyframes} ${vars.transition.duration.fast} ${vars.transition.easing.easeInOut}`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});

export const actionsStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: spacing[3],
});

export const disclaimerStyle = style({
  fontSize: font.size.xs,
  color: color.secondaryForeground,
});

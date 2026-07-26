import { createVar, keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, font, spacing, border, transition } = vars;

export const barHeightVar = createVar();
export const barIndexVar = createVar();

const growKeyframes = keyframes({
  from: { transform: 'scaleY(0)' },
  to: { transform: 'scaleY(1)' },
});

export const tileStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing[2],
  padding: `${spacing[3]} ${spacing[4]}`,
  border: '1px solid transparent',
  borderRadius: border.radius.medium,
  backgroundColor: 'transparent',
  cursor: 'pointer',
  flexShrink: 0,
  ':focus-visible': {
    outline: `${vars.focus.width} solid ${vars.focus.color}`,
    outlineOffset: vars.focus.offset,
  },
  selectors: {
    '&[data-selected]': {
      borderColor: color.accent,
    },
    '&:hover:not([data-selected])': {
      backgroundColor: color.secondary,
    },
  },
});

export const monthLabelStyle = style({
  fontSize: font.size.xs,
  color: color.secondaryForeground,
});

export const barTrackStyle = style({
  display: 'flex',
  alignItems: 'flex-end',
  height: '4rem',
  width: '0.75rem',
});

export const barStyle = style({
  width: '100%',
  height: barHeightVar,
  borderRadius: `${border.radius.small} ${border.radius.small} 0 0`,
  backgroundColor: `color-mix(in oklch, ${color.primary} 15%, transparent)`,
  transformOrigin: 'bottom',
  animation: `${growKeyframes} ${transition.duration.normal} ${transition.easing.easeInOut} backwards`,
  animationDelay: `calc(${barIndexVar} * 30ms)`,
  selectors: {
    [`${tileStyle}[data-selected] &`]: {
      backgroundColor: color.accent,
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});

export const priceLabelStyle = style({
  fontSize: font.size.sm,
  fontWeight: font.weight.semibold,
  fontVariantNumeric: 'tabular-nums',
});

export const visuallyHiddenStyle = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: 0,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
});

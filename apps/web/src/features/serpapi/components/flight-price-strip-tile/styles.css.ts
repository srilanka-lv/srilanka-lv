import { createVar, keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, font, spacing, border, shadow, transition, zIndex } = vars;

export const barHeightVar = createVar();
export const barIndexVar = createVar();

const growKeyframes = keyframes({
  from: { transform: 'scaleY(0)' },
  to: { transform: 'scaleY(1)' },
});

export const tileStyle = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing[2],
  padding: `${spacing[3]} ${spacing[4]}`,
  border: '1px solid transparent',
  borderRadius: border.radius.medium,
  backgroundColor: 'transparent',
  color: color.foreground,
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

// Was a visually-hidden (clip-path) span; now a real tooltip bubble shown on
// hover/focus (name kept as-is to avoid touching index.tsx, which already
// renders this as `<span className={visuallyHiddenStyle}>{hint}</span>` and
// needs no markup change for a CSS-only fix).
//
// Positioned over the bar track (the tile's own vertical center) rather than
// above/below the tile: the strip's `overflowX: auto` (flight-price-explorer)
// implicitly computes overflow-y to `auto` too, so anything extending past
// the tile's own box vertically would be clipped by the scroll container.
// Centering inside the tile keeps the bubble fully within tile bounds.
export const visuallyHiddenStyle = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: zIndex['10'],
  pointerEvents: 'none',
  opacity: 0,
  whiteSpace: 'nowrap',
  padding: `${spacing[1]} ${spacing[2]}`,
  borderRadius: border.radius.small,
  border: `1px solid color-mix(in oklch, ${color.primary} 10%, transparent)`,
  backgroundColor: color.surface,
  color: color.foreground,
  boxShadow: shadow.small,
  fontSize: font.size.xs,
  lineHeight: font.lineHeight.snug,
  textAlign: 'center',
  selectors: {
    [`${tileStyle}:hover &`]: {
      opacity: 1,
    },
    [`${tileStyle}:focus-visible &`]: {
      opacity: 1,
    },
  },
});

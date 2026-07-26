import { keyframes, style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, font, spacing, border, shadow, focus } = vars;

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

// Groups the airline logos as a single flex item (own gap mirrors the
// parent's) so the aria-hidden wrapper in index.tsx (the adjacent airline
// names already carry this information for assistive tech) doesn't disturb
// the visual spacing between logos or before the text.
export const logoGroupStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing[2],
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

// Same fix as the funnel CTA in app/flight-tickets/styles.css.ts: the global
// coral link styling (base layer) otherwise repaints this anchor's text and
// its color-dodge bar the same coral as the button's own accent background,
// making the label invisible. The `components` layer wins over the base
// layer regardless of selector specificity, and the bar is switched off
// since it has nothing to contrast against on a solid coral pill. A lime
// focus-visible outline replaces the bar's lost focus indicator.
export const ctaLinkStyle = style(
  inComponentsLayer({
    color: color.accentForeground,
    selectors: {
      '&:hover': {
        color: color.accentForeground,
      },
      '&:focus-visible': {
        color: color.accentForeground,
        outline: `${focus.width} solid ${focus.color}`,
        outlineOffset: focus.offset,
      },
      '&::after': {
        display: 'none',
      },
    },
  }),
);

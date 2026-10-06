import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color, zIndex, transition } = vars;

const base = style({
  position: 'fixed',
  insetInline: 0,
  bottom: 0,
  zIndex: zIndex['30'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing[4],
  paddingTop: spacing[2],
  paddingInline: spacing[4],
  paddingBottom: `calc(${spacing[2]} + env(safe-area-inset-bottom, 0px))`,
  backgroundColor: color.background,
  borderTop: `1px solid color-mix(in oklch, ${color.foreground} 10%, transparent)`,
  boxShadow: '0 -4px 6px -1px rgb(0 0 0 / 0.05)',
  transitionProperty: 'transform, visibility',
  transitionDuration: transition.duration.fast,
  transitionTimingFunction: transition.easing.easeInOut,

  '@media': {
    // Wide screens keep the facts card sticky beside the photos instead.
    [`screen and (min-width: ${breakpoints.lg})`]: {
      display: 'none',
    },
    '(prefers-reduced-motion: reduce)': {
      transitionDuration: '0s',
    },
  },
});

export const stickyBarStyles = styleVariants({
  visible: [base, { transform: 'translateY(0)', visibility: 'visible' }],
  hidden: [base, { transform: 'translateY(100%)', visibility: 'hidden' }],
});

// Overrides the full-width, tall button the facts card uses.
export const stickyBarActionStyle = style({
  width: 'auto',
  flexShrink: 0,
  marginBottom: 0,
  paddingBlock: spacing[3],
  paddingInline: spacing[4],
  fontSize: font.size.base,

  '@media': {
    [`screen and (min-width: ${breakpoints.xs})`]: {
      marginBottom: 0,
    },
  },
});

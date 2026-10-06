/**
 * The open/close motion every disclosure on the trip page shares (the
 * itinerary days and the FAQ): one duration and one curve, and none at all
 * for visitors who ask for reduced motion.
 */
export const tripDisclosureTransition = {
  transitionDuration: '325ms',
  transitionTimingFunction: 'cubic-bezier(0.675, 0.145, 0.000, 1.015)',
} as const;

export const tripDisclosureReducedMotion = {
  '(prefers-reduced-motion: reduce)': {
    transitionDuration: '0s',
  },
} as const;

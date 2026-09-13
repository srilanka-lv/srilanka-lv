import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { color, focus, spacing, transition } = vars;

export const sectionStyle = style(
  inComponentsLayer({
    scrollMarginTop: spacing[24],
  }),
);

export const headingStyle = style(
  inComponentsLayer({
    scrollMarginTop: spacing[24],
  }),
);

/**
 * The chain link next to each H2. Invisible at rest so it never competes with
 * the heading, revealed on hover and on keyboard focus. It keeps its space in
 * the line at all times, so revealing it cannot shift the layout, and it needs
 * no JavaScript.
 *
 * On a touch screen there is no hover, so it stays visible but quiet: tapping
 * it puts the section URL in the address bar, which is how someone shares a
 * single answer from a page this long.
 */
export const anchorStyle = style(
  inComponentsLayer({
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: spacing[2],
    verticalAlign: 'middle',
    color: color.accent,
    opacity: 0,
    transition: `opacity ${transition.duration.fast} ${transition.easing.easeInOut}`,

    selectors: {
      [`${headingStyle}:hover &`]: {
        opacity: 1,
      },
      '&:focus-visible': {
        opacity: 1,
        outline: `${focus.width} solid ${focus.color}`,
        outlineOffset: focus.offset,
      },
    },

    '@media': {
      '(hover: none)': {
        opacity: 0.45,
      },
      '(prefers-reduced-motion: reduce)': {
        transition: 'none',
      },
    },
  }),
);

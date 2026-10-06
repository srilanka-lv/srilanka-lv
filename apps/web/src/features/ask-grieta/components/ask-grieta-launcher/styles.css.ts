import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font, color, focus } = vars;

// Only transform and opacity animate, so the browser can run the motion on the
// compositor while the page scrolls: no width, padding or gap transitions.
const motion = '320ms cubic-bezier(0.22, 1, 0.36, 1)';

// Fixed, so it never shifts layout. Sits above the iOS home indicator and
// Safari's bottom bar via the safe-area insets (0 without viewport-fit=cover).
// The button itself takes no pointer events: the photo and the label do, so a
// collapsed button is only as big as the photo.
export const launcherStyle = style(
  inComponentsLayer({
    position: 'fixed',
    right: `max(${spacing[4]}, calc(env(safe-area-inset-right) + ${spacing[2]}))`,
    bottom: `max(${spacing[4]}, calc(env(safe-area-inset-bottom) + ${spacing[2]}))`,
    // A page's own bottom bar (the girls trip sticky bar) sets
    // --bottom-bar-offset while it shows, so the button rides above it.
    translate: '0 calc(-1 * var(--bottom-bar-offset, 0px))',
    zIndex: 40,
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    border: 0,
    background: 'none',
    color: color.accentForeground,
    fontFamily: 'inherit',
    cursor: 'pointer',
    pointerEvents: 'none',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
    transition: `opacity ${motion}, transform ${motion}, translate ${motion}, visibility ${motion}`,
    selectors: {
      '&[data-hidden]': {
        opacity: 0,
        visibility: 'hidden',
        transform: 'translateY(1rem) scale(0.9)',
      },
    },
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        transition: 'none',
      },
    },
  }),
);

// The coral pill tucks in under the photo; collapsing slides it in behind it.
export const labelStyle = style(
  inComponentsLayer({
    marginRight: '-1.75rem',
    padding: `0 calc(1.75rem + ${spacing[3]}) 0 ${spacing[4]}`,
    height: '2.75rem',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '999px',
    backgroundColor: color.accent,
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    boxShadow: '0 8px 20px -8px rgb(0 0 0 / 0.3)',
    pointerEvents: 'auto',
    transformOrigin: 'right center',
    transition: `opacity ${motion}, transform ${motion}`,
    selectors: {
      [`${launcherStyle}[data-collapsed] &`]: {
        opacity: 0,
        transform: 'translateX(1.5rem) scaleX(0.6)',
        pointerEvents: 'none',
      },
    },
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        transition: 'opacity 1ms',
      },
    },
  }),
);

export const avatarWrapStyle = style(
  inComponentsLayer({
    position: 'relative',
    flexShrink: 0,
    width: '3.25rem',
    height: '3.25rem',
    borderRadius: '999px',
    backgroundColor: color.accent,
    boxShadow: '0 8px 20px -8px rgb(0 0 0 / 0.35)',
    pointerEvents: 'auto',
    selectors: {
      [`${launcherStyle}:focus-visible &`]: {
        outline: `${focus.width} solid ${focus.color}`,
        outlineOffset: '0.2rem',
      },
      [`${launcherStyle}:active &`]: {
        transform: 'scale(0.95)',
      },
    },
  }),
);

export const avatarStyle = style(
  inComponentsLayer({
    display: 'block',
    width: '100%',
    height: '100%',
    borderRadius: '999px',
    objectFit: 'cover',
    border: `2px solid ${color.accent}`,
  }),
);

// The recognisable "chat" cue: a speech bubble badge on the photo's corner.
export const badgeStyle = style(
  inComponentsLayer({
    position: 'absolute',
    right: '-0.2rem',
    bottom: '-0.2rem',
    display: 'grid',
    placeItems: 'center',
    width: '1.375rem',
    height: '1.375rem',
    borderRadius: '999px',
    backgroundColor: color.accent,
    color: color.accentForeground,
    boxShadow: `0 0 0 2px ${color.background}`,
  }),
);

export const badgeIconStyle = style(
  inComponentsLayer({
    width: '0.8rem',
    height: '0.8rem',
  }),
);

import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { breakpoint, color, font, spacing, focus } = vars;

export const pageStyle = style({
  maxWidth: breakpoint.md,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: spacing[24],
  display: 'grid',
  gap: spacing[6],
});

export const introStyle = style({
  margin: 0,
});

export const methodNoteStyle = style({
  margin: 0,
  fontSize: font.size.xs,
  color: color.secondaryForeground,
});

export const funnelCardStyle = style({
  display: 'grid',
  gap: spacing[3],
  justifyItems: 'start',
  padding: spacing[6],
});

export const funnelTitleStyle = style({
  margin: 0,
  fontSize: font.size.xl,
  fontWeight: font.weight.semibold,
});

export const funnelBodyStyle = style({
  margin: 0,
});

export const staleCardStyle = style({
  display: 'grid',
  gap: spacing[3],
  justifyItems: 'start',
  padding: spacing[6],
});

// The global "coral bar" link styling (body a:link/:hover/:focus-visible in
// the base layer) otherwise repaints this anchor's text and the color-dodge
// bar the same coral as the button's own accent background, making the
// label invisible. Reasserting color in the later `components` layer wins
// over the base-layer link rule regardless of selector specificity (see
// sectionHeroButtonStyle for the same pattern on an anchor CTA), and the
// bar itself is switched off since a coral bar on a coral pill has nothing
// to contrast against. The anchor loses the bar's hover/focus indicator, so
// a lime focus-visible outline (matching every other interactive control on
// this page) replaces it.
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
      '&:after': {
        display: 'none',
      },
    },
  }),
);

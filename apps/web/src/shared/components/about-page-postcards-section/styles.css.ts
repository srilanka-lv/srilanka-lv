import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { border, breakpoint, color, focus, font, shadow, spacing, transition } = vars;

export const postcardsSectionStyle = style(
  inComponentsLayer({
    width: '100%',
    maxWidth: breakpoint.md,
    margin: `${spacing[20]} auto 0`,
    display: 'grid',
    gap: spacing[6],

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        gridTemplateColumns: '1fr 1fr',
      },
    },
  }),
);

// An anchor styled as a card, so the global coral-bar link treatment must be
// reasserted away in the components layer: foreground text in every state and
// no ::after bar (see flight-tickets ctaLinkStyle for the same pattern). The
// lime focus ring replaces the bar's focus indicator.
export const postcardLinkStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: color.surface,
    borderRadius: border.radius.medium,
    border: `1px solid color-mix(in oklch, ${color.foreground} 10%, transparent)`,
    boxShadow: shadow.medium,
    overflow: 'hidden',
    color: color.foreground,
    transitionProperty: 'transform, box-shadow',
    transitionDuration: transition.duration.faster,
    transitionTimingFunction: transition.easing.easeInOut,

    selectors: {
      '&:hover': {
        color: color.foreground,
        transform: 'translateY(-2px)',
        boxShadow: shadow.large,
      },
      '&:focus-visible': {
        color: color.foreground,
        outline: `${focus.width} solid ${focus.color}`,
        outlineOffset: focus.offset,
      },
      '&::after': {
        display: 'none',
      },
    },
  }),
);

export const postcardImageStyle = style(
  inComponentsLayer({
    position: 'relative',
    display: 'block',
    aspectRatio: '3 / 2',
  }),
);

export const postcardImageImgStyle = style(
  inComponentsLayer({
    objectFit: 'cover',
    objectPosition: 'center center',
  }),
);

export const postcardBodyStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
    padding: spacing[5],
  }),
);

export const postcardTitleStyle = style(
  inComponentsLayer({
    fontSize: font.size.lg,
    fontWeight: font.weight.semibold,
    lineHeight: font.lineHeight.snug,
    textWrap: 'balance',
  }),
);

export const postcardMetaStyle = style(
  inComponentsLayer({
    fontSize: font.size.sm,
    fontWeight: font.weight.normal,
    color: `color-mix(in oklch, ${color.foreground} 75%, transparent)`,
  }),
);

import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, border, focus, transition } = vars;

export const tripPhotoGalleryMainTileStyle = style({
  position: 'relative',
  display: 'block',
  width: '100%',
  height: '50svh',
  overflow: 'hidden',
  borderTopLeftRadius: border.radius.medium,
  borderTopRightRadius: border.radius.medium,

  '@media': {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      height: '60svh',
    },
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridArea: '1 / 1 / 2 / 4',
      minHeight: '500px',
      borderTopLeftRadius: border.radius.large,
      borderTopRightRadius: border.radius.large,
    },
  },
});

export const tripPhotoGalleryTilesStyle = style({
  display: 'grid',
  gap: spacing[1],
  gridRow: '2 / 3',
  gridColumn: '1 / 4',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(3, min-content)',

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      gap: spacing[2],
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(2, min-content)',
    },
  },
});

export const tripPhotoGalleryTileStyle = style({
  position: 'relative',
  overflow: 'hidden',
  aspectRatio: '2 / 1.25',

  selectors: {
    '&:nth-of-type(5)': {
      borderBottomLeftRadius: border.radius.medium,
    },
    '&:nth-of-type(6)': {
      borderBottomRightRadius: border.radius.medium,
    },
  },

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      selectors: {
        '&:nth-of-type(4)': {
          borderBottomLeftRadius: border.radius.large,
        },
        '&:nth-of-type(5)': {
          borderBottomLeftRadius: 0,
        },
        '&:nth-of-type(6)': {
          borderBottomRightRadius: border.radius.large,
        },
      },
    },
  },
});

// Whatever lies over the large photo lets taps through to it.
export const tripPhotoGalleryOverlayStyle = style({
  pointerEvents: 'none',
});

// Fills the tile; the tile clips it, so the focus ring is drawn inside.
export const tripPhotoGalleryTileButtonStyle = style({
  position: 'absolute',
  inset: 0,
  display: 'block',
  width: '100%',
  padding: 0,
  border: 'none',
  background: 'none',
  cursor: 'zoom-in',

  selectors: {
    '&:focus-visible': {
      outline: `calc(${focus.width} * 2) solid ${focus.color}`,
      outlineOffset: `calc(${focus.width} * -2)`,
      borderRadius: 0,
    },
  },
});

export const tripPhotoGalleryTileImageStyle = style({
  objectFit: 'cover',
  transitionProperty: 'transform',
  transitionDuration: transition.duration.normal,
  transitionTimingFunction: transition.easing.easeInOut,
});

globalStyle(`${tripPhotoGalleryTileButtonStyle}:hover ${tripPhotoGalleryTileImageStyle}`, {
  '@media': {
    '(hover: hover) and (prefers-reduced-motion: no-preference)': {
      transform: 'scale(1.03)',
    },
  },
});

// The "+N" label on the last tile: a black scrim, theme-independent like every
// other text-over-photo treatment on the site.
export const tripPhotoGalleryMoreStyle = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing[2],
  background: 'linear-gradient(to top, rgb(0 0 0 / 0.65), rgb(0 0 0 / 0.35))',
  color: 'oklch(98.96% 0.002 17.19)',
  fontSize: font.size.xl,
  fontWeight: font.weight.medium,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: font.lineHeight.none,
});

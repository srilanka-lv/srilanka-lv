import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, border, focus, transition, zIndex } = vars;

// The viewer is dark in both themes, like the scrims the site puts over photos:
// the photos carry the colour. Values are the DESIGN.md dark-bg and warm paper.
const viewerBackground = 'oklch(15% 0.008 27)';
const viewerText = 'oklch(98.96% 0.002 17.19)';
const viewerControl = `color-mix(in oklch, ${viewerText} 12%, transparent)`;
const viewerControlHover = `color-mix(in oklch, ${viewerText} 22%, transparent)`;

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const fade = {
  "&[data-state='open']": {
    animation: `${fadeIn} ${transition.duration.fast} ease-out`,
  },
  "&[data-state='closed']": {
    animation: `${fadeOut} ${transition.duration.faster} ease-in`,
  },
};

const viewerFocus = {
  '&:focus-visible': {
    outline: `calc(${focus.width} * 2) solid ${focus.color}`,
    outlineOffset: '2px',
  },
};

export const lightboxBackdropStyle = style({
  position: 'fixed',
  inset: 0,
  zIndex: zIndex['40'],
  backgroundColor: viewerBackground,
  selectors: fade,
});

export const lightboxPositionerStyle = style({
  position: 'fixed',
  inset: 0,
  zIndex: zIndex['50'],
  overscrollBehavior: 'contain',
});

export const lightboxContentStyle = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: viewerBackground,
  color: viewerText,
  outline: 'none',
  selectors: fade,
});

export const lightboxTopBarStyle = style({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: zIndex['10'],
  padding: spacing[2],

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      padding: spacing[4],
    },
  },
});

export const lightboxTitleStyle = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

const iconButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: spacing[12],
  height: spacing[12],
  padding: 0,
  border: 'none',
  borderRadius: border.radius.medium,
  backgroundColor: viewerControl,
  color: viewerText,
  cursor: 'pointer',
  transitionProperty: 'background-color',
  transitionDuration: transition.duration.faster,
  transitionTimingFunction: transition.easing.easeInOut,
  selectors: {
    '&:hover': {
      backgroundColor: viewerControlHover,
    },
    ...viewerFocus,
  },
});

export const lightboxCloseStyle = iconButton;

export const lightboxStageStyle = style({
  display: 'grid',
  gridTemplateRows: 'minmax(0, 1fr) auto auto',
  flex: 1,
  minHeight: 0,
  paddingTop: spacing[16],
});

export const lightboxCounterStyle = style({
  position: 'absolute',
  top: spacing[2],
  left: spacing[2],
  display: 'flex',
  alignItems: 'center',
  height: spacing[12],
  margin: 0,
  paddingInline: spacing[2],
  fontSize: font.size.sm,
  fontWeight: font.weight.medium,
  fontVariantNumeric: 'tabular-nums',
  letterSpacing: font.letterSpacing.wide,

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      top: spacing[4],
      left: spacing[4],
    },
  },
});

export const lightboxViewportStyle = style({
  position: 'relative',
  minHeight: 0,
});

export const lightboxItemGroupStyle = style({
  height: '100%',
  outline: 'none',
});

export const lightboxSlideStyle = style({
  position: 'relative',
  height: '100%',
});

// Holds the photo clear of the arrows on wide screens.
export const lightboxFrameStyle = style({
  position: 'absolute',
  inset: 0,

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      insetInline: spacing[20],
    },
  },
});

export const lightboxImageStyle = style({
  objectFit: 'contain',
  userSelect: 'none',
});

export const lightboxArrowStyle = recipe({
  base: [
    iconButton,
    {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      // Over a bright photo on a phone the arrow needs its own dark ground.
      backgroundColor: `color-mix(in oklch, ${viewerBackground} 55%, transparent)`,
      backdropFilter: 'blur(4px)',

      '@media': {
        [`screen and (min-width: ${breakpoints.md})`]: {
          backgroundColor: viewerControl,
          backdropFilter: 'none',
        },
      },
    },
  ],
  variants: {
    side: {
      prev: {
        left: spacing[2],
        '@media': {
          [`screen and (min-width: ${breakpoints.md})`]: { left: spacing[4] },
        },
      },
      next: {
        right: spacing[2],
        '@media': {
          [`screen and (min-width: ${breakpoints.md})`]: { right: spacing[4] },
        },
      },
    },
  },
});

// Fixed height, so a photo without a caption does not resize the slides.
export const lightboxCaptionStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: spacing[12],
  margin: 0,
  paddingInline: spacing[4],
  fontSize: font.size.sm,
  lineHeight: font.lineHeight.snug,
  textAlign: 'center',
  color: `color-mix(in oklch, ${viewerText} 85%, transparent)`,

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size.base,
    },
  },
});

// Thumbnails only on wide screens; phones swipe.
export const lightboxThumbnailsStyle = style({
  display: 'none',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      display: 'flex',
      gap: spacing[2],
      overflowX: 'auto',
      padding: `${spacing[1]} ${spacing[4]} ${spacing[4]}`,
      scrollbarWidth: 'none',
    },
  },
});

export const lightboxThumbnailStyle = style({
  position: 'relative',
  flex: '0 0 auto',
  width: spacing[16],
  height: spacing[12],
  padding: 0,
  border: 'none',
  borderRadius: border.radius.small,
  overflow: 'hidden',
  backgroundColor: viewerControl,
  cursor: 'pointer',
  opacity: 0.45,
  transitionProperty: 'opacity',
  transitionDuration: transition.duration.faster,
  transitionTimingFunction: transition.easing.easeInOut,
  selectors: {
    // Centres a short strip and still scrolls a long one from its start.
    '&:first-child': {
      marginInlineStart: 'auto',
    },
    '&:last-child': {
      marginInlineEnd: 'auto',
    },
    '&:hover': {
      opacity: 0.8,
    },
    '&[data-current]': {
      opacity: 1,
    },
    // Drawn over the photo; an inset shadow on the button would sit under it.
    '&[data-current]::after': {
      content: '',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      boxShadow: `inset 0 0 0 2px ${viewerText}`,
    },
    '&:focus-visible': {
      outline: `calc(${focus.width} * 2) solid ${focus.color}`,
      outlineOffset: '-3px',
    },
  },
});

export const lightboxThumbnailImageStyle = style({
  objectFit: 'cover',
});

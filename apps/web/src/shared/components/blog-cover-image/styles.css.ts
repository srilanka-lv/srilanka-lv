import { createVar, fallbackVar, keyframes, style } from '@vanilla-extract/css';

import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const coverImageBackgroundVar = createVar();

const blurOnScroll = keyframes({
  from: { filter: 'blur(0)', transform: 'scale(1.125)' },
  to: { filter: 'blur(2.5px)', transform: 'scale(1)' },
});

export const coverImageBackgroundOverflowStyle = style({
  position: 'absolute',
  inset: 0,
  width: '100svw',
  height: '100svh',
  overflow: 'hidden',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      marginTop: '90px',
      height: 'calc(100svh - 90px)',
    },
    [`screen and (min-width: ${breakpoints.xl})`]: {
      marginTop: '72px',
      height: 'calc(100svh - 72px)',
    },
  },
});

export const coverImageBackgroundWrapperStyle = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  display: 'block',

  '@supports': {
    '(animation-timeline: scroll())': {
      animationName: blurOnScroll,
      animationTimeline: 'scroll(root block)',
      animationRangeStart: '0',
      animationRangeEnd: '100svh',
      animationFillMode: 'both',
      animationTimingFunction: 'linear',
    },
  },
});

export const coverImageBackgroundStyle = style({
  width: '100%',
  height: '100%',

  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      inset: 0,
      backgroundImage: fallbackVar(coverImageBackgroundVar, 'none'),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    },
  },
});

export const coverImageEffectStyle = style({
  height: '72px',
});

export const coverImageSpacerStyle = style({
  position: 'relative',
  display: 'block',
  height: 'calc(100svh - 72px)',
});

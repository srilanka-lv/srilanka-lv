import { createVar, fallbackVar, keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const coverImageBackgroundVar = createVar();

const onScrollAnimation = keyframes({
  from: {
    opacity: 1,
    transform: 'scale(1.0625)',
  },
  to: {
    opacity: 0.25,
    transform: 'scale(1)',
  },
});

export const coverImageStyle = style({
  display: 'block',
  gridColumn: 'span 2',
});

export const coverImageBackgroundOverflowStyle = style({
  position: 'absolute',
  inset: 0,
  width: '100svw',
  height: '75svh',
  overflow: 'clip',
  backgroundColor: vars.color.background,

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
  filter: 'blur(0.25px)',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      filter: 'blur(1.5px)',
    },
  },

  '@supports': {
    '(animation-timeline: scroll())': {
      animationName: onScrollAnimation,
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
  height: 'calc(75svh - 72px)',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      height: 'calc(100svh - 72px)',
    },
  },
});

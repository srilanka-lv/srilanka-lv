import { createVar, fallbackVar, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { color, zIndex, spacing } = vars;

export const coverImageBackgroundVar = createVar();

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
  backgroundColor: color.background,

  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      background: `linear-gradient(0deg,rgba(0, 0, 0, .75) 0%, rgba(255, 255, 255, 0) 100%)`,
      zIndex: zIndex['10'],
    },
  },

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
    },
  },
});

export const coverImageEffectStyle = style({
  zIndex: zIndex['20'],
  height: spacing[8],

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      height: spacing[12],
    },
    [`screen and (min-width: ${breakpoints.xxl})`]: {
      height: spacing[24],
    },
  },
});

export const coverImageSpacerStyle = style({
  position: 'relative',
  display: 'block',
  height: `calc(75svh - ${spacing[8]})`,

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      height: `calc(100svh - ${spacing[8]})`,
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      height: `calc(100svh - ${spacing[24]})`,
    },
  },
});

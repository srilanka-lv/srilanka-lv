import { createVar, fallbackVar, style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { color, zIndex, spacing } = vars;

export const coverImageBackgroundVar = createVar();

export const coverImageStyle = style(
  inComponentsLayer({
    display: 'block',
  }),
);

export const coverImageBackgroundOverflowStyle = style(
  inComponentsLayer({
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
  }),
);

export const coverImageBackgroundWrapperStyle = style(
  inComponentsLayer({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    display: 'block',
  }),
);

export const coverImageBackgroundStyle = style(
  inComponentsLayer({
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
  }),
);

export const coverImageEffectStyle = style(
  inComponentsLayer({
    zIndex: zIndex['20'],
    height: spacing[8],

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        height: spacing[12],
      },
    },
  }),
);

export const coverImageSpacerStyle = style(
  inComponentsLayer({
    position: 'relative',
    display: 'block',
    height: `calc(75svh - ${spacing[8]})`,

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        height: `calc(100svh - ${spacing[8]})`,
      },
    },
  }),
);

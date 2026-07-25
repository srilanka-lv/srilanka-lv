import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { inComponentsLayer, inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, zIndex, color } = vars;

const headerStyle = style(
  inComponentsLayer({
    position: 'relative',
    zIndex: zIndex['20'],
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: spacing[5],
    paddingBottom: spacing[2],

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        minHeight: '90px',
        flexDirection: 'column',
        gap: spacing[4],
        paddingTop: spacing[6],
        paddingBottom: spacing[8],
      },
      [`screen and (min-width: ${breakpoints.xl})`]: {
        alignItems: 'baseline',
        flexDirection: 'row',
        gap: spacing[0],
      },
    },
  }),
);

export const headerStyles = recipe({
  base: headerStyle,
  variants: {
    variant: {
      'without-overlay': {
        mixBlendMode: 'normal',
        color: color.foreground,

        selectors: {
          '&::after': {
            display: 'none',
          },
        },
      },
      'with-overlay': {
        // Sits on a photo, so the ink must stay light in both themes: the
        // light theme's background value, not the themed background token
        // (which is near-black in dark mode).
        color: 'oklch(98.96% 0.002 17.19)',

        '@media': {
          [`screen and (min-width: ${breakpoints.md})`]: {
            mixBlendMode: 'luminosity',
            color: 'whitesmoke',

            selectors: {
              '&::after': {
                content: '',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100svw',
                zIndex: -1,
                background: 'linear-gradient(180deg,rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%)',
              },
            },
          },
        },
      },
    },
  },
});

export const logoStyle = style(
  inOverridesLayer({
    fill: 'currentColor',
    width: spacing[40],

    '@media': {
      [`screen and (min-width: ${breakpoints.xs})`]: {
        width: spacing[56],
      },
      [`screen and (min-width: ${breakpoints.md})`]: {
        width: spacing[48],
      },
      [`screen and (min-width: ${breakpoints.xl})`]: {
        width: spacing[40],
      },
      [`screen and (min-width: ${breakpoints.xxl})`]: {
        width: spacing[48],
      },
    },
  }),
);

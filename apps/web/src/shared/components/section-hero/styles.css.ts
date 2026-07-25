import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, zIndex, color, border, transition } = vars;

export const sectionHeroStyle = style(
  inComponentsLayer({
    position: 'relative',
    height: '75svh',
    width: '100svw',
    left: '50%',
    right: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: spacing[2],
    alignItems: 'center',
    marginTop: '-101px',
    marginRight: '-50svw',
    marginBottom: 0,
    marginLeft: '-50svw',
    overflow: 'hidden',

    selectors: {
      '&::after': {
        content: '',
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(0deg,rgba(0, 0, 0, 0.625) 10%, rgba(255, 255, 255, 0) 75%)`,
        zIndex: 1,
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        marginTop: `-144px`,
        height: '100svh',
      },
      [`screen and (min-width: ${breakpoints.xl})`]: {
        marginTop: `-101px`,
      },
    },
  }),
);

export const sectionHeroTitleStyle = style(
  inComponentsLayer({
    position: 'relative',
    color: 'whitesmoke',
    mixBlendMode: 'luminosity',
    fontSize: font.size['4xl'],
    fontWeight: font.weight.bold,
    lineHeight: font.lineHeight.tight,
    textAlign: 'center',
    textWrap: 'balance',
    width: '100%',
    maxWidth: breakpoints.md,
    margin: '0 auto',
    padding: `0 ${spacing[4]}`,
    zIndex: zIndex['10'],

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        fontSize: font.size['6xl'],
      },
    },
  }),
);

export const sectionHeroSubtitleStyle = style(
  inComponentsLayer({
    position: 'relative',
    color: 'whitesmoke',
    mixBlendMode: 'luminosity',
    fontSize: font.size['2xl'],
    fontWeight: font.weight.light,
    lineHeight: font.lineHeight.normal,
    textAlign: 'center',
    textWrap: 'balance',
    width: '100%',
    maxWidth: breakpoints.sm,
    margin: '0 auto',
    padding: `0 ${spacing[4]}`,
    zIndex: zIndex['10'],

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        fontSize: font.size['3xl'],
      },
    },
  }),
);

export const sectionHeroImageStyle = style(
  inComponentsLayer({
    opacity: 1,
    objectFit: 'cover',
    objectPosition: 'center center',
  }),
);

export const sectionHeroButtonStyle = style(
  inComponentsLayer({
    position: 'relative',
    zIndex: zIndex['10'],
    // Sits on the hero photo, so the pill must stay a light surface in both
    // themes (the light theme's background/foreground values); the themed
    // tokens would camouflage it near-black on the photo in dark mode.
    backgroundColor: 'oklch(98.96% 0.002 17.19)',
    color: 'oklch(15.53% 0.050 25.04)',
    borderRadius: border.radius.large,
    marginTop: spacing[8],
    padding: `${spacing[4]} ${spacing[8]}`,
    textDecoration: 'none',
    fontSize: font.size.xl,
    fontWeight: font.weight.medium,
    lineHeight: font.lineHeight.normal,
    textAlign: 'center',
    transition: transition.duration.faster,
    transitionProperty: 'transform',
    transitionTimingFunction: transition.easing.easeInOut,

    selectors: {
      '&:hover': {
        color: color.accent,
        transform: 'translateY(-2px)',
      },
      '&:after': {
        display: 'none',
      },
    },
  }),
);

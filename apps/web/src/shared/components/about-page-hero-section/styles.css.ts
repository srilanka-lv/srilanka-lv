import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { font, spacing, zIndex } = vars;

export const aboutPageHeroSectionStyle = style(
  inComponentsLayer({
    position: 'relative',
    width: '100svw',
    left: '50%',
    right: '50%',
    marginLeft: '-50svw',
    marginRight: '-50svw',
    marginTop: spacing[4],
    height: '70svh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflow: 'hidden',

    selectors: {
      // Theme-independent black scrim so the whitesmoke text stays legible on
      // the photo in both themes (see DESIGN.md, "text over photos").
      '&::after': {
        content: '',
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.625) 10%, rgba(255, 255, 255, 0) 75%)',
        zIndex: 1,
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        height: '85svh',
      },
    },
  }),
);

export const aboutPageHeroImageStyle = style(
  inComponentsLayer({
    objectFit: 'cover',
    objectPosition: 'center center',
  }),
);

export const aboutPageHeroContentStyle = style(
  inComponentsLayer({
    position: 'relative',
    zIndex: zIndex['10'],
    width: '100%',
    maxWidth: breakpoints.md,
    margin: '0 auto',
    padding: `0 ${spacing[6]} ${spacing[10]}`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        padding: `0 ${spacing[6]} ${spacing[16]}`,
      },
    },
  }),
);

export const aboutPageHeroTitleStyle = style(
  inComponentsLayer({
    color: 'whitesmoke',
    mixBlendMode: 'luminosity',
    fontSize: font.size['5xl'],
    fontWeight: font.weight.bold,
    lineHeight: font.lineHeight.tight,
    margin: 0,

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        fontSize: font.size['7xl'],
      },
    },
  }),
);

export const aboutPageHeroLedeStyle = style(
  inComponentsLayer({
    color: 'whitesmoke',
    mixBlendMode: 'luminosity',
    fontSize: font.size.lg,
    fontWeight: font.weight.light,
    lineHeight: font.lineHeight.normal,
    textWrap: 'balance',
    maxWidth: '42ch',
    margin: 0,

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        fontSize: font.size['2xl'],
      },
    },
  }),
);

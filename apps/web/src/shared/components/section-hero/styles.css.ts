import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { color, spacing, font, zIndex } = vars;

export const sectionHeroStyle = style({
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
  marginTop: '-90px',
  marginRight: '-50svw',
  marginBottom: 0,
  marginLeft: '-50svw',
  overflow: 'hidden',
  backgroundColor: color.foreground,

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
      marginTop: `-90px`,
      height: 'calc(100svh - 45px)',
      minHeight: breakpoints.md,
    },
  },
});

export const sectionHeroTitleStyle = style({
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
});

export const sectionHeroSubtitleStyle = style({
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
});

export const sectionHeroImageStyle = style({
  opacity: 1,
  objectFit: 'cover',
  objectPosition: 'center center',
});

export const sectionHeroCoverImageEffectStyles = styleVariants({
  top: [
    {
      top: '90px',
    },
  ],
  bottom: [
    {
      bottom: '-1px',
    },
  ],
});

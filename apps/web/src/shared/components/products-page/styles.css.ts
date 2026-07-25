import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { darkThemeSelector } from '@/shared/styles/themes/theme.dark.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { breakpoint, color, spacing, font, border, focus, zIndex } = vars;

export const productStyle = style({
  position: 'relative',
  maxWidth: breakpoint.lg,
  marginTop: spacing[12],
  marginRight: 'auto',
  marginBottom: spacing[12],
  marginLeft: 'auto',
  paddingTop: spacing[8],
  paddingRight: spacing[8],
  paddingBottom: `calc(${spacing[64]} + ${spacing[24]})`,
  paddingLeft: spacing[8],
  borderRadius: border.radius.large,

  // Each product keeps its identity hue in both themes: the light pastels
  // below, and dark panels at elevation-ladder lightness with the same hue.
  selectors: {
    '&:nth-of-type(1)': {
      backgroundColor: `#faf4f5`,
    },
    '&:nth-of-type(2)': {
      backgroundColor: '#f4f9f4',
    },
    '&:nth-of-type(3)': {
      backgroundColor: '#f0f3f7',
    },
    [`${darkThemeSelector} &:nth-of-type(1)`]: {
      backgroundColor: 'oklch(21% 0.012 5.6)',
    },
    [`${darkThemeSelector} &:nth-of-type(2)`]: {
      backgroundColor: 'oklch(21% 0.012 145.5)',
    },
    [`${darkThemeSelector} &:nth-of-type(3)`]: {
      backgroundColor: 'oklch(21% 0.012 255.5)',
    },
  },

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      marginTop: spacing[24],
      // 2rem: collapses with the next panel's 6rem margin-top (so panels stay
      // 6rem apart) while the last panel sits 2rem + the footer's 4rem = the
      // site-wide 6rem above the footer's first heading.
      marginBottom: spacing[8],
      paddingRight: spacing[64],
      paddingBottom: spacing[8],
    },
    [`screen and (min-width: ${breakpoints.xl})`]: {
      paddingRight: `calc(${spacing[64]} + ${spacing[24]})`,
    },
  },
});

export const productSubTitleStyle = style({
  color: '#9fb3a1',
  fontSize: font.size.xs,
  fontWeight: font.weight.semibold,
  lineHeight: font.lineHeight.tight,
  marginTop: spacing[2],
  marginRight: 'auto',
  marginBottom: '0',
  marginLeft: 'auto',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#9fb3a1',
  borderRadius: border.radius.large,
  padding: `${spacing[1]} ${spacing[2]}`,
  whiteSpace: 'nowrap',
});

export const productTitleStyle = style({
  color: color.foreground,
  fontSize: font.size['3xl'],
  fontWeight: font.weight.bold,
  lineHeight: font.lineHeight.tight,
  marginTop: spacing[6],
  marginRight: 'auto',
  marginBottom: '0',
  marginLeft: 'auto',
  textWrap: 'balance',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size['4xl'],
    },
  },
});

export const productDescriptionStyle = style({
  fontSize: font.size.base,
  color: color.foreground,
  marginTop: spacing[2],
  textWrap: 'balance',

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: font.size.lg,
    },
  },
});

export const productLinkStyle = style({
  display: 'inline-block',
  marginTop: spacing[2],
  padding: `${spacing[1]} ${spacing[1]}`,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  fontSize: font.size.lg,
  zIndex: zIndex['10'],

  selectors: {
    '&:link, &:visited': {
      color: color.accent,
      fontWeight: font.weight.semibold,
    },
    // Follows the global link treatment: when the coral bar fills on
    // hover/focus, the text flips to the background ink. Pinning accent here
    // rendered coral-on-coral once the bar was solid.
    '&:hover, &:active': {
      color: color.background,
    },
    '&:focus-visible': {
      color: color.background,
      outlineOffset: spacing[1],
      outlineStyle: 'solid',
      outlineWidth: focus.width,
      outlineColor: focus.color,
      borderRadius: border.radius.small,
    },
  },
});

export const productImageWrapperStyle = style({
  position: 'absolute',
  right: 0,
  bottom: 0,
  width: '340px',
  height: '320px',
  borderBottomRightRadius: border.radius.large,
  overflow: 'hidden',
  zIndex: 0,
});

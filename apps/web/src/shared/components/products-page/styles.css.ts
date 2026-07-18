import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
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
  },

  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      marginTop: spacing[24],
      marginBottom: spacing[24],
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
    '&:link, &:visited, &:hover, &:active': {
      color: color.accent,
      fontWeight: font.weight.semibold,
    },
    '&:focus-visible': {
      color: color.foreground,
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

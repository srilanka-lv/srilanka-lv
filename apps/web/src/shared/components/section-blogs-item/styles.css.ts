import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { color, spacing, border, font, transition, zIndex } = vars;

export const sectionBlogsItemStyle = style({
  borderRadius: border.radius.large,
  overflow: 'hidden',
  transition: transition.duration.fast,
  transitionProperty: 'transform',
  transitionTimingFunction: transition.easing.easeInOut,

  selectors: {
    '&:hover': {
      transform: `scale(1.05) translateY(${spacing[-2]})`,
    },
  },
});

export const sectionBlogsItemImageStyle = style({
  objectFit: 'cover',
  objectPosition: 'center',
  zIndex: zIndex['-10'],
  transition: transition.duration.faster,
  transitionProperty: 'transform',
  transitionTimingFunction: transition.easing.easeInOut,
});

export const sectionBlogsItemLinkStyle = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  transition: transition.duration.normal,
  transitionProperty: 'transform',
  transitionTimingFunction: transition.easing.easeInOut,

  selectors: {
    '&:link, &:visited, &:hover, &:active': {
      color: color.foreground,
    },
    '&:hover': {
      transform: 'scale(1.0125)',
    },
    '&::after': {
      content: '',
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      background: `linear-gradient(0deg,rgba(0, 0, 0, .75) 0%, rgba(255, 255, 255, 0) 100%)`,
      zIndex: zIndex['-10'],
    },
  },
});

export const sectionBlogsItemHeadingStyle = style({
  color: color.background,
  fontSize: font.size['3xl'],
  fontWeight: font.weight.medium,
  padding: `${spacing[40]} ${spacing[6]} 0 ${spacing[6]}`,
  margin: 0,

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      fontSize: font.size['3xl'],
      paddingTop: spacing[56],
    },
  },
});

export const sectionBlogsItemLinkTextStyle = style({
  padding: `${spacing[2]} ${spacing[6]} ${spacing[4]} ${spacing[6]}`,
  color: color.background,
  fontSize: font.size.lg,
});

import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const blogHeroAuthorStyle = style({
  color: 'inherit',
  fontSize: vars.font.size.xl,
  textShadow: `0 ${vars.spacing[8]} ${vars.spacing[8]} rgba(0, 0, 0, 0.0625)`,
  padding: 0,
  margin: 0,
  zIndex: vars.zIndex['10'],

  '@media': {
    [`screen and (min-width: ${breakpoints.xs})`]: {
      fontSize: vars.font.size.xl,
    },
    [`screen and (min-width: ${breakpoints.md})`]: {
      fontSize: vars.font.size['3xl'],
    },
  },
});

export const blogHeroAuthorLinkStyle = style({
  position: 'relative',
  fontWeight: vars.font.weight.bold,
  fontSize: 'inherit',

  selectors: {
    '&:link, &:visited, &:hover, &:active': {
      color: `inherit !important`,
    },
    '&:link::after, &:visited::after, &:active::after': {
      mixBlendMode: 'exclusion',
      position: 'absolute',
      display: 'block',
      content: '',
      backgroundColor: vars.color.background,
      left: vars.spacing[-1],
      bottom: vars.spacing[-1],
      width: `calc(100% + ${vars.spacing[2]})`,
      height: vars.spacing[1],
      zIndex: '1',
      transitionTimingFunction: vars.transition.easing.easeInOut,
      transitionDuration: vars.transition.duration.faster,
      transitionProperty: 'height, bottom',
    },
    '&:hover::after': {
      height: `calc(100% + ${vars.spacing[2]})`,
    },
  },
});

export const blogHeroAuthorPublishedAtStyle = style({
  fontSize: 'inherit',
  fontStyle: 'italic',
});

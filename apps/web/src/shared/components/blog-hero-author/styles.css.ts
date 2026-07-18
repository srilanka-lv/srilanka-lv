import { style } from '@vanilla-extract/css';

import { inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { color, font, spacing, zIndex, transition } = vars;

export const blogHeroAuthorStyle = style(
  inOverridesLayer({
    color: 'inherit',
    fontSize: font.size.xl,
    textShadow: `0 ${spacing[8]} ${spacing[8]} rgba(0, 0, 0, 0.0625)`,
    padding: 0,
    margin: 0,
    zIndex: zIndex['10'],

    '@media': {
      [`screen and (min-width: ${breakpoints.xs})`]: {
        fontSize: font.size.xl,
      },
      [`screen and (min-width: ${breakpoints.md})`]: {
        fontSize: font.size['3xl'],
      },
    },
  }),
);

export const blogHeroAuthorLinkStyle = style(
  inOverridesLayer({
    position: 'relative',
    fontWeight: font.weight.bold,
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
        backgroundColor: color.background,
        left: spacing[-1],
        bottom: spacing[-1],
        width: `calc(100% + ${spacing[2]})`,
        height: spacing[1],
        zIndex: '1',
        transitionTimingFunction: transition.easing.easeInOut,
        transitionDuration: transition.duration.faster,
        transitionProperty: 'height, bottom',
      },
      '&:hover::after': {
        height: `calc(100% + ${spacing[2]})`,
      },
    },
  }),
);

export const blogHeroAuthorPublishedAtStyle = style(
  inOverridesLayer({
    fontSize: 'inherit',
    fontStyle: 'italic',
  }),
);

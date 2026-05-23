import { style } from '@vanilla-extract/css';

import { inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { color, spacing, border, font, transition, zIndex } = vars;

export const sectionBlogsItemStyle = style(
  inOverridesLayer({
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
  }),
);

export const sectionBlogsItemImageStyle = style(
  inOverridesLayer({
    objectFit: 'cover',
    objectPosition: 'center',
    zIndex: zIndex['-10'],
    transition: transition.duration.faster,
    transitionProperty: 'transform',
    transitionTimingFunction: transition.easing.easeInOut,
  }),
);

export const sectionBlogsItemLinkStyle = style(
  inOverridesLayer({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
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
        background: `linear-gradient(#fff0 0%, #00000050 100%)`,
        zIndex: zIndex['-10'],
      },
    },
  }),
);

export const sectionBlogsItemHeadingStyle = style(
  inOverridesLayer({
    color: 'whitesmoke',
    mixBlendMode: 'luminosity',
    fontSize: font.size['2xl'],
    fontWeight: font.weight.medium,
    lineHeight: font.lineHeight.snug,
    textWrap: 'balance',
    padding: `0 ${spacing[6]}`,
    margin: `25svh 0 0 0`,

    '@media': {
      [`screen and (min-width: ${breakpoints.lg})`]: {
        fontSize: font.size['3xl'],
        marginTop: spacing[8],
        paddingTop: spacing[8],
      },
      [`screen and (min-width: ${breakpoints.xxl})`]: {
        marginTop: spacing[32],
      },
    },
  }),
);

export const sectionBlogsItemLinkTextStyle = style(
  inOverridesLayer({
    color: 'whitesmoke',
    fontSize: font.size.base,
    mixBlendMode: 'luminosity',
    whiteSpace: 'nowrap',
    padding: `${spacing[4]} ${spacing[6]} ${spacing[4]} ${spacing[6]}`,
  }),
);

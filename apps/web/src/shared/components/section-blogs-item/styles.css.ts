import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { color, spacing, border, shadow, font, transition } = vars;

export const sectionBlogsItemStyle = style({
  backgroundColor: 'white',
  borderRadius: border.radius.large,
  boxShadow: shadow.medium,
});

export const sectionBlogsItemImageStyle = style({
  width: '100%',
  height: 'auto',
  borderTopLeftRadius: border.radius.large,
  borderTopRightRadius: border.radius.large,
});

export const sectionBlogsItemLinkStyle = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',

  selectors: {
    '&:link, &:visited, &:hover, &:active': {
      color: color.foreground,
      textDecoration: 'none',
    },
  },
});

export const sectionBlogsItemHeadingStyle = style({
  fontSize: font.size['2xl'],
  padding: `${spacing[6]} ${spacing[6]} 0 ${spacing[6]}`,
  margin: 0,

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      fontSize: font.size['3xl'],
    },
  },
});

const bounceKeyframes = keyframes({
  '0%, 100%': {
    transform: 'translateX(0)',
    animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
  },
  '50%': {
    transform: 'translateX(25px)',
    animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
  },
});

export const sectionBlogsItemLinkTextStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[3],
  padding: spacing[6],
  margin: 0,
  marginTop: 'auto',
  color: color.accent,
  fontSize: font.size.lg,
});

globalStyle(`${sectionBlogsItemLinkTextStyle} svg, ${sectionBlogsItemLinkTextStyle} svg`, {
  transformOrigin: 'center',
});

globalStyle(
  `${sectionBlogsItemLinkTextStyle}:hover svg, ${sectionBlogsItemLinkTextStyle}:focus-visible svg`,
  {
    animationName: bounceKeyframes,
    animationDuration: transition.duration.normal,
    animationTimingFunction: transition.easing.easeInOut,
    animationIterationCount: 'infinite',
  },
);

import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, border, shadow } = vars;

export const sectionBlogsItemStyle = style({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  backgroundColor: 'white',
  borderRadius: border.radius.large,
  overflow: 'hidden',
  boxShadow: shadow.medium,
});

globalStyle(`${sectionBlogsItemStyle} > h6`, {
  padding: `${spacing[6]} ${spacing[6]} 0 ${spacing[6]}`,
  margin: 0,
});

export const sectionBlogsItemImageStyle = style({
  width: '100%',
  height: 'auto',
});

export const sectionBlogsItemLinkStyle = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: spacing[3],
  marginTop: 'auto',
  marginLeft: spacing[4],
  marginRight: spacing[4],
  marginBottom: spacing[4],
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  gap: spacing[3],

  selectors: {
    '&:link, &:visited, &:hover, &:active': {
      color: vars.color.accent,
      fontSize: vars.font.size.lg,
      fontWeight: vars.font.weight.medium,
      lineHeight: vars.font.lineHeight.none,
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

globalStyle(`${sectionBlogsItemLinkStyle} svg, ${sectionBlogsItemLinkStyle} svg`, {
  transitionProperty: 'transform',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.easeInOut,
  transformOrigin: 'center bottom',
  animationFillMode: 'forwards',
});

globalStyle(
  `${sectionBlogsItemLinkStyle}:hover svg, ${sectionBlogsItemLinkStyle}:focus-visible svg`,
  {
    animation: `${bounceKeyframes} 0.6s infinite`,
  },
);

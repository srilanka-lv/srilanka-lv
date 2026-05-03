import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

export const blogPageLayoutStyle = style({
  display: 'grid',
  gridTemplateRows: 'calc(75svh - 90px) 1fr',
  gridTemplateColumns: 'minmax(0, 1fr)',
  rowGap: vars.spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 368px)',
      columnGap: vars.spacing[16],
      rowGap: 'initial',
      gridTemplateRows: 'calc(100svh - 72px) 1fr',
    },
    [`screen and (min-width: ${breakpoints.xxl})`]: {
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 468px)',
    },
  },
});

export const blogPageLayoutArticleStyle = style({
  gridColumn: 'span 2',

  '@media': {
    [`screen and (min-width: ${breakpoints.xl})`]: {
      gridColumn: 'initial',
    },
  },
});

globalStyle(
  `${blogPageLayoutArticleStyle} a:link, ${blogPageLayoutArticleStyle} a:visited, ${blogPageLayoutArticleStyle} a:hover, ${blogPageLayoutArticleStyle} a:active`,
  {
    outline: 'none',
    position: 'relative',
    color: '#ee5253',
    textDecoration: 'none',
    transitionTimingFunction: vars.transition.easing.easeInOut,
    transitionDuration: vars.transition.duration.faster,
    transitionProperty: 'color',
  },
);

globalStyle(
  `${blogPageLayoutArticleStyle} a:hover, ${blogPageLayoutArticleStyle} a:focus-visible`,
  {
    color: vars.color.background,
  },
);

globalStyle(
  `${blogPageLayoutArticleStyle} a:link::after, ${blogPageLayoutArticleStyle} a:visited::after, ${blogPageLayoutArticleStyle} a:active::after`,
  {
    mixBlendMode: 'color-dodge',
    position: 'absolute',
    display: 'block',
    content: '',
    backgroundColor: '#ee5253',
    left: vars.spacing[-1],
    bottom: '0',
    width: `calc(100% + ${vars.spacing[2]})`,
    height: vars.spacing[1],
    zIndex: '1',
    transitionTimingFunction: vars.transition.easing.easeInOut,
    transitionDuration: vars.transition.duration.faster,
    transitionProperty: 'height',
  },
);

globalStyle(
  `${blogPageLayoutArticleStyle} a:hover::after, ${blogPageLayoutArticleStyle} a:focus-visible::after`,
  {
    height: `calc(100%)`,
  },
);

export const blogPageLayoutAsideStyle = style({
  gridColumn: 'span 2',

  '@media': {
    [`screen and (min-width: ${breakpoints.xl})`]: {
      gridColumn: 'initial',
    },
  },
});

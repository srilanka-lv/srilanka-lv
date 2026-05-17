import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { color, spacing, transition } = vars;

export const blogPageLayoutStyle = style({
  display: 'grid',
  gridTemplateRows: 'calc(75svh - 90px) 1fr',
  gridTemplateColumns: 'minmax(0, 1fr)',
  rowGap: spacing[4],

  '@media': {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 368px)',
      columnGap: spacing[16],
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
  paddingTop: spacing[6],

  '@media': {
    [`screen and (min-width: ${breakpoints.xl})`]: {
      gridColumn: 'initial',
      paddingTop: 'initial',
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
    transitionTimingFunction: transition.easing.easeInOut,
    transitionDuration: transition.duration.faster,
    transitionProperty: 'color',
  },
);

globalStyle(
  `${blogPageLayoutArticleStyle} a:hover, ${blogPageLayoutArticleStyle} a:focus-visible`,
  {
    color: color.background,
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
    left: spacing[-1],
    bottom: '0',
    width: `calc(100% + ${spacing[2]})`,
    height: spacing[1],
    zIndex: '1',
    transitionTimingFunction: transition.easing.easeInOut,
    transitionDuration: transition.duration.faster,
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

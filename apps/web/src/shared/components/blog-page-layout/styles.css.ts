import { globalStyle, style } from '@vanilla-extract/css';

import { inComponentsLayer, inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { color, spacing, transition } = vars;

export const blogPageLayoutStyle = style(
  inComponentsLayer({
    display: 'grid',
    gridTemplateRows: 'calc(75svh - 90px) 1fr',
    gridTemplateColumns: 'minmax(0, 1fr)',
    rowGap: spacing[4],

    '@media': {
      [`screen and (min-width: ${breakpoints.lg})`]: {
        gridTemplateColumns: 'minmax(0, 1fr)',
        gridTemplateRows: 'calc(100svh - 72px) 1fr',
      },
    },
  }),
);

export const blogPageLayoutArticleStyle = style(
  inComponentsLayer({
    paddingTop: spacing[6],
    paddingBottom: spacing[6],

    '@media': {
      [`screen and (min-width: ${breakpoints.xl})`]: {
        paddingTop: spacing[12],
        paddingBottom: spacing[12],
        maxWidth: breakpoints.sm,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  }),
);

globalStyle(
  `${blogPageLayoutArticleStyle} a:link, ${blogPageLayoutArticleStyle} a:visited, ${blogPageLayoutArticleStyle} a:hover, ${blogPageLayoutArticleStyle} a:active`,
  inComponentsLayer({
    outline: 'none',
    position: 'relative',
    color: '#ee5253',
    textDecoration: 'none',
    transitionTimingFunction: transition.easing.easeInOut,
    transitionDuration: transition.duration.faster,
    transitionProperty: 'color',
  }),
);

globalStyle(
  `${blogPageLayoutArticleStyle} a:hover, ${blogPageLayoutArticleStyle} a:focus-visible`,
  inComponentsLayer({
    color: color.background,
  }),
);

globalStyle(
  `${blogPageLayoutArticleStyle} a:link::after, ${blogPageLayoutArticleStyle} a:visited::after, ${blogPageLayoutArticleStyle} a:active::after`,
  inComponentsLayer({
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
  }),
);

globalStyle(
  `${blogPageLayoutArticleStyle} a:hover::after, ${blogPageLayoutArticleStyle} a:focus-visible::after`,
  inComponentsLayer({
    height: `calc(100%)`,
  }),
);

globalStyle(
  `${blogPageLayoutArticleStyle} > :last-child::after`,
  inOverridesLayer({
    display: 'none',
  }),
);

export const blogPageLayoutAsideStyle = style(
  inComponentsLayer({
    paddingTop: 'initial',
    maxWidth: breakpoints.sm,
    marginLeft: 'auto',
    marginRight: 'auto',
  }),
);

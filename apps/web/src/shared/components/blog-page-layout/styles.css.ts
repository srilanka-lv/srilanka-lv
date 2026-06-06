import { globalStyle, style } from '@vanilla-extract/css';

import { inComponentsLayer, inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing } = vars;

export const blogPageLayoutStyle = style(
  inComponentsLayer({
    display: 'grid',
    gridTemplateRows: 'calc(100svh - 68px) 1fr',
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
      [`screen and (min-width: ${breakpoints.md})`]: {
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
  `${blogPageLayoutArticleStyle} > :last-child::after`,
  inOverridesLayer({
    display: 'none',
  }),
);

export const blogPageLayoutAsideStyle = style(
  inComponentsLayer({
    paddingTop: 'initial',
    paddingBottom: spacing[8],
    maxWidth: breakpoints.sm,
    marginLeft: 'auto',
    marginRight: 'auto',
  }),
);

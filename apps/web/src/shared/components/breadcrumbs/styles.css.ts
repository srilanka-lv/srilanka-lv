import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color } = vars;

export const breadcrumbsNavStyle = style(
  inComponentsLayer({
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
  }),
);

export const breadcrumbsListStyle = style(
  inComponentsLayer({
    display: 'flex',
    alignItems: 'center',
    gap: spacing[1],
    margin: 0,
    padding: 0,
    listStyle: 'none',
    fontSize: font.size.sm,
    color: color.foreground,
    whiteSpace: 'nowrap',
    overflowX: 'auto',

    '@media': {
      [`screen and (min-width: ${breakpoints.lg})`]: {
        gap: spacing[2],
      },
    },
  }),
);

export const breadcrumbsItemStyle = style(
  inComponentsLayer({
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1],

    selectors: {
      '&:not(:last-child)::after': {
        content: '"›"',
        display: 'inline-block',
        opacity: 0.6,
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.lg})`]: {
        gap: spacing[2],
      },
    },
  }),
);

export const breadcrumbsLinkStyle = style(
  inComponentsLayer({
    selectors: {
      '&:link, &:visited': {
        color: color.foreground,
        opacity: 1,
      },
      '&:hover, &:active, &:focus-visible': {
        color: color.background,
        opacity: 1,
      },
    },
  }),
);

export const breadcrumbsCurrentStyle = style(
  inComponentsLayer({
    fontWeight: font.weight.semibold,
  }),
);

import { style } from '@vanilla-extract/css';

import { inComponentsLayer, inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font, color, focus, border } = vars;

export const breadcrumbsNavStyle = style(
  inComponentsLayer({
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
  }),
);

export const breadcrumbsListStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing[2],
    margin: 0,
    padding: 0,
    listStyle: 'none',
    fontSize: font.size.sm,
    color: color.foreground,
  }),
);

export const breadcrumbsItemStyle = style(
  inComponentsLayer({
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],

    selectors: {
      '&:not(:last-child)::after': {
        content: '"›"',
        display: 'inline-block',
        opacity: 0.6,
      },
    },
  }),
);

export const breadcrumbsLinkStyle = style(
  inOverridesLayer({
    selectors: {
      '&:link, &:visited': {
        color: color.foreground,
        textDecoration: 'underline',
        textUnderlineOffset: '0.25em',
        opacity: 0.7,
      },
      '&:hover, &:active': {
        opacity: 1,
      },
      '&:focus-visible': {
        outlineOffset: spacing[1],
        outlineStyle: 'solid',
        outlineWidth: focus.width,
        outlineColor: focus.color,
        borderRadius: border.radius.small,
      },
    },
  }),
);

export const breadcrumbsCurrentStyle = style(
  inComponentsLayer({
    fontWeight: font.weight.semibold,
  }),
);

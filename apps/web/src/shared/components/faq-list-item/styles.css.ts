import { style } from '@vanilla-extract/css';

import { inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color, border, focus } = vars;

export const sectionFaqsItemStyle = style(
  inOverridesLayer({
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'center',
    placeContent: 'center',
    padding: `${spacing[10]} ${spacing[6]} ${spacing[6]} ${spacing[6]}`,
    gap: spacing[2],
    borderRadius: border.radius.large,
    color: color.primary,
    backgroundColor: `color-mix(in oklch, ${color.accent} 5%, transparent)`,
  }),
);

export const sectionFaqsItemTitleStyle = style(
  inOverridesLayer({
    fontSize: font.size.lg,
    fontWeight: font.weight.semibold,
    textAlign: 'center',
    textWrap: 'balance',
    marginBottom: spacing[2],
  }),
);

export const sectionFaqsItemLinkStyle = style(
  inOverridesLayer({
    display: 'block',
    marginTop: 'auto',
    padding: `${spacing[1]} ${spacing[2]}`,
    textDecoration: 'none',
    whiteSpace: 'nowrap',

    selectors: {
      '&:link, &:visited, &:hover, &:active': {
        fontWeight: font.weight.semibold,
        color: color.accent,
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

export const sectionFaqsItemAnswerStyle = style(
  inOverridesLayer({
    fontSize: font.size.base,
    textAlign: 'center',
    textWrap: 'balance',

    '@media': {
      [`screen and (min-width: ${breakpoints.xxl})`]: {
        marginBottom: spacing[4],
      },
    },
  }),
);

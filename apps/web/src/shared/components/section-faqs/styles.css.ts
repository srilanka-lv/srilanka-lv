import { style } from '@vanilla-extract/css';

import { inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color } = vars;

export const sectionFaqsStyle = style(
  inOverridesLayer({
    display: 'flex',
    flexDirection: 'column',

    '@media': {
      [`screen and (min-width: ${breakpoints.xxl})`]: {
        position: 'relative',
        width: '100svw',
        left: '50%',
        right: '50%',
        marginLeft: '-50svw',
        marginRight: '-50svw',
        paddingLeft: spacing[40],
        paddingRight: spacing[40],
      },
    },
  }),
);

export const sectionFaqsTitleStyle = style(
  inOverridesLayer({
    fontSize: font.size['2xl'],
    lineHeight: font.lineHeight.relaxed,
    textAlign: 'center',
    marginTop: spacing[12],

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        fontSize: font.size['4xl'],
      },
      [`screen and (min-width: ${breakpoints.xl})`]: {
        marginTop: spacing[16],
      },
      [`screen and (min-width: ${breakpoints.xxl})`]: {
        marginTop: spacing[24],
      },
    },
  }),
);

export const sectionFaqsContentStyle = style(
  inOverridesLayer({
    display: 'grid',
    gridTemplateRows: 'repeat(2, 1fr)',
    gridTemplateColumns: '1fr',
    gap: spacing[6],

    '@media': {
      [`screen and (min-width: ${breakpoints.sm})`]: {
        gridTemplateColumns: '1fr 1fr',
      },
      [`screen and (min-width: ${breakpoints.xl})`]: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
      },
    },
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
      '&:hover, &:focus-visible': {
        color: color.background,
      },
    },
  }),
);

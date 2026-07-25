import { style } from '@vanilla-extract/css';

import { inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color } = vars;

// No full-bleed breakout: the section fills the layout container so it
// aligns with the blogs grid, products, and footer at every viewport width.
export const sectionFaqsStyle = style(
  inOverridesLayer({
    display: 'flex',
    flexDirection: 'column',
  }),
);

export const sectionFaqsTitleStyle = style(
  inOverridesLayer({
    fontSize: font.size['2xl'],
    lineHeight: font.lineHeight.relaxed,
    textAlign: 'center',
    marginTop: spacing[12],

    // md+ shares one section rhythm with the blogs section: 6rem above the
    // heading, 3rem from heading to content (the base leaves the browser's
    // default heading margin-bottom in place, matching mobile as it was).
    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        fontSize: font.size['4xl'],
        marginTop: spacing[24],
        marginBottom: spacing[12],
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

import { style } from '@vanilla-extract/css';

import { inComponentsLayer, inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font } = vars;

export const faqListTitleStyle = style(
  inComponentsLayer({
    fontSize: font.size['4xl'],
    fontWeight: font.weight.semibold,
    lineHeight: font.lineHeight.tight,
    marginTop: 0,
    marginBottom: spacing[8],

    // No margin-top: the article column's own closing space (padding, grid
    // gap, last-paragraph margin) already adds up to one section break.
    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        marginTop: 0,
        marginBottom: spacing[12],
      },
    },
  }),
);

export const faqListStyle = style(
  inComponentsLayer({
    position: 'relative',
    gap: spacing[6],
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: '1fr',

    '@media': {
      [`screen and (min-width: ${breakpoints.sm})`]: {
        gridTemplateColumns: '1fr 1fr',
      },
      // No full-bleed breakout: the list fills the layout container (via the
      // article aside) so it aligns with the other container-width sections.
      // No bottom padding: the aside's 2rem + the footer's 4rem top padding
      // make the site-wide 6rem seam to the footer's first heading.
      [`screen and (min-width: ${breakpoints.md})`]: {
        gridTemplateColumns: '1fr',
      },
      [`screen and (min-width: ${breakpoints.xl})`]: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
      },
    },
  }),
);

export const faqListItemStyle = style(
  inOverridesLayer({
    placeContent: 'flex-start',
  }),
);

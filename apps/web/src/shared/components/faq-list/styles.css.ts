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
    marginTop: spacing[24],
    marginBottom: spacing[12],
  }),
);

export const faqListStyle = style(
  inComponentsLayer({
    position: 'relative',
    width: '100svw',
    left: '50%',
    right: '50%',
    marginLeft: '-50svw',
    marginRight: '-50svw',
    paddingBottom: spacing[10],
    paddingLeft: spacing[40],
    paddingRight: spacing[40],
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: '1fr',
    gap: spacing[6],
    textWrap: 'balance',

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

export const faqListItemStyle = style(
  inOverridesLayer({
    placeContent: 'flex-start',
  }),
);

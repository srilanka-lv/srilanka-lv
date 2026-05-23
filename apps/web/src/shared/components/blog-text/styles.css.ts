import { globalStyle, style } from '@vanilla-extract/css';

import { inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { font, spacing, color } = vars;

export const blogParagraphStyle = style(
  inOverridesLayer({
    marginBlock: spacing[6],
    fontSize: font.size.xl,
    lineHeight: font.lineHeight.normal,
    textWrap: 'balance',

    selectors: {
      '&:first-of-type': {
        marginTop: 0,
      },
      '&:last-of-type': {
        marginBottom: 0,
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.lg})`]: {
        fontSize: font.size.xl,
      },
    },
  }),
);

export const blogHeadingStyle = style(
  inOverridesLayer({
    marginBlock: spacing[4],
    marginTop: spacing[12],
    fontSize: font.size['4xl'],
    fontWeight: font.weight.semibold,
    lineHeight: font.lineHeight.tight,
  }),
);

export const blogBlockquoteStyle = style(
  inOverridesLayer({
    marginBlock: spacing[4],
    marginTop: spacing[12],
    paddingLeft: spacing[4],
    borderLeft: `4px solid ${color.primaryForeground}`,
    fontStyle: 'italic',
  }),
);

export const blogListStyle = style(
  inOverridesLayer({
    marginBlock: spacing[4],
    paddingLeft: spacing[4],
    fontSize: font.size.xl,
    lineHeight: font.lineHeight.relaxed,

    '@media': {
      [`screen and (min-width: ${breakpoints.lg})`]: {
        fontSize: font.size.xl,
      },
    },
  }),
);

globalStyle(
  `${blogListStyle} li`,
  inOverridesLayer({
    marginBlock: spacing[2],
  }),
);

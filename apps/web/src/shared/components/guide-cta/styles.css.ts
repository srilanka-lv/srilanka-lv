import { globalStyle, style } from '@vanilla-extract/css';

import { inComponentsLayer, inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { border, color, font, spacing } = vars;

/**
 * The offer stands on the same coral-tinted panel as the product cards, the
 * PDF block and the personal callouts, with Grieta's portrait beside it: an
 * offer from her, in her voice, not a banner.
 */
export const ctaStyle = style(
  inComponentsLayer({
    display: 'grid',
    gridTemplateColumns: `${spacing[12]} minmax(0, 1fr)`,
    columnGap: spacing[4],
    alignItems: 'start',
    marginBlock: spacing[10],
    paddingBlock: spacing[6],
    paddingInline: spacing[6],
    border: `1px solid color-mix(in oklch, ${color.primary} 12%, transparent)`,
    borderRadius: border.radius.large,
    backgroundColor: `color-mix(in oklch, ${color.accent} 8%, ${color.background})`,

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        gridTemplateColumns: `${spacing[16]} minmax(0, 1fr)`,
        columnGap: spacing[6],
        paddingBlock: spacing[8],
        paddingInline: spacing[8],
      },
    },
  }),
);

export const portraitStyle = style(
  inComponentsLayer({
    display: 'block',
    width: spacing[12],
    height: spacing[12],
    borderRadius: '50%',
    objectFit: 'cover',
    border: `2px solid ${color.background}`,

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        width: spacing[16],
        height: spacing[16],
      },
    },
  }),
);

export const bodyStyle = style(
  inComponentsLayer({
    minWidth: 0,
  }),
);

// The guide layout styles `<article> h3` with a descendant selector in the
// overrides layer; two classes outrank it so the offer's title keeps the
// panel's rhythm instead of the article's.
export const headingStyle = style(
  inOverridesLayer({
    selectors: {
      [`${ctaStyle} &`]: {
        marginTop: 0,
        marginBottom: spacing[2],
        fontSize: font.size.xl,
        fontWeight: font.weight.bold,
        lineHeight: font.lineHeight.tight,
        textWrap: 'balance',
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        selectors: {
          [`${ctaStyle} &`]: {
            fontSize: font.size['2xl'],
          },
        },
      },
    },
  }),
);

export const textStyle = style(
  inComponentsLayer({
    margin: 0,
    marginBottom: spacing[5],
    fontSize: font.size.base,
    lineHeight: font.lineHeight.relaxed,

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        fontSize: font.size.lg,
      },
    },
  }),
);

export const actionsStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing[3],

    '@media': {
      [`screen and (min-width: ${breakpoints.sm})`]: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[5],
      },
    },
  }),
);

globalStyle(
  `${ctaStyle} ${textStyle}`,
  inOverridesLayer({
    marginTop: 0,
  }),
);

import { globalStyle, style } from '@vanilla-extract/css';

import { inComponentsLayer, inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { color, font, spacing } = vars;

/**
 * Other travellers' voices. Same grammar as a personal callout (round
 * portrait, coral uppercase name, the words) but on the page ground with
 * hairlines between them: the coral-tinted panel stays Grieta's alone, so
 * these read as people talking, not as her.
 */
export const listStyle = style(
  inComponentsLayer({
    listStyle: 'none',
    margin: 0,
    marginBlock: spacing[6],
    padding: 0,
  }),
);

export const itemStyle = style(
  inComponentsLayer({
    display: 'grid',
    gridTemplateColumns: `${spacing[12]} minmax(0, 1fr)`,
    columnGap: spacing[4],
    alignItems: 'start',
    paddingBlock: spacing[6],
    borderTop: `1px solid color-mix(in oklch, ${color.primary} 10%, transparent)`,

    selectors: {
      '&:last-child': {
        borderBottom: `1px solid color-mix(in oklch, ${color.primary} 10%, transparent)`,
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        gridTemplateColumns: `${spacing[16]} minmax(0, 1fr)`,
        columnGap: spacing[6],
        paddingBlock: spacing[8],
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

export const figureStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
    margin: 0,
    minWidth: 0,
  }),
);

export const nameStyle = style(
  inComponentsLayer({
    order: -1,
    fontSize: font.size.xs,
    fontWeight: font.weight.semibold,
    letterSpacing: font.letterSpacing.wider,
    textTransform: 'uppercase',
    color: color.accent,
  }),
);

export const quoteStyle = style(
  inComponentsLayer({
    margin: 0,
    fontSize: font.size.base,
    lineHeight: font.lineHeight.relaxed,

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        fontSize: font.size.lg,
      },
    },
  }),
);

// The guide layout gives every article blockquote a left bar, italics and a
// large top margin, and every paragraph block margins, all with descendant
// selectors in the overrides layer. Two classes outrank them here.
globalStyle(
  `${listStyle} ${quoteStyle}`,
  inOverridesLayer({
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
    border: 0,
    fontStyle: 'normal',
  }),
);

globalStyle(
  `${listStyle} ${quoteStyle} > p`,
  inOverridesLayer({
    margin: 0,
    fontSize: 'inherit',
    lineHeight: 'inherit',
  }),
);

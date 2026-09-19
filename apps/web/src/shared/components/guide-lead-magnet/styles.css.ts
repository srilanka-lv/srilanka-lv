import { style } from '@vanilla-extract/css';

import { inComponentsLayer, inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { border, color, font, shadow, spacing, transition } = vars;

/**
 * The block borrows the product family's grammar (footer cards, products
 * page): an accent-tinted panel with a primary hairline, a subtitle chip, a
 * heavier title, and a cutout standing on the panel. Here the cutout is the
 * guide's own cover, so the reader sees the thing she is asked to want.
 *
 * Mobile: the cover sits beside the chip and title; the copy and form take
 * the full width below. md+: the cover keeps the right column and tucks out
 * of the panel's bottom corner like a postcard left on a table.
 */
export const blockStyle = style(
  inComponentsLayer({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    gridTemplateAreas: '"head cover" "rest rest"',
    columnGap: spacing[5],
    alignItems: 'start',
    marginBlock: spacing[10],
    paddingBlock: spacing[8],
    paddingInline: spacing[6],
    border: `1px solid color-mix(in oklch, ${color.primary} 12%, transparent)`,
    borderRadius: border.radius.large,
    backgroundColor: `color-mix(in oklch, ${color.accent} 8%, ${color.background})`,

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        gridTemplateAreas: '"head cover" "rest cover"',
        columnGap: spacing[10],
        paddingInline: spacing[8],
      },
    },
  }),
);

export const headStyle = style(
  inComponentsLayer({
    gridArea: 'head',
    minWidth: 0,
  }),
);

export const restStyle = style(
  inComponentsLayer({
    gridArea: 'rest',
    minWidth: 0,
  }),
);

export const chipStyle = style(
  inComponentsLayer({
    display: 'inline-block',
    fontSize: font.size.xs,
    fontWeight: font.weight.semibold,
    lineHeight: font.lineHeight.tight,
    color: `color-mix(in oklch, ${color.accent} 75%, ${color.foreground})`,
    border: `1px solid color-mix(in oklch, ${color.accent} 45%, transparent)`,
    borderRadius: border.radius.large,
    padding: `${spacing[1]} ${spacing[2]}`,
    whiteSpace: 'nowrap',
  }),
);

// The guide layout styles `<article> h3` with a descendant selector in the
// overrides layer, which beats a lone class in any layer. Scoping under the
// block gives this rule two classes, so the title can follow the product
// panels (bold, tight, one step larger than the footer cards) instead of the
// article's h3.
export const headingStyle = style(
  inOverridesLayer({
    selectors: {
      [`${blockStyle} &`]: {
        marginTop: spacing[3],
        marginBottom: 0,
        fontSize: font.size.xl,
        fontWeight: font.weight.bold,
        lineHeight: font.lineHeight.tight,
        textWrap: 'balance',
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        selectors: {
          [`${blockStyle} &`]: {
            fontSize: font.size['2xl'],
          },
        },
      },
    },
  }),
);

export const textStyle = style(
  inComponentsLayer({
    marginTop: spacing[4],
    marginBottom: spacing[5],
    fontSize: font.size.base,
    lineHeight: font.lineHeight.relaxed,
  }),
);

export const formStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],

    '@media': {
      [`screen and (min-width: ${breakpoints.sm})`]: {
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
    },
  }),
);

export const fieldStyle = style(
  inComponentsLayer({
    flex: '1 1 auto',
  }),
);

export const successHeadingStyle = style(
  inComponentsLayer({
    marginTop: spacing[4],
    marginBottom: spacing[1],
  }),
);

export const successTextStyle = style(
  inComponentsLayer({
    margin: 0,
  }),
);

export const noteStyle = style(
  inComponentsLayer({
    marginTop: spacing[4],
    marginBottom: 0,
    fontSize: font.size.sm,
    lineHeight: font.lineHeight.snug,
    color: `color-mix(in oklch, ${color.foreground} 72%, ${color.background})`,
  }),
);

export const coverStyle = style(
  inComponentsLayer({
    gridArea: 'cover',
    alignSelf: 'start',
    justifySelf: 'end',
    width: spacing[24],
    margin: 0,
    transform: 'rotate(-3deg)',
    transformOrigin: 'center',
    transitionProperty: 'transform',
    transitionDuration: transition.duration.normal,
    // Exponential ease-out; the token set only carries easeInOut.
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',

    selectors: {
      // The one authored moment: as she starts typing, the cover settles.
      [`${blockStyle}:focus-within &`]: {
        transform: 'rotate(-1deg)',
      },
    },

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        alignSelf: 'end',
        width: spacing[40],
        marginBottom: `calc(-1 * ${spacing[16]})`,
        marginRight: `calc(-1 * ${spacing[4]})`,
        transform: 'rotate(-4deg)',
      },
      '(prefers-reduced-motion: reduce)': {
        transitionDuration: '0s',
      },
    },
  }),
);

export const coverImageStyle = style(
  inComponentsLayer({
    display: 'block',
    width: '100%',
    height: 'auto',
    borderRadius: border.radius.small,
    boxShadow: shadow.large,
  }),
);

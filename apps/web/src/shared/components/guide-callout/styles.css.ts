import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { inComponentsLayer, inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { border, color, font, spacing } = vars;

/**
 * Two registers. Tips and warnings stay a quiet stone box with a drawn icon
 * beside the label. Personal notes are the peaks of the page: they carry
 * Grieta's portrait and the coral-tinted panel the product cards stand on,
 * so a first-person aside reads as a message from her, not a footnote.
 */
const baseStyle = style(
  inComponentsLayer({
    marginBlock: spacing[8],
    paddingBlock: spacing[5],
    paddingInline: spacing[6],
    borderRadius: border.radius.large,
    fontSize: font.size.base,
    lineHeight: font.lineHeight.relaxed,
  }),
);

export const calloutStyles = styleVariants({
  quiet: [
    baseStyle,
    inComponentsLayer({
      border: `1px solid ${color.border}`,
      backgroundColor: color.secondary,
    }),
  ],
  personal: [
    baseStyle,
    inComponentsLayer({
      display: 'grid',
      gridTemplateColumns: `${spacing[12]} minmax(0, 1fr)`,
      columnGap: spacing[4],
      alignItems: 'start',
      paddingBlock: spacing[6],
      border: `1px solid color-mix(in oklch, ${color.primary} 12%, transparent)`,
      backgroundColor: `color-mix(in oklch, ${color.accent} 8%, ${color.background})`,

      '@media': {
        [`screen and (min-width: ${breakpoints.md})`]: {
          gridTemplateColumns: `${spacing[16]} minmax(0, 1fr)`,
          columnGap: spacing[6],
          paddingInline: spacing[8],
          fontSize: font.size.lg,
        },
      },
    }),
  ],
});

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

export const labelStyle = style(
  inComponentsLayer({
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1],
    marginBottom: spacing[2],
    fontSize: font.size.xs,
    fontWeight: font.weight.semibold,
    letterSpacing: font.letterSpacing.wider,
    textTransform: 'uppercase',
    color: color.accent,
  }),
);

export const iconStyle = style(
  inComponentsLayer({
    flexShrink: 0,
    width: spacing[4],
    height: spacing[4],
  }),
);

// The guide layout gives every article paragraph its own block margins with
// a descendant selector in the overrides layer. Inside a callout the label
// and the box already set the rhythm, so the first and last paragraph drop
// theirs. Two classes plus the element outrank the layout's rule.
for (const variant of Object.values(calloutStyles)) {
  globalStyle(
    `${variant} ${bodyStyle} > p:first-child`,
    inOverridesLayer({
      marginTop: 0,
    }),
  );
  globalStyle(
    `${variant} ${bodyStyle} > p:last-child`,
    inOverridesLayer({
      marginBottom: 0,
    }),
  );
}

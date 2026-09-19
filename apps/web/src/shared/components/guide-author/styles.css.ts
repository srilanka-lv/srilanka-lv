import { globalStyle, style } from '@vanilla-extract/css';

import { inComponentsLayer, inOverridesLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { border, color, font, spacing } = vars;

export const authorStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: spacing[5],
    marginBlock: spacing[10],
    paddingBlock: spacing[5],
    paddingInline: spacing[5],
    border: `1px solid color-mix(in oklch, ${color.primary} 12%, transparent)`,
    borderRadius: border.radius.large,
    // Her panel: the same tint the personal callouts and the offer stand on,
    // so the page closes in the voice it was written in.
    backgroundColor: `color-mix(in oklch, ${color.accent} 8%, ${color.background})`,
  }),
);

export const portraitStyle = style(
  inComponentsLayer({
    flex: '0 0 auto',
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: `2px solid ${color.background}`,
    backgroundColor: color.secondary,
  }),
);

export const bodyStyle = style(
  inComponentsLayer({
    flex: '1 1 240px',
    fontSize: font.size.base,
    lineHeight: font.lineHeight.relaxed,
  }),
);

export const nameStyle = style(
  inComponentsLayer({
    display: 'block',
    marginBottom: spacing[1],
    fontWeight: font.weight.semibold,
  }),
);

/** The footer's sign-off motif, closing the guide the way it closes the site. */
export const signatureStyle = style(
  inComponentsLayer({
    display: 'block',
    marginTop: spacing[4],
    width: spacing[40],
    height: 'auto',
    fill: color.foreground,
  }),
);

// The guide layout gives article paragraphs block margins with a descendant
// selector in the overrides layer; inside the box the name and signature set
// the rhythm.
globalStyle(
  `${authorStyle} ${bodyStyle} > p:first-of-type`,
  inOverridesLayer({
    marginTop: 0,
  }),
);
globalStyle(
  `${authorStyle} ${bodyStyle} > p:last-of-type`,
  inOverridesLayer({
    marginBottom: 0,
  }),
);

import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { border, color, font, spacing } = vars;

export const calloutStyle = style(
  inComponentsLayer({
    marginBlock: spacing[6],
    paddingBlock: spacing[4],
    paddingInline: spacing[5],
    border: `1px solid ${color.border}`,
    borderRadius: border.radius.medium,
    backgroundColor: color.secondary,
    fontSize: font.size.base,
    lineHeight: font.lineHeight.relaxed,
  }),
);

export const labelStyle = style(
  inComponentsLayer({
    display: 'block',
    marginBottom: spacing[1],
    fontSize: font.size.xs,
    fontWeight: font.weight.semibold,
    letterSpacing: font.letterSpacing.wider,
    textTransform: 'uppercase',
    color: color.accent,
  }),
);

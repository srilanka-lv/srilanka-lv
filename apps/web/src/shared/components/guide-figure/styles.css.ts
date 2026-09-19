import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { border, color, font, spacing } = vars;

export const figureStyle = style(
  inComponentsLayer({
    marginBlock: spacing[8],
    marginInline: 0,
  }),
);

export const imageStyle = style(
  inComponentsLayer({
    display: 'block',
    width: '100%',
    height: 'auto',
    borderRadius: border.radius.medium,
    backgroundColor: color.secondary,
  }),
);

export const captionStyle = style(
  inComponentsLayer({
    marginTop: spacing[2],
    fontSize: font.size.sm,
    lineHeight: font.lineHeight.normal,
    color: color.secondaryForeground,
  }),
);

import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
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
    border: `1px solid ${color.border}`,
    borderRadius: border.radius.medium,
    backgroundColor: color.surface,
  }),
);

export const portraitStyle = style(
  inComponentsLayer({
    flex: '0 0 auto',
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    objectFit: 'cover',
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

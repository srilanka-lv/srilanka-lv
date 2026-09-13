import { globalStyle, style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { border, color, font, spacing } = vars;

export const tocStyle = style(
  inComponentsLayer({
    marginBlock: spacing[8],
    border: `1px solid ${color.border}`,
    borderRadius: border.radius.medium,
    backgroundColor: color.surface,
  }),
);

export const summaryStyle = style(
  inComponentsLayer({
    paddingBlock: spacing[3],
    paddingInline: spacing[5],
    fontWeight: font.weight.semibold,
    cursor: 'pointer',
  }),
);

export const listStyle = style(
  inComponentsLayer({
    margin: 0,
    paddingBlock: spacing[2],
    paddingInline: spacing[5],
    paddingLeft: spacing[10],
    columnGap: spacing[8],
    fontSize: font.size.base,
    lineHeight: font.lineHeight.relaxed,

    '@media': {
      'screen and (min-width: 768px)': {
        columns: 2,
      },
    },
  }),
);

globalStyle(
  `${listStyle} li`,
  inComponentsLayer({
    breakInside: 'avoid',
    marginBlock: spacing[1],
  }),
);

globalStyle(
  `${listStyle} a`,
  inComponentsLayer({
    color: color.foreground,
    textDecoration: 'none',
  }),
);

globalStyle(
  `${listStyle} a:hover, ${listStyle} a:focus-visible`,
  inComponentsLayer({
    color: color.accent,
  }),
);

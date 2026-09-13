import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

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

/**
 * The numbers are rendered as spans rather than list markers. With markers the
 * two-digit entries overflowed the padding box and were clipped at the left
 * edge on a phone, which is where this list matters most.
 */
export const listStyle = style(
  inComponentsLayer({
    listStyle: 'none',
    margin: 0,
    paddingBlock: spacing[2],
    paddingInline: spacing[5],
    columnGap: spacing[8],
    fontSize: font.size.base,
    lineHeight: font.lineHeight.relaxed,

    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        columns: 2,
      },
    },
  }),
);

export const itemStyle = style(
  inComponentsLayer({
    breakInside: 'avoid',
    marginBlock: spacing[1],
  }),
);

export const linkStyle = style(
  inComponentsLayer({
    display: 'flex',
    gap: spacing[2],
    color: color.foreground,
    textDecoration: 'none',

    backgroundImage: 'none',
    ':hover': {
      color: color.accent,
    },
    ':focus-visible': {
      color: color.accent,
    },
  }),
);

export const counterStyle = style(
  inComponentsLayer({
    flexShrink: 0,
    minWidth: '1.5em',
    textAlign: 'right',
    color: color.secondaryForeground,
    fontVariantNumeric: 'tabular-nums',
  }),
);

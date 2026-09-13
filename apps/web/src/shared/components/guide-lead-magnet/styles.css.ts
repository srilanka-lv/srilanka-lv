import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { border, color, font, spacing } = vars;

export const blockStyle = style(
  inComponentsLayer({
    marginBlock: spacing[10],
    paddingBlock: spacing[6],
    paddingInline: spacing[6],
    border: `1px solid ${color.border}`,
    borderRadius: border.radius.medium,
    backgroundColor: color.secondary,
  }),
);

export const headingStyle = style(
  inComponentsLayer({
    marginTop: 0,
    marginBottom: spacing[2],
  }),
);

export const textStyle = style(
  inComponentsLayer({
    margin: 0,
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

export const noteStyle = style(
  inComponentsLayer({
    marginTop: spacing[3],
    marginBottom: 0,
    fontSize: font.size.sm,
    color: color.secondaryForeground,
  }),
);

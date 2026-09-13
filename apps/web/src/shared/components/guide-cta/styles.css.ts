import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { border, color, font, spacing } = vars;

export const ctaStyle = style(
  inComponentsLayer({
    marginBlock: spacing[10],
    paddingBlock: spacing[6],
    paddingInline: spacing[6],
    border: `1px solid ${color.border}`,
    borderRadius: border.radius.medium,
    // The surface ground, so it reads as a separate object from the callouts
    // and the signup block, which both sit on the stone secondary.
    backgroundColor: color.surface,
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

export const actionsStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],

    '@media': {
      [`screen and (min-width: ${breakpoints.sm})`]: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[5],
      },
    },
  }),
);

import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing, font } = vars;

export const formStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  }),
);

export const textStyle = style(
  inComponentsLayer({
    fontSize: font.size.lg,
    margin: 0,
  }),
);

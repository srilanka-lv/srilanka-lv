import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing } = vars;

export const sectionStyle = style(
  inComponentsLayer({
    scrollMarginTop: spacing[24],
  }),
);

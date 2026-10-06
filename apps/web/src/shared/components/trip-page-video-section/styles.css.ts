import { style } from '@vanilla-extract/css';

import { vars } from '@/shared/styles/themes/theme.contract.css';

const { border } = vars;

export const tripPageVideoPlayerStyle = style({
  width: '100%',
  overflow: 'hidden',
  borderRadius: border.radius.large,
});

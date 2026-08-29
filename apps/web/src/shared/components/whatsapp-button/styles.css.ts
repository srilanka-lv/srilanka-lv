import { globalStyle, style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { spacing } = vars;

export const whatsAppButtonStyle = style(
  inComponentsLayer({
    display: 'block',
    width: '100%',
    maxWidth: spacing[56],
    height: 'auto',

    selectors: {
      '&::after': {
        display: 'none',
      },
    },
  }),
);

globalStyle(`${whatsAppButtonStyle} svg`, {
  display: 'block',
  width: '100%',
  height: 'auto',
});

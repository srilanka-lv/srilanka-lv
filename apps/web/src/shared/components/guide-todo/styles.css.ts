import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { border, font } = vars;

export const todoStyle = style(
  inComponentsLayer({
    paddingInline: '0.3em',
    borderRadius: border.radius.small,
    backgroundColor: '#fff3bf',
    color: '#5c4400',
    fontSize: '0.9em',
    fontWeight: font.weight.medium,
  }),
);

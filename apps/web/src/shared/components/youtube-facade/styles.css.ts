import { style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';

const { border, color, focus, spacing } = vars;

export const frameStyle = style(
  inComponentsLayer({
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    borderRadius: border.radius.medium,
    backgroundColor: color.secondary,
  }),
);

export const buttonStyle = style(
  inComponentsLayer({
    display: 'block',
    width: '100%',
    height: '100%',
    padding: 0,
    border: 0,
    background: 'none',
    cursor: 'pointer',

    selectors: {
      '&:focus-visible': {
        outline: `${focus.width} solid ${focus.color}`,
        outlineOffset: focus.offset,
      },
    },
  }),
);

export const thumbnailStyle = style(
  inComponentsLayer({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }),
);

export const playBadgeStyle = style(
  inComponentsLayer({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    paddingBlock: spacing[3],
    paddingInline: spacing[5],
    borderRadius: border.radius.large,
    backgroundColor: color.accent,
    color: color.accentForeground,
    fontWeight: 600,
    pointerEvents: 'none',
  }),
);

export const iframeStyle = style(
  inComponentsLayer({
    display: 'block',
    width: '100%',
    height: '100%',
    border: 0,
  }),
);

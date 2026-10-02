import { style } from '@vanilla-extract/css';

// Zero-size markers over the trip content: no layout, no paint, no clicks.
export const sentinelsStyle = style({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  visibility: 'hidden',
});

export const sentinelStyle = style({
  position: 'absolute',
  left: 0,
  width: '1px',
  height: '1px',
});

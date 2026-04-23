import { createTheme } from '@vanilla-extract/css';

import { borderRadius } from '../tokens/borders';
import { breakpoints } from '../tokens/breakpoints';
import { lightColors } from '../tokens/colors';
import { fontSizes, fontWeights, lineHeights } from '../tokens/fonts';
import { letterSpacing } from '../tokens/letter-spacing';
import { spacing } from '../tokens/spacing';
import { vars } from './theme.contract.css';

export const lightTheme = createTheme(vars, {
  color: lightColors,
  font: {
    size: fontSizes,
    weight: fontWeights,
    lineHeight: lineHeights,
  },
  spacing,
  border: {
    radius: borderRadius,
  },
  letterSpacing,
  breakpoint: breakpoints,
});

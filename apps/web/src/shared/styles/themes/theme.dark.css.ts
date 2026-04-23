import { createTheme } from '@vanilla-extract/css';

import { borderRadius } from '../tokens/borders';
import { breakpoints } from '../tokens/breakpoints';
import { darkColors } from '../tokens/colors';
import { fontSizes, fontWeights, lineHeights } from '../tokens/fonts';
import { letterSpacing } from '../tokens/letter-spacing';
import { spacing } from '../tokens/spacing';
import { vars } from './theme.contract.css';

export const darkTheme = createTheme(vars, {
  color: darkColors,
  font: {
    size: fontSizes,
    weight: fontWeights,
    lineHeight: lineHeights,
    letterSpacing,
  },
  spacing,
  border: {
    radius: borderRadius,
  },
  breakpoint: breakpoints,
});

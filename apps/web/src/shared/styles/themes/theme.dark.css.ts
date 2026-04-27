import { createTheme } from '@vanilla-extract/css';

import { borderRadius } from '../tokens/borders';
import { breakpoints } from '../tokens/breakpoints';
import { darkColors } from '../tokens/colors';
import { focus } from '../tokens/focus';
import { fontFamilies, fontSizes, fontWeights, letterSpacing, lineHeights } from '../tokens/fonts';
import { shadows } from '../tokens/shadows';
import { spacing } from '../tokens/spacing';
import { transitionDuration, transitionEasing } from '../tokens/transitions';
import { zIndex } from '../tokens/z-index';
import { vars } from './theme.contract.css';

export const darkTheme = createTheme(vars, {
  color: darkColors,
  font: {
    family: fontFamilies,
    size: fontSizes,
    weight: fontWeights,
    lineHeight: lineHeights,
    letterSpacing,
  },
  spacing,
  border: {
    radius: borderRadius,
  },
  focus,
  shadow: shadows,
  transition: {
    easing: transitionEasing,
    duration: transitionDuration,
  },
  zIndex,
  breakpoint: breakpoints,
});

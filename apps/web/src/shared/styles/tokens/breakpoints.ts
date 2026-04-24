// Breakpoints in the Vanilla Extract theme contract are useful for non-media-query CSS (like maxWidth on elements), but for @media queries always import directly from this file.
// Media queries do not support CSS variables.
// Pixel comments below assume 1rem = 16px (browser default).
export const breakpoints = {
  xxs: '20rem', // 320px
  xs: '30rem', // 480px
  sm: '40rem', // 640px
  md: '48rem', // 768px
  lg: '64rem', // 1024px
  xl: '80rem', // 1280px
  xxl: '96rem', // 1536px
};

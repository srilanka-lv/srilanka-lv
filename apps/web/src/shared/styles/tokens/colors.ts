export const lightColors = {
  background: 'oklch(98.96% 0.002 17.19)', // #fdfbfb
  surface: '#ffffff', // #ffffff: same value as primaryForeground; cards
  foreground: 'oklch(15.53% 0.050 25.04)', // #1d0303
  primary: 'oklch(19.03% 0.056 24.12)', // #280707
  primaryForeground: '#ffffff', // #ffffff
  secondary: 'oklch(97% 0.001 106.424)', // #f5f5f4
  secondaryForeground: 'oklch(21.6% 0.006 56.043)', // #1c1917
  border: 'oklch(97% 0.001 106.424)', // #f5f5f4: same value as secondary; borders/dividers
  accent: 'oklch(65.17% 0.192 23.82)', // #ee5253
  accentForeground: 'oklch(98.96% 0.002 17.19)', // #fdfbfb
  error: 'oklch(63.7% 0.237 25.331)', // #fb2c36
  errorForeground: 'oklch(63.7% 0.237 25.331)', // #
};

// Dark surfaces form an elevation ladder on one warm hue (27deg) at whisper
// chroma (0.008): page 15% -> card 19% -> raised/hover 23% -> border 27%.
export const darkColors = {
  background: 'oklch(15% 0.008 27)', // #0e0a09
  surface: 'oklch(19% 0.008 27)', // #171212: cards
  foreground: 'oklch(98.96% 0.002 17.19)', // #fdfbfb
  primary: 'oklch(98.5% 0.001 106.423)', // #fafaf9
  primaryForeground: 'oklch(21.6% 0.006 56.043)', // #1c1917
  secondary: 'oklch(23% 0.008 27)', // #211c1b: raised elements, hover fills
  secondaryForeground: 'oklch(98.5% 0.001 106.423)', // #fafaf9
  border: 'oklch(27% 0.008 27)', // #2a2524: borders/dividers
  accent: 'oklch(65.17% 0.192 23.82)', // #ee5253
  accentForeground: 'oklch(15% 0.008 27)', // #0e0a09: 5.6:1 on accent
  error: 'oklch(70.4% 0.191 22.216)', // #ff6467
  errorForeground: 'oklch(70.4% 0.191 22.216)', // #ff6467
};

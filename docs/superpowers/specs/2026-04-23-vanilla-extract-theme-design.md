# Vanilla Extract Theme Design

## Overview

A theme system for the web app using vanilla-extract's `createThemeContract` and `createTheme`. All design tokens (colors, typography, spacing, borders, letter spacing, breakpoints) live in a single theme contract. Components import one `vars` object. Light and dark themes implement the full contract. Token values are based on Tailwind CSS v4 defaults.

## Architecture

```
apps/web/src/shared/styles/
├── themes/
│   ├── theme.contract.css.ts   # createThemeContract — full token shape
│   ├── theme.light.css.ts      # createTheme — light mode implementation
│   └── theme.dark.css.ts       # createTheme — dark mode implementation
├── tokens/
│   ├── colors.ts               # semantic color values for light and dark
│   ├── fonts.ts                # font families, sizes, weights, line heights
│   ├── spacing.ts              # spacing scale
│   ├── borders.ts              # border radius scale
│   ├── letter-spacing.ts       # tracking values
│   └── breakpoints.ts          # responsive breakpoints
```

### Token files (`tokens/*.ts`)

Plain TypeScript objects — not `.css.ts` files, no CSS output. They export the raw values that get passed into `createTheme`. Single source of truth for each token category.

### Theme files (`themes/*.css.ts`)

- **`theme.contract.css.ts`** — defines the shape of `vars` using `createThemeContract` with `null` placeholders for every token
- **`theme.light.css.ts`** — imports token values from `tokens/`, passes them to `createTheme`. Exports a `lightTheme` class name.
- **`theme.dark.css.ts`** — same structure, different color values. Font, spacing, border, letter-spacing, and breakpoint values are identical to light. Exports a `darkTheme` class name.

## Theme Contract Shape

```typescript
export const vars = createThemeContract({
  color: {
    background: null,
    foreground: null,
    primary: null,
    primaryForeground: null,
    secondary: null,
    secondaryForeground: null,
    accent: null,
    accentForeground: null,
  },
  font: {
    size: {
      xs: null,
      sm: null,
      base: null,
      lg: null,
      xl: null,
      '2xl': null,
      '3xl': null,
      '4xl': null,
      '5xl': null,
      '6xl': null,
      '7xl': null,
      '8xl': null,
      '9xl': null,
    },
    weight: {
      thin: null,
      extralight: null,
      light: null,
      normal: null,
      medium: null,
      semibold: null,
      bold: null,
      extrabold: null,
      black: null,
    },
    lineHeight: {
      tight: null,
      snug: null,
      normal: null,
      relaxed: null,
      loose: null,
    },
  },
  spacing: {
    '0': null,
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
    '8': null,
    '10': null,
    '12': null,
    '16': null,
    '20': null,
    '24': null,
    '32': null,
    '40': null,
    '48': null,
    '56': null,
    '64': null,
  },
  border: {
    radius: {
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      '2xl': null,
      '3xl': null,
      '4xl': null,
    },
  },
  letterSpacing: {
    tighter: null,
    tight: null,
    normal: null,
    wide: null,
    wider: null,
    widest: null,
  },
  breakpoint: {
    sm: null,
    md: null,
    lg: null,
    xl: null,
    '2xl': null,
  },
});
```

## Token Values (Tailwind CSS v4)

### Colors (`tokens/colors.ts`)

Semantic color mappings using Tailwind's oklch color values.

**Light mode:**
- background: white
- foreground: stone-950 (`oklch(14.7% 0.004 49.25)`)
- primary: stone-900 (`oklch(21.6% 0.006 56.043)`)
- primaryForeground: white
- secondary: stone-100 (`oklch(97% 0.001 106.424)`)
- secondaryForeground: stone-900 (`oklch(21.6% 0.006 56.043)`)
- accent: lime-400 (`oklch(84.1% 0.238 128.85)`)
- accentForeground: lime-950 (`oklch(27.4% 0.072 132.109)`)

**Dark mode:**
- background: stone-950 (`oklch(14.7% 0.004 49.25)`)
- foreground: stone-50 (`oklch(98.5% 0.001 106.423)`)
- primary: stone-50 (`oklch(98.5% 0.001 106.423)`)
- primaryForeground: stone-900 (`oklch(21.6% 0.006 56.043)`)
- secondary: stone-800 (`oklch(26.8% 0.007 34.298)`)
- secondaryForeground: stone-50 (`oklch(98.5% 0.001 106.423)`)
- accent: lime-500 (`oklch(76.8% 0.233 130.85)`)
- accentForeground: lime-950 (`oklch(27.4% 0.072 132.109)`)

### Fonts (`tokens/fonts.ts`)

Font family is handled by `next/font/google` (Lora) in `layout.tsx`, not in the theme tokens. Tokens only define the scale.

```typescript
size: {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
},
weight: {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
},
lineHeight: {
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
},
```

### Spacing (`tokens/spacing.ts`)

Based on 0.25rem base unit:

```typescript
'0': '0',
'1': '0.25rem',
'2': '0.5rem',
'3': '0.75rem',
'4': '1rem',
'5': '1.25rem',
'6': '1.5rem',
'8': '2rem',
'10': '2.5rem',
'12': '3rem',
'16': '4rem',
'20': '5rem',
'24': '6rem',
'32': '8rem',
'40': '10rem',
'48': '12rem',
'56': '14rem',
'64': '16rem',
```

### Borders (`tokens/borders.ts`)

```typescript
radius: {
  xs: '0.125rem',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  '4xl': '2rem',
},
```

### Letter Spacing (`tokens/letter-spacing.ts`)

```typescript
tighter: '-0.05em',
tight: '-0.025em',
normal: '0em',
wide: '0.025em',
wider: '0.05em',
widest: '0.1em',
```

### Breakpoints (`tokens/breakpoints.ts`)

```typescript
sm: '40rem',
md: '48rem',
lg: '64rem',
xl: '80rem',
'2xl': '96rem',
```

## Component Usage

```typescript
import { vars } from '@/shared/styles/themes/theme.contract.css';

// In a recipe or style — one import, one object
{
  backgroundColor: vars.color.primary,
  color: vars.color.primaryForeground,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  borderRadius: vars.border.radius.md,
  padding: vars.spacing[4],
  letterSpacing: vars.letterSpacing.normal,
}
```

## Layout Integration

The theme class and font are applied to the `<html>` element in `layout.tsx`:

```tsx
import { Lora } from 'next/font/google';
import { lightTheme } from '@/shared/styles/themes/theme.light.css';

const lora = Lora({ subsets: ['latin', 'latin-ext'] });

<html lang="lv" className={`${lora.className} ${lightTheme}`}>
```

Font family is loaded via `next/font/google`, not through the theme contract. The theme only controls the font scale (sizes, weights, line heights).

## Migration

After the theme is set up, the button component's hardcoded colors should be replaced with `vars.color.*` references. This is a follow-up task, not part of the initial theme setup.

## Design Decisions

- **Full contract**: All tokens (including mode-independent ones like fonts, spacing) live in the contract. Trade-off: light and dark themes duplicate non-color values. Benefit: components have a single `vars` import.
- **Token files are plain `.ts`**: Not `.css.ts`. They export raw value objects consumed by `createTheme`. No CSS output of their own.
- **Tailwind v4 values**: All token values match Tailwind CSS v4 defaults for consistency and familiarity.
- **Semantic color names**: Colors are named by purpose (primary, muted, destructive) not by value (blue, gray, red). This makes theme switching meaningful.
- **oklch colors**: Using Tailwind v4's oklch color format for perceptual uniformity.

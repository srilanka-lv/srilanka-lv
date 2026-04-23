# Vanilla Extract Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a vanilla-extract theme system with light and dark modes, Tailwind v4-based tokens, and Lora font via next/font/google.

**Architecture:** Token value files (plain `.ts`) feed into `createTheme` implementations. A single `createThemeContract` defines the full token shape. Components import one `vars` object. Theme class applied to `<html>` in layout.

**Tech Stack:** vanilla-extract (`createThemeContract`, `createTheme`), next/font/google (Lora), Tailwind CSS v4 token values

**Spec:** `docs/superpowers/specs/2026-04-23-vanilla-extract-theme-design.md`

---

### File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `apps/web/src/shared/styles/tokens/colors.ts` | Light and dark color values |
| Create | `apps/web/src/shared/styles/tokens/fonts.ts` | Font size, weight, line height values |
| Create | `apps/web/src/shared/styles/tokens/spacing.ts` | Spacing scale values |
| Create | `apps/web/src/shared/styles/tokens/borders.ts` | Border radius values |
| Create | `apps/web/src/shared/styles/tokens/letter-spacing.ts` | Letter spacing values |
| Create | `apps/web/src/shared/styles/tokens/breakpoints.ts` | Breakpoint values |
| Create | `apps/web/src/shared/styles/themes/theme.contract.css.ts` | Theme contract (full token shape) |
| Create | `apps/web/src/shared/styles/themes/theme.light.css.ts` | Light theme implementation |
| Create | `apps/web/src/shared/styles/themes/theme.dark.css.ts` | Dark theme implementation |
| Modify | `apps/web/src/app/layout.tsx` | Apply theme class + Lora font |

---

### Task 1: Create all token value files

**Files:**
- Create: `apps/web/src/shared/styles/tokens/colors.ts`
- Create: `apps/web/src/shared/styles/tokens/fonts.ts`
- Create: `apps/web/src/shared/styles/tokens/spacing.ts`
- Create: `apps/web/src/shared/styles/tokens/borders.ts`
- Create: `apps/web/src/shared/styles/tokens/letter-spacing.ts`
- Create: `apps/web/src/shared/styles/tokens/breakpoints.ts`

- [ ] **Step 1: Create `colors.ts`**

```typescript
export const lightColors = {
  background: '#ffffff',
  foreground: 'oklch(14.7% 0.004 49.25)',
  primary: 'oklch(21.6% 0.006 56.043)',
  primaryForeground: '#ffffff',
  secondary: 'oklch(97% 0.001 106.424)',
  secondaryForeground: 'oklch(21.6% 0.006 56.043)',
  accent: 'oklch(84.1% 0.238 128.85)',
  accentForeground: 'oklch(27.4% 0.072 132.109)',
};

export const darkColors = {
  background: 'oklch(14.7% 0.004 49.25)',
  foreground: 'oklch(98.5% 0.001 106.423)',
  primary: 'oklch(98.5% 0.001 106.423)',
  primaryForeground: 'oklch(21.6% 0.006 56.043)',
  secondary: 'oklch(26.8% 0.007 34.298)',
  secondaryForeground: 'oklch(98.5% 0.001 106.423)',
  accent: 'oklch(76.8% 0.233 130.85)',
  accentForeground: 'oklch(27.4% 0.072 132.109)',
};
```

- [ ] **Step 2: Create `fonts.ts`**

```typescript
export const fontSizes = {
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
};

export const fontWeights = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

export const lineHeights = {
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
};
```

- [ ] **Step 3: Create `spacing.ts`**

```typescript
export const spacing = {
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
};
```

- [ ] **Step 4: Create `borders.ts`**

```typescript
export const borderRadius = {
  xs: '0.125rem',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  '4xl': '2rem',
};
```

- [ ] **Step 5: Create `letter-spacing.ts`**

```typescript
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};
```

- [ ] **Step 6: Create `breakpoints.ts`**

```typescript
export const breakpoints = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '96rem',
};
```

- [ ] **Step 7: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep "tokens"`
Expected: No errors

- [ ] **Step 8: Commit**

```bash
git add apps/web/src/shared/styles/tokens/
git commit -m "feat: ✨ add theme token values"
```

---

### Task 2: Create the theme contract

**Files:**
- Create: `apps/web/src/shared/styles/themes/theme.contract.css.ts`

- [ ] **Step 1: Create the contract**

```typescript
import { createThemeContract } from '@vanilla-extract/css';

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

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep "theme"`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/shared/styles/themes/theme.contract.css.ts
git commit -m "feat: ✨ add theme contract"
```

---

### Task 3: Create light and dark theme implementations

**Files:**
- Create: `apps/web/src/shared/styles/themes/theme.light.css.ts`
- Create: `apps/web/src/shared/styles/themes/theme.dark.css.ts`

- [ ] **Step 1: Create `theme.light.css.ts`**

```typescript
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
```

- [ ] **Step 2: Create `theme.dark.css.ts`**

```typescript
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
  },
  spacing,
  border: {
    radius: borderRadius,
  },
  letterSpacing,
  breakpoint: breakpoints,
});
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep "theme"`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/shared/styles/themes/theme.light.css.ts apps/web/src/shared/styles/themes/theme.dark.css.ts
git commit -m "feat: ✨ add light and dark theme implementations"
```

---

### Task 4: Integrate theme and font into layout

**Files:**
- Modify: `apps/web/src/app/layout.tsx`

The current layout.tsx looks like this:

```tsx
import type { Metadata } from 'next';
import { PublicEnvScript, env } from 'next-runtime-env';
import type { ReactNode } from 'react';

export const metadata: Metadata = { ... };

export default function RootLayout({ children }: ...) {
  return (
    <html lang="lv">
      <head>
        <PublicEnvScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 1: Add Lora font and light theme class**

Add the Lora font import and theme class to the `<html>` element:

```tsx
import type { Metadata } from 'next';
import { Lora } from 'next/font/google';
import { PublicEnvScript, env } from 'next-runtime-env';
import type { ReactNode } from 'react';

import { lightTheme } from '@/shared/styles/themes/theme.light.css';

const lora = Lora({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: {
    template: '%s | SriLanka.lv',
    default: 'SriLanka.lv',
  },
  metadataBase: env('NEXT_PUBLIC_SELF_URL'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    images: '/og-image.png',
  },
};

type RootLayoutReturnType = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutReturnType) {
  return (
    <html lang="lv" className={`${lora.className} ${lightTheme}`}>
      <head>
        <PublicEnvScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify the dev server works**

Run: `bun run web:dev`
Visit: `http://localhost:3000`
Expected: Page renders with Lora font. Inspect `<html>` element — it should have two classes (Lora font class + light theme class). CSS variables should be visible in the browser devtools.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/app/layout.tsx
git commit -m "feat: ✨ integrate theme and Lora font into layout"
```

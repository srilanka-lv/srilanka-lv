---
name: Šrilanka.lv
description: Warm, personal Latvian travel guide to Sri Lanka; coral accent on warm paper, one voice, real photography.
colors:
  coral: "oklch(65.17% 0.192 23.82)"
  warm-paper: "oklch(98.96% 0.002 17.19)"
  espresso-ink: "oklch(15.53% 0.050 25.04)"
  deep-maroon: "oklch(19.03% 0.056 24.12)"
  pure-white: "#ffffff"
  warm-stone: "oklch(97% 0.001 106.424)"
  stone-ink: "oklch(21.6% 0.006 56.043)"
  error-red: "oklch(63.7% 0.237 25.331)"
  focus-lime: "oklch(76.8% 0.233 130.85)"
  dark-bg: "oklch(15% 0.008 27)"
  dark-surface: "oklch(19% 0.008 27)"
  dark-raised: "oklch(23% 0.008 27)"
  dark-border: "oklch(27% 0.008 27)"
  dark-text: "oklch(98.96% 0.002 17.19)"
  dark-text-strong: "oklch(98.5% 0.001 106.423)"
  dark-error: "oklch(70.4% 0.191 22.216)"
typography:
  display:
    fontFamily: "Comme, sans-serif"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "Comme, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Comme, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1
rounded:
  small: "0.25rem"
  medium: "0.5rem"
  large: "0.75rem"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "4": "1rem"
  "6": "1.5rem"
  "8": "2rem"
  "12": "3rem"
  "16": "4rem"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.medium}"
    padding: "0.5rem 1rem"
  button-secondary:
    backgroundColor: "{colors.warm-stone}"
    textColor: "{colors.stone-ink}"
    rounded: "{rounded.medium}"
    padding: "0.5rem 1rem"
  card-filled:
    backgroundColor: "{colors.pure-white}"
    rounded: "{rounded.medium}"
---

# Design System: Šrilanka.lv

## Overview

**Creative North Star: "A postcard from a friend who lives there"**

Everything on Šrilanka.lv reads like a personal message from one real person, not a travel brand. The visual system supports that: a warm near-white paper ground, espresso-dark ink with a faint red undertone, and a single coral accent that carries every action and link. Real photography from Sri Lanka does the atmospheric work; the UI itself stays quiet, flat, and warm so the photos and the host's voice lead.

The system is theme-paired: a light theme (approved, canonical) and a dark theme driven by the same 10-slot color contract (`background`, `foreground`, `primary`, `primaryForeground`, `secondary`, `secondaryForeground`, `accent`, `accentForeground`, `error`, `errorForeground`) defined once in `src/shared/styles/tokens/colors.ts` and applied via vanilla-extract themes. There are no per-component dark overrides; the contract is the single source of truth.

**Key Characteristics:**
- One coral accent (#ee5253), identical in both themes
- Warm neutrals everywhere; nothing pure black, nothing cool-toned
- Flat surfaces, whisper-quiet shadows, hairline dividers via `color-mix`
- Real photos with dark scrims for text legibility; UI recedes behind them

## Colors

A single warm accent over quiet warm neutrals; the palette whispers so the photography and the coral can speak.

### Primary
- **Coral** (`oklch(65.17% 0.192 23.82)` / #ee5253): the one brand accent. Links, primary buttons, highlights, the link-hover bar. Used identically in light and dark themes; its rarity against quiet surfaces is the identity.

### Neutral
- **Warm Paper** (`oklch(98.96% 0.002 17.19)` / #fdfbfb): light page background; also the primary text color in dark mode. Faintly warm, never pure white.
- **Espresso Ink** (`oklch(15.53% 0.050 25.04)` / #1d0303): light-mode body text; a red-black, not a neutral black.
- **Deep Maroon** (`oklch(19.03% 0.056 24.12)` / #280707): light-mode strong text (footer, nav, FAQ items) and hairline borders at 10% via `color-mix`.
- **Warm Stone** (`oklch(97% 0.001 106.424)` / #f5f5f4): light-mode secondary surface; secondary buttons, subtle dividers, input borders.
- **Pure White** (#ffffff): light-mode filled-card surface.
- **Dark theme neutrals**: an elevation ladder on one warm hue (27°) at whisper chroma (0.008): page `dark-bg` (`oklch(15% 0.008 27)` / #0e0a09) → card `dark-surface` (`oklch(19% 0.008 27)` / #171212) → raised/hover `dark-raised` (`oklch(23% 0.008 27)` / #211c1b) → hairline `dark-border` (`oklch(27% 0.008 27)` / #2a2524); text `dark-text` (#fdfbfb). Never pure #000; the warmth is a trace, not a color.

### Named Rules
**The One Coral Rule.** Coral #ee5253 is the only saturated UI color and does not change between themes. No second accent is ever introduced.
**The Warm Neutral Rule.** Every neutral carries a trace of warmth (red-to-stone hues, 17-56°); pure `#000`, pure grays, and cool/blue tints are off-brand.

## Typography

**Display Font:** Comme (variable, via next/font `--font-comme`)
**Body Font:** Comme

**Character:** A single humanist sans carries the whole site; hierarchy comes from size and weight, never from a second family. Friendly, unfussy, legible.

### Hierarchy
- **Body** (400, 1rem, 1.5): article and UI text.
- **Label** (500, 0.875rem, 1): buttons and small UI labels.
- Scale runs 0.625rem–8rem in Tailwind-style steps (`xxs`–`9xl`); headings pick from the upper steps with tight (1.25) line-height.

## Layout

Content-led pages inside a centered container; breakpoints at 20/30/40/48/64/80/96rem. Spacing follows a 0.25rem-based scale (`1`–`64`). Density is relaxed and editorial: generous section padding (3-4rem+), hero imagery full-bleed with overlaid header on md+.

## Elevation & Depth

Effectively flat with tonal layering. Shadows exist but are whisper-quiet (5% alpha), used on cards only. Depth is conveyed by surface color steps and hairline borders (`color-mix(in oklch, <primary> 10%, transparent)`), not by shadow strength. Photo sections use black gradient scrims (theme-independent) for text legibility.

### Shadow Vocabulary
- **small** (`0 1px 2px 0 rgb(0 0 0 / 0.05)`): barely-there lift.
- **medium** (`0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)`): default card shadow.
- **large** (`0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)`): hover/raised cards.

### Named Rules
**The Whisper Shadow Rule.** All shadows stay at 5% alpha. If an element needs more separation, change its surface color, not its shadow.

## Shapes

Gently rounded corners in three steps: small (0.25rem) for chips and focus outlines, medium (0.5rem) for buttons and cards, large (0.75rem) for feature panels. Hairline 1px borders; no heavy strokes.

## Components

### Buttons
- **Shape:** medium radius (0.5rem), 1px transparent border reserved for outline variant
- **Primary:** coral background, light text, opacity 0.9 on hover
- **Secondary:** warm-stone background, stone-ink text, opacity 0.8 on hover
- **Outline / Ghost:** transparent background, foreground text, warm-stone fill on hover
- **Sizes:** small (xs text), medium (sm text), large (base text)

### Cards / Containers
- **Corner Style:** medium radius (0.5rem)
- **Background:** filled = `primaryForeground` slot (white in light, stone-900 in dark); outline = transparent with 1px foreground border
- **Shadow Strategy:** whisper shadows (see Elevation)

### Inputs / Fields
- **Style:** page-background fill, 1px secondary border, medium radius
- **Focus:** lime focus ring (`oklch(76.8% 0.233 130.85)`, 0.1rem, 0.5rem offset)
- **Error:** error-red border and message text

### Navigation
- **Links:** foreground/primary text; coral on hover/active. Global link treatment: **The Coral Bar Rule** — every content link carries a coral bottom bar (0.25rem) that grows to full height on hover while the text flips to the background color. In light mode the bar sits over the glyphs with `mix-blend-mode: color-dodge`; in dark mode the dodge would blow out to neon red, so the bar renders as solid coral beneath the text (`darkThemeSelector` override in `global.css.ts`: normal blend, z-index -1, isolated link).
- **Header over photos:** `with-overlay` variant uses whitesmoke text with `mix-blend-mode: luminosity` and a top black gradient scrim on md+.

## Do's and Don'ts

### Do:
- **Do** keep coral #ee5253 as the only saturated color in both themes.
- **Do** keep every neutral warm (hue 17-56°); tint, never pure black or white surfaces (the sole exception is the light filled card, which is #fff by design).
- **Do** create separation with surface steps and 10% `color-mix` hairlines.
- **Do** put text over photos only with a black gradient scrim.

### Don't:
- **Don't** introduce cool/blue-tinted neutrals; they fight the brand's warmth.
- **Don't** raise shadow alpha above 5%.
- **Don't** add per-component dark-mode color overrides; all theme colors flow through the 10-slot contract in `tokens/colors.ts`.
- **Don't** author or alter Latvian copy as part of design work; copy is owned by the host.

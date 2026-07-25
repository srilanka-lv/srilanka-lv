---
target: dark theme (theme.dark.css.ts)
total_score: 12
max_score: 24
na_heuristics: 2,5,7,10
p0_count: 1
p1_count: 2
timestamp: 2026-07-25T14-02-28Z
slug: pps-web-src-shared-styles-themes-theme-dark-css-ts
---
Method: dual-agent (A: design-review subagent · B: detector subagent). Browser overlay injection skipped: pipeline ran against headless Playwright screenshots; no mutation-capable user-visible tab was part of this run.

Target: the dark theme (apps/web/src/shared/styles/themes/theme.dark.css.ts), assessed on the PRE-CHANGE baseline screenshots (design-review/baseline/*-dark.png). All P0/P1/P2 issues below were fixed in this same session; see design-review/after/ for the result.

## Design Health Score (old dark theme)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Resting-state affordances (input, hero CTA) invisible until interacted with |
| 2 | Match System / Real World | n/a | unchanged by a re-theme |
| 3 | User Control and Freedom | 1 | No theme toggle; no in-product escape from broken dark pages |
| 4 | Consistency and Standards | 1 | Light pastel panels under dark text; green accentForeground/focus vs single-coral brand; dodged neon underline vs coral text |
| 5 | Error Prevention | n/a | unchanged by a re-theme |
| 6 | Recognition Rather Than Recall | 2 | Surfaces ~1.05:1 and borders ~1.1:1 imperceptible; structure must be inferred from text |
| 7 | Flexibility and Efficiency | n/a | unchanged by a re-theme |
| 8 | Aesthetic and Minimalist Design | 2 | Red-on-red monotone; eight neon underline bars; single max-contrast text tier |
| 9 | Error Recovery | 3 | Error token ~6.9:1 on ground, fine |
| 10 | Help and Documentation | n/a | not a theming concern |
| **Total** | | **12/24** | **Acceptable (50%)** |

## Design Specificity Verdict

LLM assessment: the old dark theme was an arithmetic inversion of the light design, not a designed dark mode: elevation derived from mixing the accent into the background (so "elevated" meant "more red"), dead 5%-black shadows, a text token doubling as a card surface, and light-tuned mechanisms (color-dodge underline, background-colored hero CTA) left running in an environment they were never tuned for.

Deterministic scan: 12 findings (9 advisory, 3 warning). 8x design-system-color (photo scrims rgba-black x5 — false-positive-grade, normal scrim pattern; #9fb3a1 products chip and #20bf6b trip-page green x2 — genuine but intentional theme-independent drift), 1x design-system-radius (footer 100px), 1x design-system-font (SFMono in reset stack — false positive), 1x side-tab (blockquote border-left — conventional editorial typography, false positive), 1x broken-image (Next.js getImageProps pattern — false positive). Detector handled vanilla-extract .css.ts correctly; no Tailwind-assuming rules fired.

## Priority Issues (all resolved this session)

- [P0] Products page unreadable in dark (near-white foreground on hardcoded pastel panels, ~1.02–1.15:1) → FIXED: panel ink pinned to the light theme's foreground literal; 17.7–18.5:1.
- [P1] No elevation ladder; surfaces accent-tinted; borders imperceptible → FIXED: neutral warm ladder bg 15% → surface 19% → raised 23% → border 27% (hue 27°, chroma 0.008); contract widened with surface/border slots.
- [P1] Hero CTA camouflaged (background-token fill, near-black pill on photo) → FIXED: pinned to light-theme literals (white pill, espresso ink) in both themes.
- [P2] accentForeground dark olive #192e03 on coral, 4.15:1 (AA fail) and off-brand green → FIXED: near-black warm ink oklch(15% 0.008 27), 5.6:1.
- [P2] color-dodge underline renders neon pure red on dark surfaces → FIXED: dark-scoped mix-blend-mode normal; solid brand coral.
- [P2, cross-cutting] Header with-overlay mobile ink used the background token (near-black on photo) → FIXED: pinned light literal.

## Persona Red Flags (old theme)

Sam (a11y): products page inaccessible end-to-end; structure imperceptible; newsletter field undiscoverable pre-focus; button label under AA. Casey (mobile): hero CTA invisible at a glance; neon bars outrank titles. Zane (project persona, night reading): halation from single max-contrast text tier; liver-red emergency register at night.

## Remaining observations (documented, out of this re-tint's scope)

- No muted text tier exists in the system; adding one would change light mode (frozen). Candidate for a future two-theme pass.
- focus.color is shared lime across themes (8.7–10:1 on all dark surfaces — functional; brand-purity question only).
- Light mode's own AA failures (white-on-coral buttons 3.4:1, sage chip 2.0:1, coral-on-pastel links ~3.2:1) exist and are frozen with light mode.
- Photo dimming for dark (e.g. brightness(0.9)) is a taste option, not applied.
- "Partnerships" empty heading and "About Me Page" placeholder copy are content issues owned by the site owner.
- errorForeground duplicates error in both palettes (unused pair), left as found.

## Score expectation

Re-run the critique against design-review/after/ to measure the post-fix theme; heuristics 4/6/8 should move materially (contrast: 23/23 programmatic checks pass; axe color-contrast clean on all five dark pages outside the theme-independent pastel panels).

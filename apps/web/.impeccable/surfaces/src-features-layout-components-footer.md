---
version: 1
slug: "src-features-layout-components-footer"
primary_target: "src/features/layout/components/footer"
related_targets: ["src/features/layout/components/footer-products","src/features/layout/components/footer-links","src/features/layout/components/footer-socials"]
---

# Surface: site-wide footer (apps/web layout)

Mode: Persuade. The footer closes every page; its job is converting reader trust into a product click.

Audience and job: the reader (young Latvian solo female traveler) just finished an article or guide page. Primary action: open one of Grieta's three products. Fallbacks in order: guide links (wayfinding + SEO), newsletter signup, socials (@dzivetropos).

Content and proof: products come from `products-page/index.data.ts` (copy owned by Grieta; reuse only, never author new Latvian). Her about text, profile photo, and signature SVG are the trust block. Guide links are the `visibleInNavigation: false` items in `navigation/index.data.tsx`. Social profiles are real channels. No testimonials exist; never fabricate proof.

Chosen direction: products-led footer inside the incumbent world. Full-bleed band tinted with `color-mix` accent 4% and a primary-mix hairline; three product cards lead (cutout thumbnail on accent-tint panel, subtitle chip, two-line clamped title, coral "Vairāk informācijas →"); below a hairline: Grieta column, guide-links column, newsletter + socials column; sub-footer closes. Cards opt out of the global coral-bar link treatment and use lift + image scale + accent border on hover. Guide links use a quiet accent-tinted underline; the native coral bar stays reserved for headings and CTA links. Cards: mobile is a 96px-image row layout, md+ a vertical card.

Memorable moment: the three cutout product cards standing on their tinted panels at the end of every page.

Unresolved: footer-length product titles need Grieta's copy (title 2 clamps mid-phrase); "Mūsu produkti" is "we"-voice while the brand voice is her singular; light/dark theme SSR hydration mismatch is a pre-existing site bug outside this surface.

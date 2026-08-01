---
version: 1
slug: "route-par-mani"
primary_target: "route:/par-mani"
related_targets: ["src/app/about-me","src/shared/components/about-page"]
---

# Surface brief: /par-mani (About Me)

- Scope: public LV route `/par-mani`, internal route `apps/web/src/app/about-me`, components `apps/web/src/shared/components/about-page*`. Visitor mode: Persuade.
- Audience and job: young Latvian solo female travelers deciding whether to trust Grieta. Job: read her story, believe "she lives there, she is one of us", continue to the girls' trip or the blog.
- Action: in-copy links to the personalized plan and girls' trip products; postcard links to the trip page and /blogi; SectionBlogs feed closes the page.
- Proof and content: her letter verbatim (all Latvian copy owned by Grieta; design never edits it, order preserved); real photography from `public/images`; her ink signature (shared `Signature` component).
- Constraints: Sanity `pages` doc (slug `par-mani`) supplies only SEO/OG fields, body intentionally disabled; no em dashes; feminine forms; hero photo is a stand-in awaiting Grieta's beach portrait (marked in code).
- Chosen direction (seed 27914f7a, candidate 7/7): immersive photo-scroll. 65ch warm-paper letter passages break into full-bleed scrimmed photo interludes that carry her standalone turn lines as h2s; whitesmoke luminosity type over photos; signature sign-off; two postcard interlinks. One authored motion moment: turn lines settle in via scroll-driven CSS (view timeline), reduced-motion safe.
- Memorable moment: "Tieši tāpēc radās srilanka.lv" staged over the coral sunset surf photo.
- Unresolved: Sanity `seo.metaTitle`/`metaDescription` empty (page title falls back to bare default); hero photo swap pending; new image alt texts need Grieta's review; "Esmu bijis"/"kurš pats" masculine forms in her copy and the Sanity description flagged to the owner.

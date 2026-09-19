# Media shot list for /celojums-uz-srilanku

For Grieta and Dave. Most photo slots are filled as of 2026-09-19; the open ones are listed below.

Photos go in `apps/web/public/images/guide/`. Export as WebP where possible; keep the hero under 200 KB.

## Photos

Landed 2026-09-19 as WebP, 1920 × 1080, in `public/images/guide/`, named as exported (`srilanka-lv_<scene>.webp`), not by slot:

| Slot | File |
|---|---|
| hero | `srilanka-lv_madihas-pludmale.webp` (188 KB) |
| map | `srilanka-lv_lidojums-riga-parsesanas-stambula-galamerkis-srilanka-colombo.webp` |
| infographic-season | `srilanka-lv_sezonas-srilanka-salidzinajuma-ar-latviju.webp` |
| beach-madiha | `srilanka-lv_makskernieks-bauda-saulrietu-srilanka.webp` |
| beach-mirissa | `srilanka-lv_populara-vieta-srilanka-kokosriekstu-palmu-kalns.webp` |
| beach-weligama | `srilanka-lv_meitenes-serfo-weligama.webp` |
| food | `srilanka-lv_latviesu-ediens-un-srilankas-ediens.webp` |
| spices | `srilanka-lv_plucu-tejas-lapas-srilanka.webp` |
| group | `srilanka-lv_meitenu-celojums.webp` |

The route-map and cost-infographic figures were removed from the page; the tables carry those numbers.

Still open:

| Filename | Size | What |
|---|---|---|
| author portrait | 800 × 800 | Optional. The author box now uses the footer's real profile photo (400 × 400). A dedicated square shot, seja centrā, would let it render sharper at 96 px; change `portraitSrc` in `page.tsx`. |
| route map | 1920 × 1080 | Optional. Maršruta karte ar sešām pieturām, 14 dienas. Would need its `GuideFigure` and `images` entry added back. |
| cost infographic | 1920 × 1080 | Optional. 14 dienu izmaksu infografika, tie paši skaitļi, kas tabulā. Same as above. |

Alt texts and captions were written from the photos on 2026-09-19 and need Grieta's read.

## Videos

Removed from the page on 2026-09-19 so it could launch without placeholder clips. When the clips exist, add them back: `videos` and `videoList` in `index.data.tsx`, three `<GuideVideo>` blocks in `page.tsx` (after the intro paragraph, after the south coast intro, after the transport intro), and the `videos` prop plus `buildVideoObject` mapping in `guide-json-ld.tsx`. The `GuideVideo` component is still in `shared/components`.

Three clips, 60 to 90 seconds, uploaded to YouTube. The page uses a click-to-load facade, so a video costs nothing until someone presses play.

| Slot | Title on YouTube | What is in it |
|---|---|---|
| `videos.intro` | Ceļojums uz Šrilanku: kas es esmu | Grieta alone on the beach in Madiha: who she is, how long she has lived here, what the guide covers. The page speaks in her voice only, so Dave should not appear or be named in this clip. |
| `videos.southCoast` | Ceļojums uz Šrilanku: dienvidu piekraste | Madiha, Mirisa, Veligama, Unavatuna from the ground. |
| `videos.transport` | Ceļojums uz Šrilanku: tuk-tuks un vilciens | A tuk-tuk ride on the coast road and a train ride in the hills. |

Each clip goes up twice: the horizontal cut for the page, and the vertical Instagram cut as a YouTube Short with "Šrilanka" at the start of the title. The "šrilanka" results page carries a short-videos carousel, and Shorts are how a small channel enters it.

The upload date is required per clip: without it the VideoObject schema is dropped.

## Audio

Not used on the page. There is no audio block, and audio has no ranking effect. If you record something, it is better as a YouTube clip or an Instagram reel.

## Facts still owed

None as of the evening of 2026-09-19. The souvenirs paragraph, three testimonials (Inese A., Elza A., Artūrs B., with portraits in `public/images/guide/`), the temperature table and the email copy all landed. No `GuideTodo` marks remain on the page.

The per-beach "Nakts no" column was removed on 2026-09-19: beaches are free, so the column had nothing honest to say.

## The PDF signup block

An inline block sits after the south coast section: leave an email, get the PDF. It is not a pop-up, on purpose, because a pop-up would add interaction cost to a page tuned for Core Web Vitals and would interrupt the reader.

How it works since 2026-09-19:

- The reader's address goes into the Resend audience (same list as the footer form), then one transactional email goes out from `sveiki@srilanka.lv` with a link to the PDF. srilanka.lv is verified on Resend in eu-west-1; the sender lives in `features/newsletter/constants/sender.ts`.
- The PDF is hosted on Google Drive (My Drive > Clients > SriLanka.lv), shared as "anyone with the link, viewer". Upload the 5 MB compressed export, not the 44 MB original. The `/view` link goes into `GUIDE_PDF_URL` in `guide-lead-magnet/constants/guide-pdf-email.ts`; a unit test fails while the placeholder is still there.
- The email copy in that same file was approved on 2026-09-19.
- Free tier limits: 100 emails a day, 3,000 a month, 1,000 contacts across both forms.

## Added after Grieta's proofread, 13 September

Two new sections are on the page: "Ko redzēt Šrilankā: galvenās vietas" and "Ko darīt Šrilankā: aktivitātes". Both are tables of named places and activities, so they need Grieta's eye on two things: whether the verdict column reads as hers, and whether anything she would actually recommend is missing.

The whole page was also rewritten to address any Latvian speaker rather than a woman. Grieta's own voice stays in the first person feminine, and the girls-trip section keeps its framing.

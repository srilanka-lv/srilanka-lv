# Media shot list for /celojums-uz-srilanku

For Grieta and Dave, week of 2026-09-14. Every slot below is already on the page as a labelled placeholder. Replace the file, keep the filename and the pixel size, and the page picks it up with no code change.

Photos go in `apps/web/public/images/guide/`. Export as WebP where possible; keep the hero under 200 KB.

## Photos

| Filename | Size | What |
|---|---|---|
| `hero.webp` | 3456 × 2234 | Madihas pludmale saullēktā. Šis ir LCP elements, tāpēc tam jābūt vieglam. |
| `map.webp` | 1920 × 1080 | Karte: Rīga, pārsēšanās punkts, Kolombo. |
| `route.webp` | 1920 × 1080 | Maršruta karte ar sešām pieturām, 14 dienas. |
| `beach-madiha.webp` | 1920 × 1080 | Madihas pludmale. |
| `beach-mirissa.webp` | 1920 × 1080 | Mirisa, Coconut Tree Hill vai līcis saulrietā. |
| `beach-weligama.webp` | 1920 × 1080 | Veligama, sērfotāji iesācēji. |
| `food.webp` | 1920 × 1080 | Rice and curry uz banānu lapas vietējā ēstuvē. |
| `spices.webp` | 1920 × 1080 | Garšvielu tirgus vai tējas plantācija. |
| `group.webp` | 1920 × 1080 | Grupas foto no iepriekšējā meiteņu ceļojuma. |
| `infographic-season.webp` | 1920 × 1080 | Sezonu infografika ar tiem pašiem skaitļiem, kas tabulā. |
| `infographic-cost.webp` | 1920 × 1080 | 14 dienu izmaksu infografika, tie paši skaitļi, kas tabulā. |
| `author.webp` | 800 × 800 | Grieta, kvadrāts, seja centrā (rāda kā apli 96 px). Tikai Grieta: lapa ir rakstīta viņas vienskaitļa balsī. |

When a file lands, change the `src` and the extension in `src/app/sri-lanka-travel-guide/page.tsx` (and in `images` in `index.data.tsx` for the structured data). Write a real Latvian `alt` that describes the scene, not the keyword.

## Videos

Three clips, 60 to 90 seconds, uploaded to YouTube. The page uses a click-to-load facade, so a video costs nothing until someone presses play.

| Slot | Title on YouTube | What is in it |
|---|---|---|
| `videos.intro` | Ceļojums uz Šrilanku: kas es esmu | Grieta alone on the beach in Madiha: who she is, how long she has lived here, what the guide covers. The page speaks in her voice only, so Dave should not appear or be named in this clip. |
| `videos.southCoast` | Ceļojums uz Šrilanku: dienvidu piekraste | Madiha, Mirisa, Veligama, Unavatuna from the ground. |
| `videos.transport` | Ceļojums uz Šrilanku: tuk-tuks un vilciens | A tuk-tuk ride on the coast road and a train ride in the hills. |

Each clip goes up twice: the horizontal cut for the page, and the vertical Instagram cut as a YouTube Short with "Šrilanka" at the start of the title. The "šrilanka" results page carries a short-videos carousel, and Shorts are how a small channel enters it.

Then in `index.data.tsx` swap `url` and `uploadDate` per clip. The upload date is required: without it the VideoObject schema is dropped.

## Audio

Not used on the page. There is no audio block, and audio has no ranking effect. If you record something, it is better as a YouTube clip or an Instagram reel.

## Facts still owed

Every one of these shows as a yellow mark on the page. Search the page for `GuideTodo`.

1. Population figure and its year.
2. Rupee to euro rate with the date.
3. The exact ETA fee in USD from the official site.
4. PickMe fare from the airport to Madiha.
5. Unit prices: rice and curry, a beer, 1.5 l water, a coconut, a villa night, whale watching, safari.
6. A night's price for each of the seven south coast beaches.
7. Grieta: the one place or activity she would skip, and why.
8. Grieta: what she brings home for friends, two or three sentences.
9. Three quotes from past girls-trip participants, with first names and permission.
10. The Instagram link in the author box.
11. Confirm or replace the south coast temperature table.
12. Prices for the activities table: sērfošanas nodarbība, dēļa noma, vaļu vērošana, niršana, safari, krokodilu tūre, sikspārņu vakars, masāža, gatavošanas meistarklase, bruņurupuču vērošana, gredzenu darbnīca, SUP.
13. Grieta: one more activity she does not recommend, and why.
14. The south coast PDF itself, plus one line describing what is in it (the signup block asks for both).

## The PDF signup block

An inline block sits after the south coast section: leave an email, get the PDF. It is not a pop-up, on purpose, because a pop-up would add interaction cost to a page tuned for Core Web Vitals and would interrupt the reader.

Two things are still placeholders:

- **The file.** Find it, and decide what it still offers that the page does not. The page now covers seven beaches with prices, so the overlap is large. If the honest answer is "not much", fold the good parts into the page and drop the PDF instead.
- **The delivery.** The email address is captured today, but nothing is sent. `shared/components/guide-lead-magnet/actions/request-guide-pdf.ts` carries the four steps needed to wire it. Do not remove the yellow marks from the block until sending actually works: the copy promises a file.

If the PDF does ship, serve it so Google cannot index it, otherwise it competes with the page for the same south coast queries. Delivering it through an API route gets that for free, since robots.txt already disallows `/api/`.

## Added after Grieta's proofread, 13 September

Two new sections are on the page: "Ko redzēt Šrilankā: galvenās vietas" and "Ko darīt Šrilankā: aktivitātes". Both are tables of named places and activities, so they need Grieta's eye on two things: whether the verdict column reads as hers, and whether anything she would actually recommend is missing.

The whole page was also rewritten to address any Latvian speaker rather than a woman. Grieta's own voice stays in the first person feminine, and the girls-trip section keeps its framing.

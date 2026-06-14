# YouTube embed block for Portable Text

**Date:** 2026-06-14
**Status:** Approved (design)

## Summary

Add a custom `youTube` block to the Sanity Portable Text editor so content
editors can drop a YouTube video into page and blog-post body content. The
block carries a video URL and an optional caption. On the public site it renders
with `react-player` inside a responsive 16:9 wrapper; in the Studio it shows a
simple text + thumbnail preview.

This follows the approach in the Sanity guide
(<https://www.sanity.io/docs/developer-guides/portable-text-how-to-add-a-custom-youtube-embed-block>),
adapted to this monorepo's conventions (shared `@srilanka/sanity` schema
package, vanilla-extract styling, Next 16 App Router).

## Decisions

- **Frontend rendering:** `react-player` (the docs approach). Accepts heavier
  client JS in exchange for a familiar, flexible player.
- **Schema fields:** `url` (required) + `caption` (optional).
- **Studio preview:** simple — text (caption/URL) plus the video's YouTube
  thumbnail. No `react-player` / `@sanity/ui` added to the Studio.

## Architecture

The codebase already has the exact pattern for custom Portable Text objects
(`imageGallery`, `stlTableBlock`):

1. Object schema defined in `packages/sanity/src/schemas/objects/`.
2. Registered in `packages/sanity/src/schemas/index.ts`.
3. Added as an array member in `packages/sanity/src/schemas/objects/block-content.ts`.
4. Rendered in `apps/web/src/features/sanity/components/portable-text/index.tsx`
   via the `types` map.
5. Types regenerated into `packages/sanity/src/sanity.types.ts`.

The `youTube` type slots into every one of these seams.

## Components

### 1. Schema — `packages/sanity/src/schemas/objects/youtube.ts`

New `youTube` object type (mirrors `imageGallery`):

- `name: 'youTube'`, `type: 'object'`, `title: 'YouTube Embed'`.
- `icon: PlayIcon` from `@sanity/icons` (available via the `sanity` dep).
- Fields:
  - `url` — `type: 'url'`, required. Validation:
    `rule.required().uri({ scheme: ['http', 'https'] })` plus a `.custom()`
    rule that calls `getYouTubeVideoId(url)` and returns an error message
    ("Enter a valid YouTube video URL") when no ID can be parsed. This stops a
    broken embed from being saved silently.
  - `caption` — `type: 'string'`, optional.
- `preview`:
  - `select: { url: 'url', caption: 'caption' }`.
  - `prepare({ url, caption })` returns:
    - `title`: `caption || 'YouTube video'`.
    - `subtitle`: `url`.
    - `media`: an `<img>` of `https://img.youtube.com/vi/<id>/hqdefault.jpg`
      when an ID is parseable, otherwise `PlayIcon`. Implemented with
      `createElement` (no JSX) to keep the shared package's `.ts`-only setup,
      or as a `.tsx` if the package's tsconfig already enables JSX — whichever
      is cleaner once verified. No new dependency either way (just an image).

### 2. Helper — `packages/sanity/src/schemas/utils/youtube-video-id.ts`

`getYouTubeVideoId(url: string): string | null`. Handles:

- `https://youtu.be/<id>`
- `https://www.youtube.com/watch?v=<id>`
- `https://www.youtube.com/embed/<id>`
- `https://www.youtube.com/shorts/<id>`

Returns the 11-char video ID or `null`. Used by the schema's validation and
preview. (The frontend does not need it — `react-player` consumes the full URL.)

### 3. Registration

- `schemas/index.ts`: import `youTube`, append to the `schemas` array.
- `objects/block-content.ts`: add `defineArrayMember({ type: 'youTube' })` to
  `of[]`, after `stlTableBlock`.

### 4. Generated types

Regenerate `packages/sanity/src/sanity.types.ts` via the project's Sanity
typegen step (confirm exact script during implementation; do not hand-edit).

### 5. Frontend — web app

- Add `react-player` (v3, `src`-prop API) to `apps/web` dependencies.
- New client island
  `apps/web/src/features/sanity/components/youtube-embed/index.tsx`:
  - `'use client'`.
  - Loads `react-player` via `next/dynamic(() => import('react-player'),
    { ssr: false })` so it is code-split out of the initial bundle and avoids
    server-side `window` access / hydration mismatch.
  - Props: `{ url: string; caption?: string }`.
  - Renders a `<figure>` → 16:9 aspect-ratio wrapper containing the player
    (`width="100%" height="100%"`), plus a `<figcaption>` when `caption` is set
    (mirrors the existing `image` block).
- Wire into `portable-text/index.tsx` `types` map:
  `youTube: ({ value }) => <YouTubeEmbed url={value.url} caption={value.caption} />`.

### 6. Styles — `portable-text/styles.css.ts`

vanilla-extract, wrapped in `inComponentsLayer`, `style(...)` exports end in
`Style`:

- `youtubeFigureStyle` — figure layout, matching `inlineImageFigureStyle`'s
  margins/spacing.
- `youtubeWrapperStyle` — `aspectRatio: '16 / 9'`, `width: 100%`, rounded
  corners + `overflow: hidden` to match image styling.
- Reuse `inlineImageCaptionStyle` for the caption.

## Data flow

Editor enters a YouTube URL → schema validates it parses to a video ID →
stored as `{ _type: 'youTube', url, caption? }` in body content → GROQ query
returns it in the Portable Text array → `PortableText` `types.youTube` renders
`<YouTubeEmbed>` → `react-player` plays the video, responsive 16:9, optional
caption below.

## Error handling

- Invalid / non-YouTube URL: blocked at the Studio with a validation message.
- Missing `url` at render time: `YouTubeEmbed` returns `null` (defensive,
  matching how the `image`/`stlTableBlock` renderers guard on missing data).
- `react-player` SSR: avoided via `dynamic(..., { ssr: false })`.

## Testing / verification

- **Studio:** add a YouTube block; confirm URL validation rejects a bad URL and
  the preview shows the caption/URL + thumbnail.
- **Web:** typecheck the workspace; load a page containing the block and confirm
  the video plays, is responsive, and the caption renders when present.
- Per `apps/web/AGENTS.md`, check the Next 16 docs in `node_modules/next/dist/docs/`
  before writing the client-component / dynamic-import code.

## Out of scope (YAGNI)

Playlists, start-time / timestamp, autoplay, privacy-enhanced (`youtube-nocookie`)
toggle, custom poster image, non-YouTube providers. All addable later without
reworking this structure.

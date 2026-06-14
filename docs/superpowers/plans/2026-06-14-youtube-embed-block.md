# YouTube Embed Block Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a custom `youTube` block to Sanity Portable Text so editors can embed a YouTube video (with optional caption) into body content, rendered on the public site with `react-player`.

**Architecture:** A `youTube` object schema is added to the shared `@srilanka/sanity` package alongside `imageGallery`/`stlTableBlock`, registered in the schema list and `blockContent` array, then surfaced in generated types via Sanity typegen. The web app renders it through the existing Portable Text `types` map using a `'use client'` island that lazy-loads `react-player` (`ssr: false`).

**Tech Stack:** Sanity v6 schema (`defineType`/`defineField`), Sanity typegen, Next 16 App Router (`next/dynamic`), `react-player` v3, vanilla-extract, Bun (test runner + package manager), Biome (lint).

---

## Conventions for every task

- **Branch/staging:** The working tree already contains unrelated WIP. Each commit step stages **only the exact files listed** (never `git add -A`). Work continues on the current `development` branch.
- **Commit format:** Conventional Commits + gitmoji (commitlint + lint-staged run on commit). e.g. `feat: ✨ ...`. End commit messages with:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
- **Memory constraints to honor:** no barrel exports (import specific file paths); vanilla-extract `style(...)` exports end in `Style`; always use `{ }` for control-flow bodies.

---

## File structure

| File | Responsibility | Action |
| --- | --- | --- |
| `packages/sanity/src/schemas/utils/youtube-video-id.ts` | Pure helper: extract the 11-char video ID from any YouTube URL form | Create |
| `packages/sanity/src/schemas/utils/youtube-video-id.test.ts` | Unit tests for the helper (`bun:test`) | Create |
| `packages/sanity/src/schemas/objects/youtube.tsx` | The `youTube` object schema: fields, validation, preview | Create |
| `packages/sanity/src/schemas/index.ts` | Register `youTube` in the schema list | Modify |
| `packages/sanity/src/schemas/objects/block-content.ts` | Allow `youTube` as a Portable Text array member | Modify |
| `packages/sanity/src/sanity.types.ts` | Generated types (do not hand-edit) | Regenerate via typegen |
| `apps/web/src/features/sanity/components/youtube-embed.tsx` | `'use client'` island rendering `react-player` in a 16:9 figure | Create |
| `apps/web/src/features/sanity/components/portable-text/styles.css.ts` | Add `youtubeFigureStyle` / `youtubeWrapperStyle` + iframe-fill global style | Modify |
| `apps/web/src/features/sanity/components/portable-text/index.tsx` | Wire `youTube` into the `types` map | Modify |
| `apps/web/package.json` | Add `react-player` dependency | Modify (via `bun add`) |

---

## Task 1: YouTube video-ID helper (TDD)

**Files:**
- Create: `packages/sanity/src/schemas/utils/youtube-video-id.ts`
- Test: `packages/sanity/src/schemas/utils/youtube-video-id.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/sanity/src/schemas/utils/youtube-video-id.test.ts`:

```ts
import { describe, expect, test } from 'bun:test';

import { getYouTubeVideoId } from './youtube-video-id';

describe('getYouTubeVideoId', () => {
  test('parses youtu.be short links', () => {
    expect(getYouTubeVideoId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  test('parses watch URLs', () => {
    expect(getYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  test('parses embed URLs', () => {
    expect(getYouTubeVideoId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  test('parses shorts URLs', () => {
    expect(getYouTubeVideoId('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  test('keeps the id from watch URLs with extra query params', () => {
    expect(getYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s')).toBe(
      'dQw4w9WgXcQ',
    );
  });

  test('parses youtu.be links with a timestamp', () => {
    expect(getYouTubeVideoId('https://youtu.be/dQw4w9WgXcQ?t=42')).toBe('dQw4w9WgXcQ');
  });

  test('returns null for non-YouTube URLs', () => {
    expect(getYouTubeVideoId('https://vimeo.com/12345678')).toBeNull();
  });

  test('returns null for malformed input', () => {
    expect(getYouTubeVideoId('not a url')).toBeNull();
  });

  test('returns null for empty input', () => {
    expect(getYouTubeVideoId('')).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `bun test packages/sanity/src/schemas/utils/youtube-video-id.test.ts`
Expected: FAIL — `Cannot find module './youtube-video-id'` (file not created yet).

- [ ] **Step 3: Write the minimal implementation**

Create `packages/sanity/src/schemas/utils/youtube-video-id.ts`:

```ts
const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'm.youtube.com',
  'youtube-nocookie.com',
]);

export function getYouTubeVideoId(url: string): string | null {
  if (!url) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, '');
  let id: string | null = null;

  if (host === 'youtu.be') {
    id = parsed.pathname.slice(1);
  } else if (YOUTUBE_HOSTS.has(host)) {
    if (parsed.pathname === '/watch') {
      id = parsed.searchParams.get('v');
    } else if (parsed.pathname.startsWith('/embed/')) {
      id = parsed.pathname.split('/')[2] ?? null;
    } else if (parsed.pathname.startsWith('/shorts/')) {
      id = parsed.pathname.split('/')[2] ?? null;
    }
  }

  if (id && YOUTUBE_ID_PATTERN.test(id)) {
    return id;
  }

  return null;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `bun test packages/sanity/src/schemas/utils/youtube-video-id.test.ts`
Expected: PASS — 9 tests pass.

- [ ] **Step 5: Commit**

```bash
git add packages/sanity/src/schemas/utils/youtube-video-id.ts packages/sanity/src/schemas/utils/youtube-video-id.test.ts
git commit -m "feat: ✨ add getYouTubeVideoId helper

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: youTube object schema

**Files:**
- Create: `packages/sanity/src/schemas/objects/youtube.tsx`

Note: this file is `.tsx` because the preview returns a thumbnail `<img>` element. The shared package's tsconfig already enables `jsx: react-jsx` and includes `src/**/*.tsx`.

- [ ] **Step 1: Create the schema**

Create `packages/sanity/src/schemas/objects/youtube.tsx`:

```tsx
import { PlayIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { getYouTubeVideoId } from '../utils/youtube-video-id';

export const youTube = defineType({
  name: 'youTube',
  type: 'object',
  title: 'YouTube Embed',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ['http', 'https'] })
          .custom((value) => {
            if (!value) {
              return true;
            }
            return getYouTubeVideoId(value) ? true : 'Enter a valid YouTube video URL';
          }),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
  ],
  preview: {
    select: { url: 'url', caption: 'caption' },
    prepare({ url, caption }) {
      const id = typeof url === 'string' ? getYouTubeVideoId(url) : null;

      return {
        title: caption || 'YouTube video',
        subtitle: typeof url === 'string' ? url : 'No URL set',
        media: id ? (
          <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt="" />
        ) : (
          PlayIcon
        ),
      };
    },
  },
});
```

- [ ] **Step 2: Lint the new file**

Run: `bunx biome check packages/sanity/src/schemas/objects/youtube.tsx`
Expected: No errors. (Fix any reported, e.g. import ordering, before continuing.)

- [ ] **Step 3: Commit (with registration in Task 3)**

Do not commit yet — Task 3 registers the type and regenerates types; commit them together so the repo is never in a state where the schema exists but is unreferenced. Proceed to Task 3.

---

## Task 3: Register the schema and regenerate types

**Files:**
- Modify: `packages/sanity/src/schemas/index.ts`
- Modify: `packages/sanity/src/schemas/objects/block-content.ts`
- Regenerate: `packages/sanity/src/sanity.types.ts`

- [ ] **Step 1: Register in the schema list**

In `packages/sanity/src/schemas/index.ts`, add the import (alphabetical with the other object imports) and append to the `schemas` array.

Add this import after the `seo` import line:

```ts
import { youTube } from './objects/youtube';
```

Add `youTube` to the `schemas` array (after `stlTableBlock`):

```ts
export const schemas: SchemaTypeDefinition[] = [
  blockContent,
  seo,
  openGraph,
  imageGallery,
  stlTableBlock,
  youTube,
  tags,
  faqs,
  pages,
  blogPosts,
];
```

- [ ] **Step 2: Allow youTube inside blockContent**

In `packages/sanity/src/schemas/objects/block-content.ts`, add a new array member after the `stlTableBlock` member (the last entry in `of`):

```ts
    defineArrayMember({ type: 'stlTableBlock' }),
    defineArrayMember({ type: 'youTube' }),
  ],
});
```

- [ ] **Step 3: Regenerate Sanity types**

Run: `bun studio:typegen`
Expected: completes without error; `apps/studio/schema.json` and `packages/sanity/src/sanity.types.ts` are updated.

> If it errors on a missing project ID/dataset, ensure `apps/studio/.env` has `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` set (the same values the Studio already uses for `bun studio:dev`), then re-run.

- [ ] **Step 4: Verify the generated type exists**

Run: `grep -n "YouTube\b\|youTube" packages/sanity/src/sanity.types.ts`
Expected: a generated `export type YouTube = { _type: "youTube"; ... url?: string; caption?: string; ... }` and `YouTube` appearing in the `BlockContent` union members.

- [ ] **Step 5: Lint changed files**

Run: `bunx biome check packages/sanity/src/schemas/index.ts packages/sanity/src/schemas/objects/block-content.ts`
Expected: No errors.

- [ ] **Step 6: Commit schema + registration + types**

```bash
git add packages/sanity/src/schemas/objects/youtube.tsx packages/sanity/src/schemas/index.ts packages/sanity/src/schemas/objects/block-content.ts packages/sanity/src/sanity.types.ts apps/studio/schema.json
git commit -m "feat: ✨ add youTube Portable Text schema block

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Frontend rendering with react-player

**Files:**
- Modify (via bun add): `apps/web/package.json`
- Create: `apps/web/src/features/sanity/components/youtube-embed.tsx`
- Modify: `apps/web/src/features/sanity/components/portable-text/styles.css.ts`
- Modify: `apps/web/src/features/sanity/components/portable-text/index.tsx`

- [ ] **Step 1: Add the react-player dependency**

Run: `cd apps/web && bun add react-player@^3.4.0 && cd -`
Expected: `react-player` appears in `apps/web/package.json` dependencies; `bun.lock` updated.

- [ ] **Step 2: Add styles**

In `apps/web/src/features/sanity/components/portable-text/styles.css.ts`, the existing file already imports `globalStyle` and `style` from `@vanilla-extract/css` and destructures `{ spacing, font, color, border }` from `vars`. Append these exports at the end of the file:

```ts
export const youtubeFigureStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
    margin: 0,
  }),
);

export const youtubeWrapperStyle = style(
  inComponentsLayer({
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 9',
    borderRadius: border.radius.large,
    overflow: 'hidden',
  }),
);

globalStyle(
  `${youtubeWrapperStyle} iframe`,
  inComponentsLayer({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    border: 0,
  }),
);
```

- [ ] **Step 3: Create the YouTubeEmbed client component**

Create `apps/web/src/features/sanity/components/youtube-embed.tsx`:

```tsx
'use client';

import dynamic from 'next/dynamic';

import {
  inlineImageCaptionStyle,
  youtubeFigureStyle,
  youtubeWrapperStyle,
} from './portable-text/styles.css';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

type YouTubeEmbedProps = {
  url?: string;
  caption?: string;
};

export function YouTubeEmbed({ url, caption }: YouTubeEmbedProps) {
  if (!url) {
    return null;
  }

  return (
    <figure className={youtubeFigureStyle}>
      <div className={youtubeWrapperStyle}>
        <ReactPlayer src={url} controls width="100%" height="100%" />
      </div>
      {caption ? <figcaption className={inlineImageCaptionStyle}>{caption}</figcaption> : null}
    </figure>
  );
}
```

- [ ] **Step 4: Wire youTube into the Portable Text components map**

In `apps/web/src/features/sanity/components/portable-text/index.tsx`:

(a) Add the import after the existing `TableView` import:

```tsx
import { YouTubeEmbed } from '../youtube-embed';
```

(b) Add the value type next to the existing `StlTableBlockValue` type:

```tsx
type YouTubeBlockValue = {
  url?: string;
  caption?: string;
};
```

(c) Add the renderer to the `types` object, after the `stlTableBlock` entry:

```tsx
    youTube: ({ value }: { value: YouTubeBlockValue }) => (
      <YouTubeEmbed url={value.url} caption={value.caption} />
    ),
```

- [ ] **Step 5: Lint changed/new web files**

Run:
```bash
bunx biome check apps/web/src/features/sanity/components/youtube-embed.tsx apps/web/src/features/sanity/components/portable-text/index.tsx apps/web/src/features/sanity/components/portable-text/styles.css.ts
```
Expected: No errors.

- [ ] **Step 6: Typecheck the web app**

Run: `cd apps/web && bunx tsc --noEmit; cd -`
Expected: No errors that reference `youtube-embed.tsx`, `portable-text/index.tsx`, or `styles.css.ts`. (The working tree has unrelated WIP; pre-existing errors in other files are out of scope — confirm none of the reported errors point at the files changed in this task.)

- [ ] **Step 7: Commit**

```bash
git add apps/web/package.json bun.lock apps/web/src/features/sanity/components/youtube-embed.tsx apps/web/src/features/sanity/components/portable-text/styles.css.ts apps/web/src/features/sanity/components/portable-text/index.tsx
git commit -m "feat: ✨ render youTube blocks with react-player

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Manual verification (no commit)

This task confirms the feature end-to-end. No code changes; if something fails, return to the relevant task.

- [ ] **Step 1: Studio — add a block**

Run: `bun studio:dev`
Then in a browser, open a Page or Blog Post document, add a **YouTube Embed** block to the body, and:
- Paste an invalid URL (e.g. `https://example.com`) → confirm the validation message "Enter a valid YouTube video URL" appears.
- Paste a valid URL (e.g. `https://www.youtube.com/watch?v=dQw4w9WgXcQ`) → confirm validation clears and the block's preview shows the title/URL and the video thumbnail.
- Optionally set a caption. Publish.

- [ ] **Step 2: Web — render the block**

Run: `bun web:dev`
Then open the page that contains the published YouTube block and confirm:
- The video player renders and plays on click.
- The embed is responsive (16:9, no overflow) at mobile and desktop widths.
- The caption (if set) renders below the video.

- [ ] **Step 3: Report**

Summarize the verification outcome (what was tested, pass/fail). The feature is complete when both Studio validation/preview and web rendering behave as described.

---

## Self-review notes

- **Spec coverage:** schema (Task 2), helper (Task 1), validation + preview thumbnail (Task 2), registration (Task 3), generated types (Task 3), react-player frontend island with `dynamic`/`ssr:false` (Task 4), vanilla-extract styles (Task 4), Portable Text wiring (Task 4), Studio + web verification (Task 5). All spec sections mapped.
- **Type consistency:** the component prop type `YouTubeEmbedProps { url?, caption? }` matches the `types` map call (`url={value.url} caption={value.caption}`) and the local `YouTubeBlockValue { url?, caption? }`, which matches the generated `YouTube` shape (`url?: string; caption?: string`). Helper signature `getYouTubeVideoId(url: string): string | null` is used identically in the test, schema validation, and schema preview.
- **No placeholders:** every code step contains complete code; every run step has an exact command and expected result.

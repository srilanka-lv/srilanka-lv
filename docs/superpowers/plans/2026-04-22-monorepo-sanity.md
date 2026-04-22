# Monorepo + Sanity CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the srilanka-lv project into a bun monorepo with a Next.js frontend, Sanity Studio, and a shared Sanity schemas package.

**Architecture:** Three workspace packages — `apps/web` (Next.js), `apps/studio` (Sanity Studio), `packages/sanity` (shared schemas/queries/types). Root holds dev tooling (biome, husky, commitlint, lint-staged). Bun workspaces for dependency resolution.

**Tech Stack:** Bun, Next.js 16, Sanity v3, next-sanity, vanilla-extract, TypeScript, Biome

---

## File Map

### Root (modify)
- `package.json` — strip app deps, keep dev tooling, add workspaces and workspace scripts
- `tsconfig.json` → rename to `tsconfig.base.json` — shared compiler options, no paths/includes

### `apps/web/` (create)
- `package.json` — app deps (next, react, vanilla-extract, next-sanity, etc.)
- `tsconfig.json` — extends root base, adds `@/*` path alias, Next.js plugin
- `next.config.ts` — moved from root
- `src/app/layout.tsx` — moved from root
- `src/app/page.tsx` — moved from root
- `public/` — moved from root (currently empty)
- `.env.local` — Sanity env vars (user creates manually)

### `apps/studio/` (create)
- `package.json` — sanity deps
- `tsconfig.json` — extends root base
- `sanity.config.ts` — studio config importing shared schemas
- `sanity.cli.ts` — CLI config for deploy/typegen

### `packages/sanity/` (create)
- `package.json` — sanity dependency, exports config
- `tsconfig.json` — extends root base
- `src/index.ts` — public API barrel export
- `src/schemas/index.ts` — schema array export
- `src/queries/index.ts` — GROQ queries export

---

## Task 1: Create root tsconfig.base.json and update root package.json

**Files:**
- Modify: `package.json`
- Rename: `tsconfig.json` → `tsconfig.base.json`

- [ ] **Step 1: Rename tsconfig.json to tsconfig.base.json**

```bash
git mv tsconfig.json tsconfig.base.json
```

- [ ] **Step 2: Edit tsconfig.base.json — remove Next.js-specific config**

Replace the full contents of `tsconfig.base.json` with:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true
  },
  "exclude": ["node_modules"]
}
```

Removed from root: `plugins` (Next.js specific), `paths` (per-app), `include` (per-app).

- [ ] **Step 3: Edit root package.json — convert to workspace root**

Replace the full contents of `package.json` with:

```json
{
  "name": "srilanka-lv",
  "private": true,
  "type": "module",
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev:web": "bun --filter @srilanka/web dev",
    "dev:studio": "bun --filter @srilanka/studio dev",
    "build:web": "bun --filter @srilanka/web build",
    "lint": "biome check",
    "format": "biome format --write",
    "prepare": "husky"
  },
  "devDependencies": {
    "@biomejs/biome": "2.4.12",
    "@commitlint/cli": "^20.5.0",
    "@commitlint/config-conventional": "^20.5.0",
    "husky": "^9.1.7",
    "lint-staged": "^16.4.0",
    "typescript": "^6.0.3"
  }
}
```

Removed: `name` version, all `dependencies` (moved to `apps/web`), app-specific devDeps (moved to `apps/web`). Added: `workspaces`, workspace filter scripts.

- [ ] **Step 4: Verify the root files look correct**

```bash
cat tsconfig.base.json
cat package.json
```

- [ ] **Step 5: Commit**

```bash
git add tsconfig.base.json package.json
git rm tsconfig.json 2>/dev/null || true
git commit -m "refactor: ♻️ convert root to monorepo workspace config"
```

---

## Task 2: Create apps/web and move existing app files

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Move: `next.config.ts` → `apps/web/next.config.ts`
- Move: `src/app/layout.tsx` → `apps/web/src/app/layout.tsx`
- Move: `src/app/page.tsx` → `apps/web/src/app/page.tsx`
- Move: `public/` → `apps/web/public/`

- [ ] **Step 1: Create directory structure and move files**

```bash
mkdir -p apps/web/src/app apps/web/public
git mv next.config.ts apps/web/next.config.ts
git mv src/app/layout.tsx apps/web/src/app/layout.tsx
git mv src/app/page.tsx apps/web/src/app/page.tsx
```

After moving, remove the now-empty `src/app` and `src` directories:

```bash
rmdir src/app src 2>/dev/null || true
```

- [ ] **Step 2: Create apps/web/package.json**

Create `apps/web/package.json`:

```json
{
  "name": "@srilanka/web",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@sanity/image-url": "^1.1.0",
    "@srilanka/sanity": "workspace:*",
    "@vanilla-extract/css": "^1.20.1",
    "clsx": "^2.1.1",
    "next": "^16.2.4",
    "next-sanity": "^9.8.0",
    "react": "^19.2.5",
    "react-dom": "^19.2.5"
  },
  "devDependencies": {
    "@types/node": "^25.6.0",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vanilla-extract/next-plugin": "^2.5.2"
  }
}
```

- [ ] **Step 3: Create apps/web/tsconfig.json**

Create `apps/web/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Verify file structure**

```bash
ls -la apps/web/
ls -la apps/web/src/app/
cat apps/web/package.json
cat apps/web/tsconfig.json
```

- [ ] **Step 5: Commit**

```bash
git add apps/web/
git commit -m "refactor: ♻️ move Next.js app to apps/web"
```

---

## Task 3: Create packages/sanity

**Files:**
- Create: `packages/sanity/package.json`
- Create: `packages/sanity/tsconfig.json`
- Create: `packages/sanity/src/index.ts`
- Create: `packages/sanity/src/schemas/index.ts`
- Create: `packages/sanity/src/queries/index.ts`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p packages/sanity/src/schemas/documents packages/sanity/src/schemas/objects packages/sanity/src/queries
```

- [ ] **Step 2: Create packages/sanity/package.json**

Create `packages/sanity/package.json`:

```json
{
  "name": "@srilanka/sanity",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "sanity": "^3.86.0"
  }
}
```

- [ ] **Step 3: Create packages/sanity/tsconfig.json**

Create `packages/sanity/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "noEmit": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create packages/sanity/src/schemas/index.ts**

This exports an empty schema array for now. Content modeling is out of scope — schemas will be added in a future task.

```typescript
import type { SchemaTypeDefinition } from 'sanity';

export const schemas: SchemaTypeDefinition[] = [];
```

- [ ] **Step 5: Create packages/sanity/src/queries/index.ts**

Empty queries barrel export — queries will be added alongside schemas.

```typescript
export {};
```

- [ ] **Step 6: Create packages/sanity/src/index.ts**

Public API barrel export:

```typescript
export { schemas } from './schemas/index.js';
```

- [ ] **Step 7: Verify file structure**

```bash
find packages/sanity -type f | sort
cat packages/sanity/src/index.ts
```

- [ ] **Step 8: Commit**

```bash
git add packages/sanity/
git commit -m "feat: ✨ add shared sanity schemas package"
```

---

## Task 4: Create apps/studio

**Files:**
- Create: `apps/studio/package.json`
- Create: `apps/studio/tsconfig.json`
- Create: `apps/studio/sanity.config.ts`
- Create: `apps/studio/sanity.cli.ts`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p apps/studio
```

- [ ] **Step 2: Create apps/studio/package.json**

Create `apps/studio/package.json`:

```json
{
  "name": "@srilanka/studio",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "sanity dev",
    "build": "sanity build",
    "deploy": "sanity deploy",
    "typegen": "sanity typegen generate"
  },
  "dependencies": {
    "@sanity/vision": "^3.86.0",
    "@srilanka/sanity": "workspace:*",
    "sanity": "^3.86.0"
  }
}
```

- [ ] **Step 3: Create apps/studio/tsconfig.json**

Create `apps/studio/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 4: Create apps/studio/sanity.config.ts**

The `projectId` and `dataset` values are placeholders — the user must replace them with their actual Sanity project values.

```typescript
import { schemas } from '@srilanka/sanity';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  name: 'srilanka-lv',
  title: 'SriLanka.lv',

  projectId: '<your-sanity-project-id>',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemas,
  },
});
```

- [ ] **Step 5: Create apps/studio/sanity.cli.ts**

```typescript
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '<your-sanity-project-id>',
    dataset: 'production',
  },
});
```

- [ ] **Step 6: Verify file structure**

```bash
ls -la apps/studio/
cat apps/studio/sanity.config.ts
```

- [ ] **Step 7: Commit**

```bash
git add apps/studio/
git commit -m "feat: ✨ add sanity studio app"
```

---

## Task 5: Install dependencies and verify the monorepo

**Files:**
- Modify: `bun.lock` (regenerated)
- Modify: `biome.json` (add studio ignores)

- [ ] **Step 1: Remove old node_modules and lockfile, then install**

```bash
rm -rf node_modules bun.lock
bun install
```

This should resolve all workspace dependencies and create a fresh lockfile.

- [ ] **Step 2: Verify workspace resolution**

```bash
bun pm ls
```

Check that `@srilanka/web`, `@srilanka/studio`, and `@srilanka/sanity` are listed as workspace packages.

- [ ] **Step 3: Update biome.json — add studio build ignores**

The Sanity Studio build outputs to `dist/`. Add it to biome ignores. The current `biome.json` already ignores `!dist` and `!.next` which covers both apps.

Verify the current ignores are sufficient:

```bash
cat biome.json | grep -A 10 '"includes"'
```

No changes needed if `!dist` and `!.next` are already in the includes list.

- [ ] **Step 4: Verify Next.js app builds**

```bash
bun --filter @srilanka/web build
```

Expected: Next.js build completes successfully.

- [ ] **Step 5: Verify Next.js dev server starts**

```bash
bun --filter @srilanka/web dev &
sleep 3
curl -s http://localhost:3000 | head -20
kill %1
```

Expected: HTML containing "Hello World" is returned.

- [ ] **Step 6: Verify biome lint passes across the monorepo**

```bash
bun run lint
```

Expected: No errors.

- [ ] **Step 7: Verify the commit hooks still work**

```bash
echo "feat: ✨ test monorepo hooks" | bun run commitlint
```

Expected: Passes without errors.

- [ ] **Step 8: Commit**

```bash
git add bun.lock biome.json
git commit -m "chore: 🔧 install monorepo dependencies"
```

---

## Task 6: Set up Sanity client in apps/web

**Files:**
- Create: `apps/web/src/lib/sanity/client.ts`
- Create: `apps/web/.env.local.example`

- [ ] **Step 1: Create the Sanity client module**

```bash
mkdir -p apps/web/src/lib/sanity
```

Create `apps/web/src/lib/sanity/client.ts`:

```typescript
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-04-22',
  useCdn: true,
});
```

- [ ] **Step 2: Create .env.local.example**

Create `apps/web/.env.local.example`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
```

- [ ] **Step 3: Verify biome lint passes on the new file**

```bash
bun run lint -- apps/web/src/lib/sanity/client.ts
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/lib/sanity/ apps/web/.env.local.example
git commit -m "feat: ✨ add sanity client to web app"
```

---

## Task 7: Clean up old root files

**Files:**
- Remove: `src/` directory (should be empty after Task 2)
- Remove: `public/` at root if empty

- [ ] **Step 1: Check for any remaining files in old locations**

```bash
ls -la src/ 2>/dev/null || echo "src/ already gone"
ls -la public/ 2>/dev/null || echo "public/ already gone"
```

- [ ] **Step 2: Remove any leftover empty directories**

```bash
rmdir src/app src public 2>/dev/null || true
```

If `src/` or `public/` still contain files, investigate before removing — they may need to be moved to `apps/web/`.

- [ ] **Step 3: Remove the old .next build cache if present**

```bash
rm -rf .next
```

The build cache is now at `apps/web/.next`.

- [ ] **Step 4: Verify final root structure**

```bash
ls -la
ls -la apps/
ls -la packages/
```

Expected root should only contain: `apps/`, `packages/`, `docs/`, `.husky/`, `.vscode/`, `.git/`, `.claude/`, `node_modules/`, config files (biome.json, commitlint.config.ts, lint-staged.config.ts, tsconfig.base.json, package.json, bun.lock).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: 🧹 clean up old root files"
```

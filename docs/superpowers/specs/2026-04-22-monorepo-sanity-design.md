# Monorepo + Sanity CMS Design

## Overview

Convert the srilanka-lv project from a single Next.js app into a bun monorepo with Sanity as the headless CMS. Sanity drives all site content (pages, reviews, images, metadata). The Sanity Studio is hosted by Sanity (`<name>.sanity.studio`), not self-hosted.

## Directory Structure

```
srilanka-lv/
├── apps/
│   ├── web/                → Next.js 16 frontend
│   │   ├── src/
│   │   │   └── app/
│   │   ├── public/
│   │   ├── next.config.ts
│   │   ├── tsconfig.json   → extends root
│   │   └── package.json
│   └── studio/             → Sanity Studio
│       ├── sanity.config.ts
│       ├── sanity.cli.ts
│       ├── tsconfig.json   → extends root
│       └── package.json
├── packages/
│   └── sanity/             → Shared schemas, queries, types
│       ├── src/
│       │   ├── schemas/
│       │   ├── queries/
│       │   └── index.ts
│       ├── tsconfig.json   → extends root
│       └── package.json
├── biome.json
├── commitlint.config.ts
├── lint-staged.config.ts
├── tsconfig.base.json      → shared compiler options
├── package.json            → workspace root
└── bun.lock
```

## Workspace Configuration

### Root `package.json`

- Defines bun workspaces: `["apps/*", "packages/*"]`
- Contains only dev tooling dependencies: biome, commitlint, husky, lint-staged, typescript
- Scripts for running commands across workspaces

### Package Naming

- `@srilanka/web` — the Next.js frontend
- `@srilanka/studio` — the Sanity Studio
- `@srilanka/sanity` — shared schemas, queries, and generated types

## `apps/web` (Next.js Frontend)

### What Moves Here

| From (current) | To |
|---|---|
| `src/app/` | `apps/web/src/app/` |
| `next.config.ts` | `apps/web/next.config.ts` |
| `public/` | `apps/web/public/` |

### Dependencies

Runtime dependencies move from root to `apps/web/package.json`:
- next, react, react-dom
- @vanilla-extract/css, clsx
- @vercel/analytics, @vercel/speed-insights
- next-sanity (new — Sanity integration for Next.js)
- @sanity/image-url (new — image URL builder)

Dev dependencies:
- @vanilla-extract/next-plugin
- @types/react, @types/react-dom, @types/node

### Data Fetching

- Uses `next-sanity` for GROQ queries and Sanity client setup
- Imports queries and types from `@srilanka/sanity`
- Sanity client configured via environment variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`

## `apps/studio` (Sanity Studio)

### Purpose

Minimal app that wires up the Sanity Studio UI with shared schemas. Deployed to Sanity's hosted platform via `sanity deploy`.

### Dependencies

- sanity
- @sanity/vision (GROQ playground)
- @srilanka/sanity (workspace dependency for schemas)

### Configuration

- `sanity.config.ts` — defines the studio config, imports schemas from `@srilanka/sanity`
- `sanity.cli.ts` — CLI config for `sanity deploy` and `sanity typegen`

## `packages/sanity` (Shared Package)

### Purpose

Single source of truth for Sanity schemas, GROQ queries, and generated TypeScript types. Both `apps/web` and `apps/studio` depend on this package.

### Structure

```
packages/sanity/src/
├── schemas/
│   ├── index.ts          → exports all schema types
│   ├── documents/        → document-level schemas (page, review, etc.)
│   └── objects/          → reusable object schemas (image, seo, etc.)
├── queries/
│   └── index.ts          → GROQ query strings
└── index.ts              → public API
```

### Type Generation

- Uses `sanity typegen` to generate TypeScript types from schemas
- Generated types are exported alongside queries so `apps/web` gets full type safety on query results

### Exports

The package exports:
- `schemas` — array of all schema definitions (consumed by `apps/studio`)
- GROQ query strings (consumed by `apps/web`)
- Generated TypeScript types for query results (consumed by `apps/web`)

## TypeScript Configuration

### `tsconfig.base.json` (root)

Shared compiler options extended by all apps and packages:
- strict mode enabled
- target: ES2017
- module: esnext
- moduleResolution: bundler
- jsx: react-jsx
- No paths or includes (each project defines its own)

### Per-project `tsconfig.json`

Each app/package extends the root base and adds:
- Its own `includes`/`excludes`
- Path aliases if needed (e.g., `@/*` in `apps/web`)

## Tooling (Stays at Root)

All dev tooling remains at the workspace root and applies to all packages:

- **Biome** — linting and formatting across all apps/packages
- **Husky** — git hooks (pre-commit, commit-msg)
- **lint-staged** — runs biome on staged files
- **commitlint** — enforces `type: emoji subject` commit format

The `lint-staged.config.ts` glob pattern (`*.{ts,tsx,js,jsx,json,css}`) works across the entire monorepo since lint-staged operates on staged files regardless of directory.

## Environment Variables

### `apps/web`

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (e.g., `production`) |
| `SANITY_API_READ_TOKEN` | Server-side read token (optional, for drafts/preview) |

### `apps/studio`

Studio uses the project ID and dataset from `sanity.config.ts` directly.

## Scripts

### Root `package.json`

```
"dev:web": "bun --filter @srilanka/web dev"
"dev:studio": "bun --filter @srilanka/studio dev"
"build:web": "bun --filter @srilanka/web build"
"lint": "biome check"
"format": "biome format --write"
```

### `apps/web/package.json`

```
"dev": "next dev"
"build": "next build"
"start": "next start"
```

### `apps/studio/package.json`

```
"dev": "sanity dev"
"build": "sanity build"
"deploy": "sanity deploy"
"typegen": "sanity typegen generate"
```

## Out of Scope

- Content modeling (specific schemas for pages, reviews, etc.) — will be designed separately once the monorepo structure is in place
- Visual design / UI components
- Preview/draft mode setup
- Deployment pipeline configuration

FROM oven/bun:1 AS base

# --- Install dependencies ---
FROM base AS deps
WORKDIR /app

COPY package.json bun.lock ./
COPY apps/web/package.json ./apps/web/
COPY apps/studio/package.json ./apps/studio/
COPY packages/sanity/package.json ./packages/sanity/

RUN bun install --frozen-lockfile --production

# --- Build ---
FROM base AS builder
WORKDIR /app

COPY package.json bun.lock ./
COPY apps/web/package.json ./apps/web/
COPY apps/studio/package.json ./apps/studio/
COPY packages/sanity/package.json ./packages/sanity/

RUN bun install --frozen-lockfile

COPY tsconfig.base.json ./
COPY packages/sanity ./packages/sanity
COPY apps/web ./apps/web

RUN cd apps/web && bun run build

# --- Production ---
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]

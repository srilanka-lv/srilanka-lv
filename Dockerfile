# syntax=docker/dockerfile:1.7

# ---- deps: install workspace dependencies ----
FROM oven/bun:1-debian AS deps
WORKDIR /app

COPY package.json bun.lock ./
COPY apps/web/package.json ./apps/web/
COPY apps/studio/package.json ./apps/studio/
COPY packages/sanity/package.json ./packages/sanity/

RUN bun install --frozen-lockfile

# ---- builder: produce the standalone Next output ----
FROM oven/bun:1-debian AS builder
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_* values are baked into the JS bundle at build time.
# Passed via --build-arg from the workflow; the workflow sources them from
# GitHub repo + environment variables (vars.*).
ARG NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_STUDIO_DATASET
ARG NEXT_PUBLIC_SELF_URL
ENV NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID=${NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID}
ENV NEXT_PUBLIC_SANITY_STUDIO_DATASET=${NEXT_PUBLIC_SANITY_STUDIO_DATASET}
ENV NEXT_PUBLIC_SELF_URL=${NEXT_PUBLIC_SELF_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run web:build

# ---- runner: minimal runtime image ----
FROM oven/bun:1-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Kamal sanity-checks each pulled image's `service` label matches the
# destination's service name (e.g. srilanka-development). Passed via build-arg
# from the workflow, which uses one value per environment.
ARG KAMAL_SERVICE=srilanka
LABEL service=${KAMAL_SERVICE}

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs
EXPOSE 3000

CMD ["bun", "apps/web/server.js"]

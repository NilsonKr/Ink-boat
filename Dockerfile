FROM node:24-alpine as base

RUN apk add --no-cache libc6-compat
RUN corepack enable pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install

COPY . .

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

## Dev env
FROM base as dev

CMD ["pnpm", "dev"]

## Prod env
FROM base AS prod

ENV NODE_ENV=production

# DATABASE_URL is needed AT BUILD TIME: `next build` statically renders a page
# that queries Postgres. Passed in via compose `build.args`.
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN pnpm build

# next.config.ts sets output:'standalone' -> the runnable server is emitted to
# .next/standalone/server.js. Place static assets and public/ next to it.
RUN cp -r public .next/standalone/public \
  && cp -r .next/static .next/standalone/.next/static \
  && chown -R node:node .next/standalone

USER node

CMD ["node", ".next/standalone/server.js"]

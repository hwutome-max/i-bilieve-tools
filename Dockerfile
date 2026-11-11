FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN rm -rf public/assets public/brochure.pdf \
  && mkdir -p public \
  && cp -a assets public/assets \
  && cp -a "I BELIEVE MACHINERY TOOLS.pdf" public/brochure.pdf \
  && npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=80
ENV HOSTNAME=0.0.0.0
RUN addgroup -S next && adduser -S next -G next
COPY --from=build --chown=next:next /app/public ./public
COPY --from=build --chown=next:next /app/.next/standalone ./
COPY --from=build --chown=next:next /app/.next/static ./.next/static
USER next
EXPOSE 80
CMD ["node", "server.js"]

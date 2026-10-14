# Build context is the repository root: docker build -f apps/stockwise-be/Dockerfile .
FROM node:22-alpine AS build

WORKDIR /app
ENV NX_DAEMON=false

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx nx build stockwise-be

FROM node:22-alpine

WORKDIR /app

# The build emits a pruned package.json/lockfile containing only the app's runtime dependencies.
COPY --from=build /app/dist/apps/stockwise-be ./
RUN npm ci --omit=dev

EXPOSE 5000

CMD ["node", "main.js"]
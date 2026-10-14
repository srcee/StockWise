# Build context is the repository root: docker build -f apps/stockwise-fe/Dockerfile .
FROM node:22-alpine AS build

WORKDIR /app
ENV NX_DAEMON=false

ARG VITE_BACKEND_BASE_URL=http://localhost:5000/api/
ENV VITE_BACKEND_BASE_URL=$VITE_BACKEND_BASE_URL

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx nx build stockwise-fe

FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/apps/stockwise-fe ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
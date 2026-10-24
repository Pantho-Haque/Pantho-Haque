# Local development only; Vercel doesn't use this. Start it with: docker compose up
FROM node:24-bookworm-slim
RUN npm install -g pnpm@11.17.0
WORKDIR /app

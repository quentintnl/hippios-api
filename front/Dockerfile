# ---- Base ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Dev ----
FROM base AS dev
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---- Prod deps ----
FROM base AS deps
ENV NODE_ENV=production
RUN npm ci --omit=dev

# ---- Build ----
FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build

# ---- Prod ----
FROM node:20-alpine AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
USER node
CMD ["node", "server.js"]
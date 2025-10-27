FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

ENV DATABASE_URL=postgresql://user:pass@localhost:5432/db

RUN npm ci
RUN npx prisma generate

COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://user:pass@localhost:5432/db

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/app ./app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

CMD npx prisma migrate deploy && npm start
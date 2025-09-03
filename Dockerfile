# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci && npm cache clean --force

COPY . .
RUN npx prisma generate && npm run build

# Etapa 2: Imagem final de produção
FROM node:20-alpine AS production

RUN addgroup -g 1001 -S nodejs \
  && adduser -S nestjs -u 1001

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nestjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

USER nestjs

EXPOSE 3333

CMD ["node", "dist/main.js"]

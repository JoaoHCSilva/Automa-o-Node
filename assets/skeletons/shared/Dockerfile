# Estágio 1: Build — instala deps e compila frontend
FROM node:22-alpine AS builder

WORKDIR /app

# Copia manifesto de deps primeiro (cache de layer mais eficiente)
COPY package*.json ./

# Instala todas as dependências (inclui dev deps para build)
RUN npm ci

# Copia código fonte
COPY . .

# Build do frontend Vite
RUN npm run build

# Estágio 2: Produção — imagem mínima sem dev deps
FROM node:22-alpine

WORKDIR /app

# Copia apenas manifesto e build do estágio anterior
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Controla instalação de dependências por ambiente
ARG NODE_ENV=production

# Instala apenas deps de produção em prod, todas em dev
RUN if [ "$NODE_ENV" = "production" ]; then npm ci --only=production; else npm ci; fi

# Copia o restante do backend
COPY . .

# Cria usuário não-root para segurança
RUN addgroup -S -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs nodejs && \
    chown -R nodejs:nodejs /app

USER nodejs

# Porta padrão da aplicação Express
EXPOSE 3000

# Variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3000

# Inicia a aplicação
CMD ["npm", "start"]

# Stage 1: Build client
FROM node:18-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Production server
FROM node:18-alpine
WORKDIR /app

# Install server dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy server code
COPY server/ ./server/

# Copy client build from stage 1
COPY --from=client-build /app/client/dist ./client/dist

# Copy public assets (heritage, nature, about images)
COPY client/public/ ./client/dist/

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "server/index.js"]

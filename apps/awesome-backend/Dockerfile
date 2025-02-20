# Build stage
FROM node:20-alpine as builder

WORKDIR /app

COPY . .

# Install dependencies
RUN npm install

# Build the app
RUN npx nx build awesome-backend --port 3000 --host 0.0.0.0

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built application
COPY --from=builder /app/dist/awesome-backend ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"] 
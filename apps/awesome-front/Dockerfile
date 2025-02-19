# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY . .

# Install dependencies
RUN npm install

# Build the app
RUN npx nx build awesome-front

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist/apps/awesome-front /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"] 
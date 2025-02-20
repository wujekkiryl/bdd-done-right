# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY . .

# Install dependencies
RUN npm install

# Build the app
RUN npx nx build awesome-front --host 0.0.0.0

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist/apps/awesome-front /usr/share/nginx/html

# Copy nginx configuration
RUN echo -e "server {\n    listen 80;\n    server_name localhost;\n    root /usr/share/nginx/html;\n    index index.html;\n    location / {\n        try_files $uri $uri/ /index.html;\n    }\n}" > /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"] 
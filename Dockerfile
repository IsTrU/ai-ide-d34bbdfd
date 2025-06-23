# Use Node.js LTS Alpine for smaller image size
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with npm ci for faster, reliable builds
RUN npm ci

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Production stage - use nginx alpine for serving
FROM nginx:alpine

# Copy built app to nginx html directory
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE $PORT

# Start nginx
CMD ["sh", "-c", "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
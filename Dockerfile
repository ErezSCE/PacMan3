# ---- Builder Stage ----
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package.json package-lock.json* ./

# Disable strict SSL for corporate proxies and install dependencies (production only)
RUN npm config set strict-ssl false && npm install

# Copy the rest of the source code
COPY . .

# Build the Vite application (outputs to ./dist)
RUN npm run build

# ---- Production Stage ----
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Health check to ensure nginx is serving
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget -qO- http://localhost || exit 1

# Default command runs nginx in foreground (already set in base image)

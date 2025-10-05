# Dockerfile for per-team challenge instance
FROM node:18-slim

# Install system deps
RUN apt-get update && apt-get install -y git curl wget ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/challenge

# Copy project files
COPY package*.json ./
RUN npm ci --only=production || npm ci

COPY . /opt/challenge

# Make entrypoint executable
RUN chmod +x /opt/challenge/docker/entrypoint.sh

EXPOSE 8545

ENTRYPOINT ["/opt/challenge/docker/entrypoint.sh"]

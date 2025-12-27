# Multi-stage build for the doctor appointment app
# Stage 1: Build backend dependencies
FROM node:18-alpine AS backend

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Start the backend application
CMD ["npm", "run", "backend"]

# Stage 2: Build frontend
FROM node:18-alpine AS frontend

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the frontend application
CMD ["npm", "start"]
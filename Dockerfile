# Use Node LTS base image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build app
RUN npm run build


# Production image
FROM node:20-alpine AS runner

WORKDIR /app

# copy files from builder
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev --ignore-scripts --prefer-offline

# copy build artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
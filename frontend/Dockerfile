# Dockerfile for the frontend service

# ---- Base Stage ----
# Use a specific Node.js version for reproducibility
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# ---- Dependencies Stage ----
# Install all dependencies, including devDependencies
FROM base AS dependencies
RUN npm install --frozen-lockfile

# ---- Build Stage ----
# Build the Next.js application for production
FROM dependencies AS build
COPY . .
RUN npm run build

# ---- Production Stage ----
# Create the final, lean production image
FROM base AS production
ENV NODE_ENV=production

# Copy only necessary files from the build stage
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Expose the application port
EXPOSE 3000

# Use a non-root user for security
USER node

# Command to run the application
CMD ["npm", "start"]

# ---- Development Stage ----
# Use this stage for local development with hot-reloading
FROM dependencies AS development

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the application in development mode
CMD ["npm", "run", "dev"]

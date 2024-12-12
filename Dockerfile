# Use an official Node.js runtime as a parent image
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (ensure they are in the build context)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Optionally build the application (uncomment if you have a build process)
# RUN npm run build

# Use another Node.js image to run the application
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

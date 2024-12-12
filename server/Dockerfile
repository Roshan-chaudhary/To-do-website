# Use an official Node.js runtime as a parent image
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (uncomment if necessary for your setup)
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

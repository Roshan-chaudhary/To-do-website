
# Use the official Node.js image as a base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from client folder (if it's a Next.js app)
COPY client/package*.json ./client/

# Install dependencies for the client app
RUN cd client && npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application (assuming it's inside the client folder)
RUN cd client && npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to start the application
CMD ["npm", "start", "--prefix", "client"]

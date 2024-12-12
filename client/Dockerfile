# Use the official Node.js image as a base image
FROM node:20-alpine

# Set the working directory inside the container to the client folder
WORKDIR /app

# Copy package.json and package-lock.json from the client folder
COPY package*.json ./

# Install dependencies for the client app
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]

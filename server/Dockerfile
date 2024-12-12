# Use an official Node runtime as a parent image
FROM node:20

# Set working directory
WORKDIR /usr/src/app


# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose port 8002 (or the port your application uses)
EXPOSE 80

# Start the application
CMD ["npm", "start"]

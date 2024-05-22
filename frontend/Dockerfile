# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the app for production
RUN npm run build

# Install serve to serve the build directory
RUN npm install -g serve

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app
CMD ["serve", "-s", "build"]

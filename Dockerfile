# Use the official Node.js image from the Docker Hub
FROM node:20

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists) to install dependencies first
COPY package*.json ./



# Copy the rest of the application code
COPY . .

# Install app dependencies
RUN npm install

# Expose port 3000 for the application
EXPOSE 3000

# Define the command to run the application
CMD [ "node", "index.js" ]

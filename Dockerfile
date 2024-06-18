# Stage 1: Build the Angular application
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Angular CLI globally
RUN npm install -g @angular/cli@latest

# Expose the port the app runs on
EXPOSE 4200

# Define the entrypoint script
CMD ["./entrypoint.sh"]
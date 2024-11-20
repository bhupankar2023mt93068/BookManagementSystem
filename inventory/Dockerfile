# inventory service dockerfile
FROM node:18

# Set working directory
WORKDIR /src

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose service port
EXPOSE 3001

# Run the application
CMD ["npm", "start"]
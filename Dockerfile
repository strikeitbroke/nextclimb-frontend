FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Run the dev server
# The --host flag is required to allow traffic from outside the container
CMD ["npm", "run", "dev", "--", "--host"]

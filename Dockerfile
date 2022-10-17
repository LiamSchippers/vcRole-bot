FROM node:latest

# Create the directory!
WORKDIR /app

# Copy and Install our bot
COPY package.json ./

RUN npm install

# Our precious bot
COPY . .

# Start me!
CMD ["npm", "start"]
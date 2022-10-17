FROM node:latest

# Create the directory!
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and Install our bot
COPY package.json ./
RUN npm install

# Our precious bot
COPY . .

# Start me!
CMD ["node", "index.js"]
# Name the node stage "builder"
FROM node:12-alpine AS builder
# Set working directory
WORKDIR /app
COPY package.json /app
RUN npm install yarn
RUN npm install pm2 -g
RUN yarn install
COPY . /app
RUN yarn run build
EXPOSE 6800
RUN pm2 list
# Copy all files from current directory to working dir in image
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
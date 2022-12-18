FROM node:16.19.0-alpine3.17

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./app-1.0.0 .
CMD ["node", "./src/index.js"]
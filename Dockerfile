FROM node:18-alpine

WORKDIR /src
COPY package*.json /
EXPOSE 5000

ENV NODE_ENV=production
FROM node:18-alpine

WORKDIR /src
COPY package*.json ./
RUN npm ci --only=production
COPY . .

CMD ["node", "server.js"]

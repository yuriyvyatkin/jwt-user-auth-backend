FROM node:18-alpine

WORKDIR /src
COPY package*.json /
EXPOSE 5000

ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "server.js"]

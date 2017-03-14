FROM node:7.7.2-alpine

RUN apk add --no-cache build-base

## cache node_modules
ADD ./package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app/src && cp -a /tmp/node_modules /app/

## copy meta
WORKDIR /app
ADD ./package.json /app/package.json
ADD ./seed /app/seed
ADD .env /app/.env

## build
ADD ./components /app/components
ADD ./containers /app/containers
ADD ./lib /app/lib
ADD ./pages /app/pages
ADD ./static /app/static
ADD ./server /app/server
ADD ./App.js /app/App.js
ADD ./entry.js /app/entry.js

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
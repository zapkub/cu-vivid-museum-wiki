# build prod image
FROM arhea/yarn:6


## cache node_modules
ADD ./package.json /tmp/package.json
RUN cd /tmp && yarn install
RUN mkdir -p /app/src && cp -a /tmp/node_modules /app/

## build
WORKDIR /app
ADD ./package.json /app/package.json
ADD ./src /app/src
ADD .babelrc /app
ADD .env /app
ADD ./build.sh /app

RUN sh build.sh

EXPOSE 3000
CMD ["yarn", "start"]
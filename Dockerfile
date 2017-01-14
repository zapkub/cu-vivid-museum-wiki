# build prod image
FROM arhea/yarn:6

RUN mkdir /app
WORKDIR /app


ADD ./src /app/src
ADD ./package.json /app 
ADD .babelrc /app
ADD .env /app
ADD ./build.sh /app

RUN yarn install
RUN sh build.sh

EXPOSE 3000
CMD ["yarn", "start"]
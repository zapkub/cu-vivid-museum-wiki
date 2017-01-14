FROM node:6-onbuild 

RUN mkdir /app
WORKDIR /app
ADD ./src /app/src
ADD ./package.json /app 

RUN npm install --production
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
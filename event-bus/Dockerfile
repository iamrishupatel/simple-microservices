FROM node:14-alpine

WORKDIR /usr/app/event-bus

COPY ./package.json ./
RUN npm install

COPY ./ ./

CMD [ "npm" ,"start" ]

FROM node:14-alpine

# Add the following lines
ENV CI=true
ENV WDS_SOCKET_PORT=0


WORKDIR /usr/app/client

COPY ./package.json ./
RUN npm install

COPY ./ ./

CMD [ "npm" ,"start" ]

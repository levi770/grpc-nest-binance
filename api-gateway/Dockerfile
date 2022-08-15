FROM node:16-alpine
RUN apk add --no-cache git
RUN apk add --no-cache protoc
RUN mkdir -p /usr/src/api-gateway
WORKDIR /usr/src/api-gateway
ADD . /usr/src/api-gateway
#RUN npm install
RUN npm run proto:install
RUN npm run proto:all
CMD npm run build && npm run proto:all && npm run start:dev
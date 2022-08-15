FROM node:16-alpine
RUN apk add --no-cache git
RUN apk add --no-cache protoc
RUN mkdir -p /usr/src/binance-svc
WORKDIR /usr/src/binance-svc
ADD . /usr/src/binance-svc
#RUN npm install
RUN npm run proto:install
RUN npm run proto:binance
CMD npm run build && npm run start:dev
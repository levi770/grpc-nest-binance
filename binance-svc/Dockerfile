FROM node:16-alpine
RUN mkdir -p /usr/src/binance-svc
WORKDIR /usr/src/binance-svc
ADD . /usr/src/binance-svc
RUN npm i
CMD npm run build && npm run start:dev
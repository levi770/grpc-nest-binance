FROM node:16-alpine
RUN mkdir -p /usr/src/api-gateway
WORKDIR /usr/src/api-gateway
ADD . /usr/src/api-gateway
RUN npm i
CMD npm run build && npm run start:dev
FROM node:16-alpine
RUN apk add --no-cache git
RUN apk add --no-cache protoc
RUN mkdir -p /usr/src/auth-svc
WORKDIR /usr/src/auth-svc
ADD . /usr/src/auth-svc
RUN npm install
RUN npm run proto:install
RUN npm run proto:auth
CMD npm run build && npm run start:dev
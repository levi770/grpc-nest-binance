FROM node:16-alpine
RUN mkdir -p /usr/src/auth-svc
WORKDIR /usr/src/auth-svc
ADD . /usr/src/auth-svc
RUN npm i
CMD npm run build && npm run start:dev
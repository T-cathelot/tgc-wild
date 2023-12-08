FROM node:18.18.2-alpine3.18
RUN mkdir /app
WORKDIR /app

COPY package.json package.json

run npm i

COPY src src
COPY tsconfig.json tsconfig.json


CMD npm start
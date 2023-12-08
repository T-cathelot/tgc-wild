FROM node:18.18.2-alpine3.18

RUN mkdir /app

WORKDIR /app

COPY package.json package.json

run npm i

COPY public public
COPY src src
COPY tsconfig.json tsconfig.json
COPY next-env.d.ts next-env.d.ts
COPY next.config.js next.config.js
COPY .eslintrc.json .eslintrc.json


CMD npm run dev
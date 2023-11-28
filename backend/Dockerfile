FROM node:18.18.2-alpine3.18
RUN mkdir /app
WORKDIR /app

COPY package.json package.json

COPY npm i

COPY src src
COPY .prettierrc .prettierrc
Copy tsconfig.json tsconfig.json


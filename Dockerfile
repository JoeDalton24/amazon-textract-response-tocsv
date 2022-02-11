FROM node:16

WORKDIR /app

RUN npm install

COPY . /app


FROM node

WORKDIR /app

RUN npm install

COPY . /app


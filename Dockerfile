FROM node:10

WORKDIR /magitech

EXPOSE 3000

CMD npm install && npm run migrate:up && npm run gulp
FROM node:10

WORKDIR /magitech

EXPOSE 3000

CMD npm run migrate:up && npm start
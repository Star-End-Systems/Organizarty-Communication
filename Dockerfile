FROM node:21.5.0-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN yarn install --only=production

RUN yarn build

EXPOSE 3000

CMD ["yarn", "prod"]

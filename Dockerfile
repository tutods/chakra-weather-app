FROM node:17-alpine3.14

WORKDIR /usr/app

ENV PATH /usr/app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --ignore-scripts

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
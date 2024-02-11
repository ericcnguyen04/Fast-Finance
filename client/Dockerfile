FROM node:21

WORKDIR /app

COPY ./package.json ./package.json

RUN npm install

COPY . .

expose 3000

CMD ["npm", "start"]
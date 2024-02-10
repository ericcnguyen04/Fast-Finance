FROM node:21

WORKDIR /app

COPY ./package.json ./package.json

RUN npm install

COPY . .

ENV PORT=5000

expose 5000

CMD ["npm", "start"]
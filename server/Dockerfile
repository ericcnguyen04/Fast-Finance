FROM node:21

WORKDIR /app

COPY ./package.json ./package.json

RUN npm install

COPY . .

ENV PORT=5000
ENV ALPHA_VANTAGE_KEY=DIEMRIIBS10CCF6M
ENV NESSIE_KEY=da45b3c9b6f7bd866754c03a32e674bd

expose 5000

CMD ["npm", "start"]
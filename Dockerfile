FROM node:20

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

ENV API_KEY=xxx

EXPOSE 3000

CMD [ "npm", "start" ]
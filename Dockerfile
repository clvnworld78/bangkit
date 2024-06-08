FROM node:20

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

ENV API_KEY=AIzaSyDsLZFeu5JsNHJ-gqQHi0W5xXnLfNUFRJ8

EXPOSE ${PORT}

CMD [ "npm" "start" ]
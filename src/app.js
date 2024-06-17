const express = require('express');
const customRouter = require('./routes');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const APP_PORT = process.env.PORT;

app.use('/', customRouter);

app.listen(APP_PORT, () => console.log(`Server is listening on port ${APP_PORT}`));

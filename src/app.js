const app = require('express')();
const customRouter = require('./routes.js');
const dotenv = require('dotenv');

dotenv.config();
const APP_PORT = process.env.PORT;

app.use('/', customRouter);

app.listen(APP_PORT, () => console.log(`Server is listening on port ${APP_PORT}`));

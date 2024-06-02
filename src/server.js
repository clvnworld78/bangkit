const app = require('express')();
const PORT = 3000;
const router = require('./routes');

app.use('/', router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

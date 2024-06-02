const express = require('express');
const router = express.Router();
const getHandler = require('../src/handler.js');

router.get('/', (req, res) => {
    getHandler(req, res);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const getRestaurantList = require('../src/handler.js');

router.get('/restaurant', (req, res) => {
    getRestaurantList(req, res);
});

module.exports = router;

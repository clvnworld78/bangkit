const express = require('express');
const router = express.Router();
const handlers = require('./handler.js');

router.get('/restaurant', (req, res) => {
    handlers.getRestaurantList(req, res);
});

router.get('/', (req, res) => {
    handlers.getHandler(req, res);
})

router.get('/search', (req, res) => handlers.searchPlaces(req, res));

module.exports = router;

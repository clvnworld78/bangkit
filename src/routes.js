const express = require('express');
const router = express.Router();
const handlers = require('./handler.js');

router.get('/', (req, res) => handlers.getHandler(req, res));
router.get('/search', (req, res) => handlers.searchPlaces(req, res));
router.get('/nearby', (req, res) => handlers.fetchNearbyRestaurants(req, res));

module.exports = router;

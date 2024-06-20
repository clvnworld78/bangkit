const express = require('express');
const router = express.Router();
const handlers = require('./handler.js');

router.get('/', (req, res) => handlers.getHandler(req, res));
router.get('/search', (req, res) => handlers.searchPlaces(req, res));
router.get('/nearby', (req, res) => handlers.fetchNearbyRestaurants(req, res));
router.get('/reviewed', (req, res) => handlers.getAllUserRestaurant(req, res));
router.get('/detail', (req, res) => handlers.getRestaurantDetails(req, res));
router.post('/statistics', (req, res) => handlers.statistics(req, res));

router.post('/register', (req, res) => handlers.registration(req, res));
router.post('/login', (req, res) => handlers.login(req, res));
router.post('/review', (req, res) => handlers.sentimentAnalysis(req, res));

module.exports = router;

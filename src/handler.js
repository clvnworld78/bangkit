require('dotenv').config();
const api = require('./api/places');

const getHandler = (req, res) => {
    console.log(`This is ${req.method} request on ${req.url}`);
    res.status(200).send('Connection to backend successfully established!');
};

const searchPlaces = async (req, res) => { // req body must contain location query
    const location = req.query.location;

    if (!location) {
        return res.status(400).send('Missing required parameter: location text');
    };

    try {
        const restaurants = await api.searchPlaces(location);
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching restaurant data');
    };
};

const fetchNearbyRestaurants = async (req, res) => { // req query must contain latitude & langtitude
    try {
        const { lat, lng, radius = 1000 } = req.query;

        if (!lat || !lng || !radius) {
            return res.status(400).send('Missing one or more required paramater: latitude, langtitude, radius');
        };

        const location = `${lat},${lng}`;
        const nearbyRestaurants = await api.fetchNearbyRestaurants(location, radius);
        res.json(nearbyRestaurants);
    } catch (error) {
        console.error('Error during fetching restaurants nearby: ', error);
        res.status(500).send({ error: 'Failed to fetch restaurants from nearby location' });
    };
};

const handlers = {
    getHandler,
    searchPlaces,
    fetchNearbyRestaurants
};

module.exports = handlers;

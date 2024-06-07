require('dotenv').config();
const axios = require('axios');
const API_KEY = process.env.PLACES_API_KEY;

const getRestaurantList = (req, res) => { // req payload should include location coordinate
    console.log(`this is get request on ${req.url}`);
    // get the gmaps API key from .env and insert logic
    res.status(201).send('Sending back gmaps location details as an object on a json format');
};

const getHandler = (req, res) => {
    console.log(`This is ${req.method} request on ${req.url}`);
    res.status(200).send('Hello world!');
}

const searchPlaces = async (req, res) => {
    const location = req.query.location;

    if (!location) {
        return res.status(400).send('Missing required parameter: location text');
    }

    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+near+${location}&key=${API_KEY}`
        );

        const restaurants = response.data.results.map( place => {
            const { photos = [] } = place; // Destructure photos with default empty array
            const photo = photos[0]; // Access the first photo (if available)
            const photoURL = photo ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}` : null;

            return {
                name: place.name,
                rating: place.rating,
                vicinity: place.vicinity,
                imageUrl: photoURL,
            };
        });

        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching restaurant data');
    }
}

const handlers = {
    getRestaurantList,
    getHandler,
    searchPlaces
};

module.exports = handlers;
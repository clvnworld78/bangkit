require('dotenv').config();
const axios = require('axios');
const API_KEY = process.env.TEST_API_KEY;

const searchPlaces = async (location) => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+near+${location}&key=${API_KEY}`;
    const response = await axios.get(url);

    const restaurants = response.data.results.map(place => {
        const { photos = [] } = place; // Destructure photos with default empty array
        const photo = photos[0]; // Access the first photo (if available)
        const photoURL = photo? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}` : null;

        return {
            restaurant_id: place_id,
            name: place.name,
            rating: place.rating,
            address: place.formatted_address,
            imageUrl: photoURL,
        };
    });

    return restaurants;
};

const fetchNearbyRestaurants = async (location, radius) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=restaurant&key=${API_KEY}`;
    const response = await axios.get(url);

    const restaurants = response.data.results.map(place => {
        const { photos = [] } = place;
        const photo = photos[0];
        const photoURL = photo ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}` : null;

        return {
            id: place.place_id,
            name: place.name,
            rating: place.rating,
            address: place.vicinity,
            imageUrl: photoURL,
        };
    });

    return restaurants;
};

const api = {
    searchPlaces,
    fetchNearbyRestaurants
}

module.exports = api;

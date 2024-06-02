const getRestaurantList = (req, res) => { // req payload should include location coordinate
    console.log(`this is get request on ${req.url}`)
    // get the gmaps API key from .env and insert logic
    res.send('Sending back gmaps location details as an object on a json format').status(201);
};

module.exports = getRestaurantList;
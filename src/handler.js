const getRestaurantList = (req, res) => { // req payload should include location coordinate
    console.log(`this is get request on ${req.url}`);
    // get the gmaps API key from .env and insert logic
    res.status(201).send('Sending back gmaps location details as an object on a json format');
};

const getHandler = (req, res) => {
    console.log(`This is ${req.method} request on ${req.url}`);
    res.status(200).send('Hello world!');
}

const handlers = {
    getRestaurantList,
    getHandler
};

module.exports = handlers;
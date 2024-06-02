const getHandler = (req, res) => {
    res.send(`This is get request on ${req.url}`).status(200)
};

module.exports = getHandler;
const generateID = (username) => {
    const timeStamp = new Date().getTime();
    const id = `${username}${timeStamp}`;
    return id;
}

const convertSentimentToNumber = (sentiment) => {
    switch (sentiment) {
        case 'negative':
            return 0;
        case 'neutral':
            return 1;
        case 'positive':
            return 2;
        default:
            return 1;
    }
};


module.exports = generateID;
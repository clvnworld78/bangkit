const convertSentimentToNumber = (sentiment) => {
    switch (sentiment) {
        case 'negative':
            return 0;
        case 'neutral':
            return 1;
        case 'positive':
            return 2;
        default:
            return 1; // default to neutral if unexpected value
    }
};

module.exports = convertSentimentToNumber;
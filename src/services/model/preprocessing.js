const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.CLOUD_FUNCTION_URL;

const processReview = async (reviewText) => {
    try {
        const response = await axios.post(url, {
            input_text: reviewText,
        });
        return response.data.tokenized_output;
    } catch (error) {
        console.error('Error processing review:', error);
        throw new Error('Internal Server Error');
    }
};

module.exports = processReview;
  


/*
import { Tokenizer } from "tokenizers";

const tokenizer = await Tokenizer.fromFile("./word_index.json");
const wpEncoded = await tokenizer.encode("Food is good, price is cheap");

console.log(wpEncoded.getLength());
console.log(wpEncoded.getTokens());
console.log(wpEncoded.getIds());
console.log(wpEncoded.getAttentionMask());
console.log(wpEncoded.getOffsets());
console.log(wpEncoded.getOverflowing());
console.log(wpEncoded.getSpecialTokensMask());
console.log(wpEncoded.getTypeIds());
console.log(wpEncoded.getWordIds());
*/

/*
const SimpleTokenizer = require('simple-text-tokenizer');
const stopwords = require('stopwords');
const tokenizer = new SimpleTokenizer();
const stopWordList = stopwords.getStopwords();

const reviewText = 'This restaurant has really good food, the place is very pleasing, and its cheap';

let temp;
const lowercasing = async (reviewText) => {
    const loweredcasedText = reviewText.toLowerCase();
    return loweredcasedText;
}

const tokenizingText = async (loweredcasedText) => {
    temp = await lowercasing(reviewText);
    console.log(temp);
    const tokens = tokenizer.tokenizeWords(loweredcasedText);
    return tokens;
}

const removingSymbols = async (tokens) => {
    temp = tokenizingText(loweredcasedText);
    console.log(temp);
    const regex = /[^a-zA-Z0-9\s_]/;
    const filteredTokens = tokens.filter(token => !regex.test(token));
    return filteredTokens;
} 

const stopwordsRemoval = async (tokens) => {
    temp = await removingSymbols(tokens);
    console.log(temp);
    const stopWordsRemovedTokens = filteredTokens.filter(word => !stopWordList.includes(word));
    return stopWordsRemovedTokens;
}

const testing = stopwordsRemoval(reviewText);
console.log(testing);
*/
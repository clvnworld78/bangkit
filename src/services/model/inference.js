const db = require('../firebase/firestore');
const admin = require('firebase-admin');
const convertSentimentToNumber = require('../function/convertSentimentToNumber');

const inference = async (rawResult, restaurant_id, restaurant_name, imageUrl) => {
    const [foodRaw, ambienceRaw, serviceRaw, priceRaw] = rawResult;

    const getHighest = (obj) => {
        const { negative, neutral, positive } = obj;
        if (negative >= neutral && negative >= positive) {
            return { sentiment: 'negative', value: negative };
        } else if (neutral >= negative && neutral >= positive) {
            return { sentiment: 'neutral', value: neutral };
        } else {
            return { sentiment: 'positive', value: positive };
        }
    };

    const convertToPercentage = (value) => {
        return (value * 100).toFixed(2); 
    };

    const food = getHighest({
        negative: foodRaw[0],
        neutral: foodRaw[1],
        positive: foodRaw[2]
    });

    const ambience = getHighest({
        negative: ambienceRaw[0],
        neutral: ambienceRaw[1],
        positive: ambienceRaw[2]
    });

    const service = getHighest({
        negative: serviceRaw[0],
        neutral: serviceRaw[1],
        positive: serviceRaw[2]
    });

    const price = getHighest({
        negative: priceRaw[0],
        neutral: priceRaw[1],
        positive: priceRaw[2]
    });

    const highestFood = {
        sentiment: food.sentiment,
        percentage: `${convertToPercentage(food.value)}%`
    };

    const highestAmbience = {
        sentiment: ambience.sentiment,
        percentage: `${convertToPercentage(ambience.value)}%`
    };

    const highestService = {
        sentiment: service.sentiment,
        percentage: `${convertToPercentage(service.value)}%`
    };

    const highestPrice = {
        sentiment: price.sentiment,
        percentage: `${convertToPercentage(price.value)}%`
    };

    const result = {
        food: highestFood,
        ambience: highestAmbience,
        service: highestService,
        price: highestPrice
    };

    // updating to firestore
    const firestoreData = {
        food: convertSentimentToNumber(highestFood.sentiment),
        ambience: convertSentimentToNumber(highestAmbience.sentiment),
        service: convertSentimentToNumber(highestService.sentiment),
        price: convertSentimentToNumber(highestPrice.sentiment)
    };

    // if adding new entry to specify proper field of array
    const firestoreNewEntry = {
        id: restaurant_id,
        name: restaurant_name,
        imageUrl: imageUrl,
        food: [convertSentimentToNumber(highestFood.sentiment)],
        ambience: [convertSentimentToNumber(highestAmbience.sentiment)],
        service: [convertSentimentToNumber(highestService.sentiment)],
        price: [convertSentimentToNumber(highestPrice.sentiment)]
    }

    const restaurantsCollectionRef = db.collection('restaurantReview');
    console.log('restaurant_id:', restaurant_id);
    const querySnapshot = await restaurantsCollectionRef.where('id', '==', restaurant_id).get();
    
    if (!querySnapshot.empty) {
        // Document with matching 'id' field exists
        const documentRef = querySnapshot.docs[0].ref;
        const docSnapshot = await documentRef.get();
        const currentData = docSnapshot.data();
        console.log(...currentData.ambience, firestoreData.ambience);
        await documentRef.update({
            food: [...currentData.food, firestoreData.food],
            ambience: [...currentData.ambience, firestoreData.ambience],
            service: [...currentData.service, firestoreData.service],
            price: [...currentData.price, firestoreData.price]
        });
        console.log('Result is sucessfully updated to existing entry!');
    } else {
        // No document with matching 'id' field exists, create a new one
        await db.collection('restaurantReview').add(firestoreNewEntry);
        console.log('Result is sucessfully added to firestore as new entry!');
    }
    
    return result;
};


module.exports = inference;

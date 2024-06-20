const db = require('../firebase/firestore');
const admin = require('firebase-admin');

const getAverage = async () => {
    const restaurantsCollectionRef = db.collection('restaurantReview');
    const querySnapshot = await restaurantsCollectionRef.get();
    let allResults = []; // Array to store results for each document

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        let foodStat = 0, ambienceStat = 0, serviceStat = 0, priceStat = 0;

        // Calculate statistics for each field
        if (data.food && data.food.length > 0) {
            const foodLength = data.food.length * 2;
            const foodSum = data.food.reduce((acc, val) => acc + val, 0);
            foodStat = (foodSum / foodLength) * 5;
        }

        if (data.ambience && data.ambience.length > 0) {
            const ambienceLength = data.ambience.length * 2;
            const ambienceSum = data.ambience.reduce((acc, val) => acc + val, 0);
            ambienceStat = (ambienceSum / ambienceLength) * 5;
        }

        if (data.service && data.service.length > 0) {
            const serviceLength = data.service.length * 2;
            const serviceSum = data.service.reduce((acc, val) => acc + val, 0);
            serviceStat = (serviceSum / serviceLength) * 5;
        }

        if (data.price && data.price.length > 0) {
            const priceLength = data.price.length * 2;
            const priceSum = data.price.reduce((acc, val) => acc + val, 0);
            priceStat = (priceSum / priceLength) * 5;
        }

        // console.log(`Restaurant ID: ${data.id}`);
        // console.log(`Food Stat: ${foodStat}`);
        // console.log(`Ambience Stat: ${ambienceStat}`);
        // console.log(`Service Stat: ${serviceStat}`);
        // console.log(`Price Stat: ${priceStat}`);

        const result = {
            id: data.id,
            name: data.name,
            imageUrl: data.imageUrl,
            address: data.address,
            foodAvg: foodStat.toFixed(2),
            ambienceAvg: ambienceStat.toFixed(2),
            serviceAvg: serviceStat.toFixed(2),
            priceAvg: priceStat.toFixed(2)
        }

        allResults.push(result);

    });

    return allResults;
}

const getDetails = async (resto_id) => {
    const restaurantsCollectionRef = db.collection('restaurantReview');
    const restoSnap = await restaurantsCollectionRef.where('id', '==', resto_id).get();

    if (!restoSnap.empty) {
        const document = restoSnap.docs[0];
        const data = document.data();
        let foodStat = 0, ambienceStat = 0, serviceStat = 0, priceStat = 0;

        // Calculate statistics for each field
        if (data.food && data.food.length > 0) {
            const foodLength = data.food.length * 2;
            const foodSum = data.food.reduce((acc, val) => acc + val, 0);
            foodStat = (foodSum / foodLength) * 5;
        }

        if (data.ambience && data.ambience.length > 0) {
            const ambienceLength = data.ambience.length * 2;
            const ambienceSum = data.ambience.reduce((acc, val) => acc + val, 0);
            ambienceStat = (ambienceSum / ambienceLength) * 5;
        }

        if (data.service && data.service.length > 0) {
            const serviceLength = data.service.length * 2;
            const serviceSum = data.service.reduce((acc, val) => acc + val, 0);
            serviceStat = (serviceSum / serviceLength) * 5;
        }

        if (data.price && data.price.length > 0) {
            const priceLength = data.price.length * 2;
            const priceSum = data.price.reduce((acc, val) => acc + val, 0);
            priceStat = (priceSum / priceLength) * 5;
        }

        // Create result object with calculated averages
        const result = {
            id: data.id,
            name: data.name,
            imageUrl: data.imageUrl,
            address: data.address,
            foodAvg: foodStat.toFixed(2),
            ambienceAvg: ambienceStat.toFixed(2),
            serviceAvg: serviceStat.toFixed(2),
            priceAvg: priceStat.toFixed(2)
        };

        return result;
    } else {
        // Handle the case where no restaurant is found
        throw new Error(`Restaurant with ID ${resto_id} not found.`);
    }
}

const getAverageFunc = {
    getAverage,
    getDetails
}

module.exports = getAverageFunc;
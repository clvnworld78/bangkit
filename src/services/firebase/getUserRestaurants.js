const db = require('./firestore');
const admin = require('firebase-admin');

const getUserRestaurant = async (identifier) => {
    const usersCollectionRef = db.collection('users');
    let userSnap;

    if (identifier.includes('@')) {
        userSnap = await usersCollectionRef.where('email', '==', identifier).get();
    }

    userSnap = await usersCollectionRef.where('username', '==', identifier).get();

    if (!userSnap.empty) {
        const userDocRef = userSnap.docs[0].ref;
        const userDocSnapshot = await userDocRef.get();
        const userData = userDocSnapshot.data();

        return userData.restaurants;
    } else {
        return [];
    }
}

module.exports = getUserRestaurant;
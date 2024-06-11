const express = require('express');
require('dotenv').config();
const app = express();
const api = require('./api/places');
const db = require('./services/firebase/firestore');
const bcrypt = require('bcryptjs');
const generateID = require('./services/function/generateId');
app.use(express.urlencoded({ extended: true }));


const getHandler = (req, res) => {
    console.log(`This is ${req.method} request on ${req.url}`);
    res.status(200).send('Connection to backend successfully established!');
};

const searchPlaces = async (req, res) => { // req body must contain location query
    const location = req.query.location;

    if (!location) {
        return res.status(400).send('Missing required parameter: location text');
    };

    try {
        const restaurants = await api.searchPlaces(location);
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching restaurant data');
    };
};

const fetchNearbyRestaurants = async (req, res) => { // req query must contain latitude & langtitude
    try {
        const { lat, lng, radius = 1000 } = req.query;

        if (!lat || !lng || !radius) {
            return res.status(400).send('Missing one or more required paramater: latitude, langtitude, radius');
        };

        const location = `${lat},${lng}`;
        const nearbyRestaurants = await api.fetchNearbyRestaurants(location, radius);
        res.json(nearbyRestaurants);
    } catch (error) {
        console.error('Error during fetching restaurants nearby: ', error);
        res.status(500).send({ error: 'Failed to fetch restaurants from nearby location' });
    };
};

const registration = async (req, res) => { // req body must contain pass and email
    try {
        console.log(req.body);
        const { email, password, userName, fullName } = req.body;

        if (!email || !password || !userName || !fullName) {
            console.log('one or more required fields are missing')
            return res.status(400).send('Invalid: All fields are required');
        }

        const usersRef = db.collection('users');
        const emailSnapshot = await usersRef.where('email', '==', email).get();
        const userNameSnapshot = await usersRef.where('username', '==', userName).get();

        if (!emailSnapshot.empty) {
            return res.status(400).send('Email already taken');
        }

        if (!userNameSnapshot.empty) {
            return res.status(400).send('Username already taken');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await usersRef.add({
            email,
            username: userName,
            fullName,
            password: hashedPassword,
        });

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error during registration process [possible connection error ensure the connection is stable]: ', error);
        res.status(500).send({ error: "Registration failed ensure you have a stable connection and try again"});
    }
};

const login = async (req, res) => {
    try {
        const { identifier, password } = req.body; // Identifier is either email or username

        if (!identifier || !password) {
            console.log('Invalid login format: one or more required fields are missing');
            return res.status(400).send('Identifier and password are required');
        }

        const usersRef = db.collection('users');
        let userSnapshot;

        // Check if the identifier is an email or a username
        if (identifier.includes('@')) {
            userSnapshot = await usersRef.where('email', '==', identifier).get();
        } else {
            userSnapshot = await usersRef.where('username', '==', identifier).get();
        }

        if (userSnapshot.empty) {
            console.log('email/username is not found');
            return res.status(400).send('Invalid email/username or password');
        }

        const user = userSnapshot.docs[0].data();
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('invalid password: password does not match');
            return res.status(400).send('Invalid email/username or password');
        }
        const sessionId = generateID(user.username);

        const userFound = {
            message: 'Login Sucessful',
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            session_id: sessionId
        }

        console.log(`user ${user.username} has logged in sucessfully`);
        res.status(200).json(userFound);
    } catch (error) {
        console.error('Error during login process: ', error);
        res.status(500).send({ error: "Login failed, ensure you have a stable connection and please try again" });
    }
};

const handlers = {
    getHandler,
    searchPlaces,
    fetchNearbyRestaurants,
    registration,
    login
};

module.exports = handlers;

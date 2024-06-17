const loadModel = require('./loadModel');

async function initializeModel() {
    try {
        const model = await loadModel();
        console.log('Model is successfully loaded');
        return model;
    } catch (error) {
        console.error('Error loading model:', error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}

module.exports = initializeModel;
const path = require('path');
const modelPath = path.join(__dirname, 'model', 'model.json');

const tf = require('@tensorflow/tfjs-node');

const loadModel = async () => {
    const model = await tf.loadGraphModel(`file://${modelPath}`);
    return model;
};

module.exports = loadModel;
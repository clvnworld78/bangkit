const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-bucketreader-sdk.json')

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
console.log('Credential successfully loaded');
const db = admin.firestore();
module.exports = db;
  
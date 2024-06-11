const admin = require('firebase-admin');
const serviceAccount = require('/home/clvnworld78/.config/gcloud/firebase-admin-sdk')

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  
const db = admin.firestore();
module.exports = db;
  
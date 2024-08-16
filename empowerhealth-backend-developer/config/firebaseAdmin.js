const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json'); // Replace with the path to your service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-database-name.firebaseio.com" // Replace with your database URL
});

module.exports = admin;

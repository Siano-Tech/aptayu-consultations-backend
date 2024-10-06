const admin = require('firebase-admin');
const serviceAccount = require('./aptayu-consultations.json'); // Make sure you download and place this file in the config folder

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
    }),
    databaseURL: process.env.FIREBASE_DATABASE_BUCKET, // Replace with your Firebase Realtime Database URL
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

const db = admin.database(); // Create a reference to the Realtime Database
module.exports = { db, admin };

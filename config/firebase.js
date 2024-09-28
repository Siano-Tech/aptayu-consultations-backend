const admin = require('firebase-admin');
const serviceAccount = require('./aptayu-consultations.json'); // Make sure you download and place this file in the config folder

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      "type": "service_account",
      "project_id": "aptayu-consultations",
      "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
      "private_key": process.env.FIREBASE_PRIVATE_KEY,
      "client_email": "firebase-adminsdk-l4ad4@aptayu-consultations.iam.gserviceaccount.com",
      "client_id": process.env.FIREBASE_CLIENT_ID,
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l4ad4%40aptayu-consultations.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    }),
    databaseURL: process.env.FIREBASE_DATABASE_BUCKET, // Replace with your Firebase Realtime Database URL
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

const db = admin.database(); // Create a reference to the Realtime Database
module.exports = { db, admin };

// server/routes/subscriptions.js
const express = require('express');
const { db } = require('../config/firebase');
const router = express.Router();

// Handle subscriptions
router.post('/', async (req, res) => {
  const { packageId, patientName, patientEmail } = req.body;
  try {
    const newSubscriptionRef = db.ref('subscriptions').push();
    await newSubscriptionRef.set({ packageId, patientName, patientEmail, status: 'pending' });
    res.status(200).json({ message: 'Subscription created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating subscription' });
  }
});

module.exports = router;
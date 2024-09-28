// server/routes/followup.js
const express = require('express');
const { db } = require('../config/firebase');
const router = express.Router();

router.get('/callbacks', async (req, res) => {
  try {
    const callbacksRef = db.ref('callbacks');
    const snapshot = await callbacksRef.once('value');
    const callbacks = snapshot.val();
    res.status(200).json(callbacks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching callbacks' });
  }
});

router.post('/follow-up', async (req, res) => {
  const { callbackId, status } = req.body;
  try {
    await db.ref(`callbacks/${callbackId}`).update({ status });
    res.status(200).json({ message: 'Follow-up updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating follow-up' });
  }
});

module.exports = router;
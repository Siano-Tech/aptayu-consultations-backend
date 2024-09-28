// server/routes/packages.js
const express = require('express');
const { db } = require('../config/firebase');
const router = express.Router();

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packagesRef = db.ref('packages');
    const snapshot = await packagesRef.once('value');
    const packages = snapshot.val();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching packages' });
  }
});

module.exports = router;

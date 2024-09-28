// // server/routes/settings.js
// const express = require('express');
// const { db } = require('../config/firebase');
// const router = express.Router();

// // Update system settings
// router.put('/', async (req, res) => {
//   const settings = req.body;
//   try {
//     await db.ref('settings').update(settings);
//     res.status(200).json({ message: 'Settings updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error updating settings' });
//   }
// });

// module.exports = router;


const express = require('express');
const settingsController = require('../controllers/settingsController');
const router = express.Router();

// Get system settings
router.get('/', settingsController.getSettings);

// Update system settings
router.put('/', settingsController.updateSettings);

module.exports = router;

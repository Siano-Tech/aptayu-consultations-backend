// // server/routes/callback.js
// const express = require('express');
// const { db } = require('../config/firebase');
// const router = express.Router();

// // Handle callback requests
// router.post('/', async (req, res) => {
//   const { name, phone, email } = req.body;
//   try {
//     const newCallbackRef = db.ref('callbacks').push();
//     await newCallbackRef.set({ name, phone, email });
//     res.status(200).json({ message: 'Callback request submitted' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error submitting callback request' });
//   }
// });

// module.exports = router;

const express = require('express');
const callbackController = require('../controllers/callbackController');
const router = express.Router();

// Submit a callback request
router.post('/', callbackController.requestCallback);

module.exports = router;

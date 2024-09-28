// // server/routes/notifications.js
// const express = require('express');
// const twilio = require('twilio');
// const router = express.Router();

// // const accountSid = process.env.TWILIO_SID;
// // const authToken = process.env.TWILIO_AUTH_TOKEN;
// // const client = new twilio(accountSid, authToken);

// router.post('/send-sms', async (req, res) => {
//   const { to, message } = req.body;
//   try {
//     // await client.messages.create({
//     //   body: message,
//     //   from: process.env.TWILIO_PHONE_NUMBER,
//     //   to,
//     // });
//     res.status(200).json({ message: 'SMS sent successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error sending SMS' });
//   }
// });

// module.exports = router;


const express = require('express');
const notificationController = require('../controllers/notificationController');
const router = express.Router();

// Send an SMS notification
router.post('/send-sms', notificationController.sendSMS);

module.exports = router;

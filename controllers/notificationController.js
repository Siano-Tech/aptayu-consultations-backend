const twilio = require('twilio');
const { db } = require('../config/firebase');

// const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * @swagger
 * /api/notifications/send-sms:
 *   post:
 *     summary: Send SMS notification
 *     description: Sends an SMS notification to a patient or admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully sent SMS.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error sending SMS.
 */
exports.sendSMS = async (req, res) => {
  const { to, message } = req.body;
  try {
    // await client.messages.create({
    //   body: message,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to
    // });
    res.status(200).json({
      message: 'SMS sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error sending SMS',
      error: error.message
    });
  }
};

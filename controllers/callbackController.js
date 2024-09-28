const { db } = require('../config/firebase');

/**
 * @swagger
 * /api/request-callback:
 *   post:
 *     summary: Submit a callback request
 *     description: Handles the submission of a callback request.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully submitted callback request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error.
 */
exports.requestCallback = async (req, res) => {
  const { name, phone, email } = req.body;
  try {
    const newCallbackRef = db.ref('callbacks').push();
    await newCallbackRef.set({ name, phone, email });
    res.status(200).json({
      message: 'Callback request submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error submitting callback request',
      error: error.message
    });
  }
};

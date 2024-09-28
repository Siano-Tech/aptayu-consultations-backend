const { db } = require('../config/firebase');

/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Retrieve system settings
 *     description: Fetches system settings from the Firebase Realtime Database.
 *     responses:
 *       200:
 *         description: Successfully retrieved settings.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   description: System settings data.
 *       500:
 *         description: Server error.
 */
exports.getSettings = async (req, res) => {
  try {
    const settingsRef = db.ref('settings');
    const snapshot = await settingsRef.once('value');
    const settings = snapshot.val();
    
    res.status(200).json({
      message: 'Settings retrieved successfully',
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching settings',
      error: error.message
    });
  }
};

/**
 * @swagger
 * /api/settings:
 *   put:
 *     summary: Update system settings
 *     description: Updates system settings in the Firebase Realtime Database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notificationEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated settings.
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
exports.updateSettings = async (req, res) => {
  const settingsData = req.body;
  try {
    const settingsRef = db.ref('settings');
    await settingsRef.update(settingsData);
    res.status(200).json({
      message: 'Settings updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating settings',
      error: error.message
    });
  }
};

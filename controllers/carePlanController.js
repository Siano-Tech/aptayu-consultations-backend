const { db } = require('../config/firebase');

/**
 * @swagger
 * /api/carePlans/{id}:
 *   get:
 *     summary: Retrieve a care plan by ID
 *     description: Fetches a care plan by its ID from the Firebase Realtime Database.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the care plan to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the care plan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   description: Care plan data.
 *       404:
 *         description: Care plan not found.
 *       500:
 *         description: Server error.
 */
exports.getCarePlanById = async (req, res) => {
  const { id } = req.params;
  try {
    const carePlanRef = db.ref(`carePlans/${id}`);
    const snapshot = await carePlanRef.once('value');
    const carePlan = snapshot.val();
    if (!carePlan) return res.status(404).json({ message: 'Care plan not found' });

    res.status(200).json({
      message: 'Care plan retrieved successfully',
      data: carePlan
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching care plan',
      error: error.message
    });
  }
};

/**
 * @swagger
 * /api/carePlans:
 *   post:
 *     summary: Create a new care plan
 *     description: Creates a new care plan in the Firebase Realtime Database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: number
 *               patientId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created care plan.
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
exports.createCarePlan = async (req, res) => {
  const { name, description, duration, patientId } = req.body;
  try {
    const newCarePlanRef = db.ref(`carePlans/${patientId}`).push();
    await newCarePlanRef.set({
      name,
      description,
      duration,
      patientId,
      status: 'active'
    });

    res.status(200).json({
      message: 'Care plan created successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating care plan',
      error: error.message
    });
  }
};

// // server/routes/carePlans.js
// const express = require('express');
// const { db } = require('../config/firebase');
// const router = express.Router();

// // Submit care plan
// router.post('/submit', async (req, res) => {
//   const { patientId, doctorName, carePlanDetails } = req.body;
//   try {
//     const carePlanRef = db.ref(`carePlans/${patientId}`).push();
//     await carePlanRef.set({
//       doctorName,
//       carePlanDetails,
//       status: 'active',
//     });
//     res.status(200).json({ message: 'Care plan submitted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error submitting care plan' });
//   }
// });

// module.exports = router;


const express = require('express');
const carePlanController = require('../controllers/carePlanController');
const router = express.Router();

// Get a care plan by ID
router.get('/:id', carePlanController.getCarePlanById);

// Create a new care plan
router.post('/', carePlanController.createCarePlan);

module.exports = router;

// // server/routes/consultations.js
// const express = require('express');
// const { db } = require('../config/firebase');
// const router = express.Router();

// // Book a consultation
// router.post('/book', async (req, res) => {
//   const { patientName, patientEmail, doctorName, date, time } = req.body;
//   try {
//     const newConsultationRef = db.ref('consultations').push();
//     await newConsultationRef.set({
//       patientName,
//       patientEmail,
//       doctorName,
//       date,
//       time,
//       status: 'scheduled',
//     });
//     res.status(200).json({ message: 'Consultation booked successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error booking consultation' });
//   }
// });

// module.exports = router;


const express = require('express');
const nutritionController = require('../controllers/nutritionConsultationController');
const router = express.Router();

// Book a consultation
router.post('/book', nutritionController.createNutritionConsultation);

// Get all consultations
router.get('/', nutritionController.getAllNutritionConsultations);

router.get('/:id', nutritionController.getAllNutritionConsultations);

router.get('/patient/:uid', nutritionController.getAllNutritionConsultationByUid);

// Update a treatment package
router.put('/:id', nutritionController.updateNutritionConsultation);

// Delete a treatment package
router.delete('/:id', nutritionController.deleteNutritionConsultation);

module.exports = router;

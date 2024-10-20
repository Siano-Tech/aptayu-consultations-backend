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
const fitnessController = require('../controllers/fitnessConsultationController');
const router = express.Router();

// Book a consultation
router.post('/book', fitnessController.createFitnessConsultation);

// Get all consultations
router.get('/', fitnessController.getAllFitnessConsultations);

router.get('/:id', fitnessController.getAllFitnessConsultations);

router.get('/patient/:uid', fitnessController.getAllFitnessConsultationByUid);

// Update a treatment package
router.put('/:id', fitnessController.updateFitnessConsultation);

// Delete a treatment package
router.delete('/:id', fitnessController.deleteFitnessConsultation);

module.exports = router;

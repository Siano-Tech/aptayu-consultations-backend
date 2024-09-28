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
const consultationController = require('../controllers/consultationController');
const router = express.Router();

// Book a consultation
router.post('/book', consultationController.createConsultation);

// Get all consultations
router.get('/', consultationController.getAllConsultations);

router.get('/:id', consultationController.getAllConsultations);

// Update a treatment package
router.put('/:id', consultationController.updateConsultation);

// Delete a treatment package
router.delete('/:id', consultationController.deleteConsultation);

module.exports = router;

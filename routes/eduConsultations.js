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
const eduResourceController = require('../controllers/eduConsultationController');
const router = express.Router();

// Book a consultation
router.post('/book', eduResourceController.createEduResourceConsultation);

// Get all consultations
router.get('/', eduResourceController.getAllEduResourceConsultations);

router.get('/:id', eduResourceController.getAllEduResourceConsultations);

router.get('/patient/:uid', eduResourceController.getAllEduResourceConsultationByUid);

// Update a treatment package
router.put('/:id', eduResourceController.updateEduResourceConsultation);

// Delete a treatment package
router.delete('/:id', eduResourceController.deleteEduResourceConsultation);

module.exports = router;

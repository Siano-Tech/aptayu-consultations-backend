// // server/routes/patients.js
// const express = require('express');
// const { db } = require('../config/firebase');
// const router = express.Router();

// // Get all patients
// router.get('/', async (req, res) => {
//   try {
//     const patientsRef = db.ref('patients');
//     const snapshot = await patientsRef.once('value');
//     const patients = snapshot.val();
//     res.status(200).json(patients);
//   } catch (error) {
//     res.status(500).json({ error: 'Error retrieving patients' });
//   }
// });

// // Get a single patient by ID
// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const patientRef = db.ref(`patients/${id}`);
//     const snapshot = await patientRef.once('value');
//     const patient = snapshot.val();
//     if (!patient) return res.status(404).json({ message: 'Patient not found' });
//     res.status(200).json(patient);
//   } catch (error) {
//     res.status(500).json({ error: 'Error retrieving patient' });
//   }
// });

// // Update patient details
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const patientData = req.body;
//   try {
//     const patientRef = db.ref(`patients/${id}`);
//     await patientRef.update(patientData);
//     res.status(200).json({ message: 'Patient data updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error updating patient' });
//   }
// });

// module.exports = router;


const express = require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();

// Get all patients
router.get('/', patientController.getAllPatients);

// Add patient
router.post('/', patientController.addPatient);

// Get a specific patient by ID
router.get('/:id', patientController.getPatientById);

// Update a patient's details
router.put('/:id', patientController.updatePatient);

module.exports = router;

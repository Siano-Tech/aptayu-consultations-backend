const { db } = require('../config/firebase');
const { generateId } = require('../utils/utils');

exports.addPatient = async (req, res) => {
  const body = req.body;
  body.lastModified = new Date().toISOString();
  const id = generateId();
  try {
    const patientRef = await db.ref(`patients`).orderByChild('phoneNo').equalTo(body.phoneNo).once('value');
    if (patientRef.exists()) {
      return res.status(400).json({ message: 'Patient already registered' });
    }
    const newPatientRef = db.ref(`patients/${id}`);
    await newPatientRef.set(body);
    res.status(201).json({ message: 'Patient added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding patient', error: error.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patientsRef = db.ref('patients');
    const snapshot = await patientsRef.once('value');
    if (!snapshot.exists()) {
      return res.status(400).json({ message: 'No patients available' });
    }
    
    const patients = snapshot.val();
    const patientsList = Object.keys(patients).map((key) => ({ id: key, ...patients[key] }));
    res.status(200).json({ message: 'Patients retrieved successfully', data: patientsList });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

exports.getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const patientRef = db.ref(`patients/${id}`);
    const snapshot = await patientRef.once('value');
    const patient = snapshot.val();
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    res.status(200).json({ message: 'Patient retrieved successfully', data: patient });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  body.lastModified = new Date().toISOString();
  try {
    const patientRef = db.ref(`patients/${id}`);
    await patientRef.update(body);
    res.status(200).json({ message: 'Patient updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient', error: error.message });
  }
};

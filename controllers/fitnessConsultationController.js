const { db } = require('../config/firebase');
const { generateId } = require('../utils/utils');

// Create a new fitness consultation
exports.createFitnessConsultation = async (req, res) => {
  const body = req.body;
  body.lastModified = new Date().toISOString();
  const id = generateId();
  try {
    const newFitnessRef = db.ref('fitnessConsultations/'+id);
    await newFitnessRef.set(body);
    res.status(200).json({
      message: ' Consultation created successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating consultation',
      error: error.message
    });
  }
};

// Get all fitness consultation
exports.getAllFitnessConsultations = async (req, res) => {
  const { id } = req.params;
  try {
    const fitnessRef = id ? db.ref('fitnessConsultations/'+id) : db.ref('fitnessConsultations');
    const snapshot = await fitnessRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: 'No consultations available' });
    }
    const fitness = snapshot.val();
    const fitnessList = id ? fitness : Object.keys(fitness).map((key) => ({ id: key, ...fitness[key] }));
    res.status(200).json({
      message: ' Consultations retrieved successfully',
      data: fitnessList
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching consultation',
      error: error.message
    });
  }
};

// Get all fitness consultation
exports.getAllFitnessConsultationByUid = async (req, res) => {
  const { uid } = req.params;
  try {
    const fitnessRef = db.ref('fitnessConsultations').orderByChild('patientId').equalTo(uid);
    const snapshot = await fitnessRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: 'No fitness consultation available' });
    }
    const fitness = snapshot.val();
    const fitnessList = Object.keys(fitness).map((key) => ({ id: key, ...fitness[key] }));
    res.status(200).json({
      message: ' Consultation retrieved successfully',
      data: fitnessList
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching consultation',
      error: error.message
    });
  }
};

// Update a fitness Consultation
exports.updateFitnessConsultation = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  body.lastModified = new Date().toISOString();
  try {
    const fitnessRef = db.ref(`fitnessConsultations/${id}`);
    await fitnessRef.update(body);
    res.status(200).json({
      message: ' Consultation updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating consultation',
      error: error.message
    });
  }
};

// Delete a fitness consultation
exports.deleteFitnessConsultation = async (req, res) => {
  const { id } = req.params;
  try {
    const fitnessRef = db.ref(`fitnessConsultations/${id}`);
    await fitnessRef.remove();
    res.status(200).json({
      message: ' Consultation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting consultation',
      error: error.message
    });
  }
};

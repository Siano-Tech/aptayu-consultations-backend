const { db } = require('../config/firebase');
const { generateId } = require('../utils/utils');

// Create a new consultation package
exports.createConsultation = async (req, res) => {
  const body = req.body;
  body.lastModified = new Date().toISOString();
  const id = generateId();
  try {
    const newConsultationRef = db.ref('consultations/'+id);
    await newConsultationRef.set(body);
    res.status(200).json({
      message: 'Consultation created successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating consultation',
      error: error.message
    });
  }
};

// Get all consultations
exports.getAllConsultations = async (req, res) => {
  const { id } = req.params;
  try {
    const consultationsRef = id ? db.ref('consultations/'+id) : db.ref('consultations');
    const snapshot = await consultationsRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: 'No consultations available' });
    }
    const consultations = snapshot.val();
    const consultationsList = id ? consultations : Object.keys(consultations).map((key) => ({ id: key, ...consultations[key] }));
    res.status(200).json({
      message: 'Consultations retrieved successfully',
      data: consultationsList
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching consultations',
      error: error.message
    });
  }
};

// Get all consultations
exports.getAllConsultationsByUid = async (req, res) => {
  
  const { uid } = req.params;
  try {
    const consultationsRef = db.ref('consultations').orderByChild('patientId').equalTo(uid);
    const snapshot = await consultationsRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: 'No consultations available' });
    }
    const consultations = snapshot.val();
    const consultationsList = Object.keys(consultations).map((key) => ({ id: key, ...consultations[key] }));
    res.status(200).json({
      message: 'Consultations retrieved successfully',
      data: consultationsList
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching consultations',
      error: error.message
    });
  }
};

// Update a consultation
exports.updateConsultation = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  body.lastModified = new Date().toISOString();
  try {
    const consultationRef = db.ref(`consultations/${id}`);
    await consultationRef.update(body);
    res.status(200).json({
      message: 'Consultation updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating consultation',
      error: error.message
    });
  }
};

// Delete a consultation
exports.deleteConsultation = async (req, res) => {
  const { id } = req.params;
  try {
    const consultationRef = db.ref(`consultations/${id}`);
    await consultationRef.remove();
    res.status(200).json({
      message: 'Consultation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting consultation',
      error: error.message
    });
  }
};

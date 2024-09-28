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
      message: 'Consultation package created successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating consultation package',
      error: error.message
    });
  }
};

// Get all consultation packages
exports.getAllConsultations = async (req, res) => {
  const { id } = req.params;
  try {
    const consultationsRef = id ? db.ref('consultations/'+id) : db.ref('consultations');
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

// Update a consultation package
exports.updateConsultation = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  body.lastModified = new Date().toISOString();
  try {
    const consultationRef = db.ref(`consultations/${id}`);
    await consultationRef.update(body);
    res.status(200).json({
      message: 'Consultation package updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating consultation package',
      error: error.message
    });
  }
};

// Delete a consultation package
exports.deleteConsultation = async (req, res) => {
  const { id } = req.params;
  try {
    const consultationRef = db.ref(`consultations/${id}`);
    await consultationRef.remove();
    res.status(200).json({
      message: 'Consultation package deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting consultation package',
      error: error.message
    });
  }
};

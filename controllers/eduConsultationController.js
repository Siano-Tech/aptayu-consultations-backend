const { db } = require('../config/firebase');
const { generateId } = require('../utils/utils');

// Create a new eduResource consultation
exports.createEduResourceConsultation = async (req, res) => {
  const body = req.body;
  body.lastModified = new Date().toISOString();
  const id = generateId();
  try {
    const newEduResourceRef = db.ref('eduResourceConsultations/'+id);
    await newEduResourceRef.set(body);
    res.status(200).json({
      message: 'EduResource Consultation created successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating eduResource consultation',
      error: error.message
    });
  }
};

// Get all eduResource consultation
exports.getAllEduResourceConsultations = async (req, res) => {
  const { id } = req.params;
  try {
    const eduResourceRef = id ? db.ref('eduResourceConsultations/'+id) : db.ref('eduResourceConsultations');
    const snapshot = await eduResourceRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: 'No eduResource consultation available' });
    }
    const eduResource = snapshot.val();
    const eduResourceList = id ? eduResource : Object.keys(eduResource).map((key) => ({ id: key, ...eduResource[key] }));
    res.status(200).json({
      message: 'EduResource Consultations retrieved successfully',
      data: eduResourceList
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching eduResource consultation',
      error: error.message
    });
  }
};

// Get all eduResource consultation
exports.getAllEduResourceConsultationByUid = async (req, res) => {
  const { uid } = req.params;
  try {
    const eduResourceRef = db.ref('eduResourceConsultations').orderByChild('patientId').equalTo(uid);
    const snapshot = await eduResourceRef.once('value');
    if (!snapshot.exists()) {
        return res.status(400).json({ message: 'No eduResource consultation available' });
    }
    const eduResource = snapshot.val();
    const eduResourceList = Object.keys(eduResource).map((key) => ({ id: key, ...eduResource[key] }));
    res.status(200).json({
      message: 'EduResource Consultation retrieved successfully',
      data: eduResourceList
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching eduResource',
      error: error.message
    });
  }
};

// Update a eduResource Consultation
exports.updateEduResourceConsultation = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  body.lastModified = new Date().toISOString();
  try {
    const eduResourceRef = db.ref(`eduResourceConsultations/${id}`);
    await eduResourceRef.update(body);
    res.status(200).json({
      message: 'EduResource Consultation updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating eduResource consultation',
      error: error.message
    });
  }
};

// Delete a eduResource consultation
exports.deleteEduResourceConsultation = async (req, res) => {
  const { id } = req.params;
  try {
    const eduResourceRef = db.ref(`eduResourceConsultations/${id}`);
    await eduResourceRef.remove();
    res.status(200).json({
      message: 'EduResource Consultation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting eduResource consultation',
      error: error.message
    });
  }
};
